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

const PaymentFormInner: React.FC<PaymentFormProps> = ({ amount, packageName, packageId, onSuccess, onCancel }) => {
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
        // Use the booking webhook URL - it should handle payment intent creation
        // If you have a separate payment intent endpoint, use: import.meta.env.VITE_N8N_WEBHOOK_PAYMENT_INTENT
        const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_BOOKING || 'https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request';
        
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
            packageId: packageId,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error');
          throw new Error(`Failed to create payment intent: ${response.status} - ${errorText}`);
        }

        const data = await response.json().catch(() => ({}));
        
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          // Check if there's an error message
          if (data.error) {
            setError(data.error);
          } else {
            setError('Payment processing requires backend setup. Please contact support.');
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize payment. Please try again.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (amount > 0) {
      createPaymentIntent();
    } else {
      setError('Invalid payment amount');
      setIsLoading(false);
    }
  }, [amount, packageName, packageId]);

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
          <span className="text-lg font-semibold text-[#362b24]">${(amount / 100).toFixed(2)}</span>
        </div>
        <p className="text-xs text-[#85756b] mt-2">
          Remaining balance of ${(amount / 100).toFixed(2)} due upon delivery.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 px-6 py-3 border border-[#362b24]/20 text-[#362b24] rounded-full hover:bg-[#362b24]/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 px-6 py-3 bg-[#c06e46] text-white rounded-full hover:bg-[#a85a35] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Pay ${(amount / 100).toFixed(2)} Now
            </>
          )}
        </button>
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
