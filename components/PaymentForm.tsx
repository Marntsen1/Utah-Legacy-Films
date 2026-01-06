import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';
import Button from './ui/Button';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentFormProps {
  amount: number;
  packageName: string;
  packageId: string;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
}

const PaymentFormInner: React.FC<PaymentFormProps> = ({ amount, packageName, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        // Call your backend to create payment intent
        // The n8n workflow will detect action: 'create_payment_intent' and create the payment intent
        const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_BOOKING || 'https://mattarntsen.app.n8n.cloud/webhook-test/booking-request';
        
        const response = await fetch(webhookUrl, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'create_payment_intent',
            amount: amount, // Amount in cents (50% of package price)
            packageName: packageName,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json().catch(() => ({}));
        
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          // Fallback: if no backend, we'll proceed without payment intent
          // This requires backend setup - see STRIPE_SETUP.md
          console.warn('No payment intent created. Backend setup required for full payment processing.');
          setError('Payment processing requires backend setup. Please contact support.');
        }
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError('Failed to initialize payment. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [amount, packageName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setError('Payment not ready. Please wait a moment and try again.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Confirm payment with Stripe
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      } else if (paymentIntent && paymentIntent.status === 'requires_action') {
        // Handle 3D Secure or other actions
        setError('Additional authentication required. Please complete the verification.');
        setIsProcessing(false);
      } else {
        throw new Error('Payment not completed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-4 border border-[#362b24]/10">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-[#c06e46]" />
            <span className="ml-2 text-[#85756b]">Initializing payment...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800 mb-4">
            Payment processing requires backend setup. Please see STRIPE_SETUP.md for instructions.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="w-full"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white rounded-xl p-4 border border-[#362b24]/10">
        <label className="block text-xs font-medium text-[#362b24] uppercase tracking-wide mb-2">
          Card Information
        </label>
        <div className="p-3 border border-[#362b24]/10 rounded-lg">
          <PaymentElement 
            options={{
              layout: 'tabs',
            }}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-[#f5f2eb] rounded-xl p-4 border border-[#362b24]/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#85756b]">Amount Due Today (50%):</span>
          <span className="text-lg font-semibold text-[#362b24]">${(amount / 100 / 2).toFixed(2)}</span>
        </div>
        <p className="text-xs text-[#85756b] mt-2">
          Remaining balance of ${(amount / 100 / 2).toFixed(2)} due upon delivery.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Pay ${(amount / 100 / 2).toFixed(2)} Now
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

const PaymentForm: React.FC<PaymentFormProps> = (props) => {
  if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm text-yellow-800">
          Stripe is not configured. Please add VITE_STRIPE_PUBLISHABLE_KEY to your environment variables.
        </p>
      </div>
    );
  }

  return (
    <Elements 
      stripe={stripePromise}
      options={{
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#c06e46',
            colorBackground: '#f5f2eb',
            colorText: '#362b24',
            colorDanger: '#c06e46',
            fontFamily: 'Inter, sans-serif',
            spacingUnit: '4px',
            borderRadius: '12px',
          },
        },
      }}
    >
      <PaymentFormInner {...props} />
    </Elements>
  );
};

export default PaymentForm;
