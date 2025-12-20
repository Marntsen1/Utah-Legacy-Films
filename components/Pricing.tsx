import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';
import CalendarPicker from './ui/CalendarPicker';

interface Package {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

const packages: Package[] = [
  {
    id: 'essential',
    name: "Essential Legacy",
    price: "$2,000",
    description: "Perfect for capturing a single powerful story or specific memory.",
    features: [
      "1 Camera Angle (4K Cinema)",
      "60 Minute Interview Session",
      "Professional Audio Mastering",
      "5-8 Minute Edited Film",
      "Digital Delivery",
      "14-Day Delivery Window"
    ]
  },
  {
    id: 'signature',
    name: "Signature Story",
    price: "$4,500",
    description: "Our most popular choice for a comprehensive life overview.",
    recommended: true,
    features: [
      "2 Camera Angles (Multi-cam)",
      "2 Hour Session",
      "Archival Scanning (up to 20)",
      "10-15 Minute Edited Film",
      "Digital + USB Keepsake",
      "1 Revision Round",
      "10-Day Delivery Window"
    ]
  },
  {
    id: 'masterpiece',
    name: "Generational Masterpiece",
    price: "$8,000",
    description: "A complete cinematic documentary of a life well-lived.",
    features: [
      "Multi-Day Shoot (2 Days)",
      "Archival Scanning (up to 75 photos)",
      "Location Scouting & Setup",
      "20+ Minute Documentary",
      "Director's Cut & Raw Footage",
      "Digital + USB Keepsake",
      "2 Revision Rounds",
      "7-Day Delivery Window"
    ]
  }
];

const BookingModal: React.FC<{ pkg: Package | null, onClose: () => void }> = ({ pkg, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    selectedDate: null as Date | null,
    selectedTime: ''
  });
  const [error, setError] = useState<string | null>(null);
  
  if (!pkg) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-[#362b24]/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative bg-[#f5f2eb] w-full max-w-lg max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl shadow-black/20 border border-[#362b24]/10 flex flex-col"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-[#362b24]/5 rounded-full transition-colors">
          <X className="w-5 h-5 text-[#85756b]" />
        </button>

        <div className="p-8 overflow-y-auto flex-1">
          <div className="mb-6">
            <span className="text-xs font-bold tracking-wider text-[#c06e46] uppercase">Booking Request</span>
            <h3 className="font-serif text-3xl text-[#362b24] mt-1">{pkg.name}</h3>
            <p className="text-[#85756b] mt-1">Starting at <span className="font-semibold text-[#362b24]">{pkg.price}</span></p>
          </div>

          {step === 1 ? (
            <form onSubmit={async (e) => { 
              e.preventDefault(); 
              
              // Validate
              if (!bookingData.name.trim() || !bookingData.email.trim()) {
                setError('Please fill in all required fields');
                return;
              }

              if (!bookingData.selectedDate || !bookingData.selectedTime) {
                setError('Please select a date and time for your booking');
                return;
              }

              setIsSubmitting(true);
              setError(null);

              try {
                // Get webhook URL from environment variable or use fallback
                const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_BOOKING || 'https://mattarntsen.app.n8n.cloud/webhook-test/booking-request';
                
                console.log('Webhook URL:', webhookUrl); // Debug log
                console.log('All env vars:', import.meta.env); // Debug all env vars
                
                if (!webhookUrl || webhookUrl === 'undefined') {
                  console.error('Webhook URL not found in environment variables');
                  throw new Error('Webhook URL not configured. Please check environment variables.');
                }

                // Format date and time
                const bookingDateTime = new Date(bookingData.selectedDate);
                const [time, period] = bookingData.selectedTime.split(' ');
                const [hours, minutes] = time.split(':');
                let hour24 = parseInt(hours);
                if (period === 'PM' && hour24 !== 12) hour24 += 12;
                if (period === 'AM' && hour24 === 12) hour24 = 0;
                bookingDateTime.setHours(hour24, parseInt(minutes), 0, 0);

                const payload = {
                  name: bookingData.name,
                  email: bookingData.email,
                  selectedDate: bookingData.selectedDate.toISOString().split('T')[0],
                  selectedTime: bookingData.selectedTime,
                  bookingDateTime: bookingDateTime.toISOString(),
                  package: pkg.name,
                  packageId: pkg.id,
                  packagePrice: pkg.price,
                  timestamp: new Date().toISOString(),
                  source: 'Booking Request Form',
                };

                console.log('Sending payload:', payload); // Debug log

                // Send data to n8n webhook
                const response = await fetch(webhookUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload),
                });

                console.log('Response status:', response.status); // Debug log
                console.log('Response ok:', response.ok); // Debug log

                if (!response.ok) {
                  const errorText = await response.text();
                  console.error('Error response:', errorText);
                  throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }

                const responseData = await response.json().catch(() => ({}));
                console.log('Response data:', responseData); // Debug log

                // Move to success step
                setStep(2);
              } catch (error) {
                console.error('Booking submission error:', error);
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                setError(`Failed to submit booking request: ${errorMessage}. Please try again or contact us directly.`);
              } finally {
                setIsSubmitting(false);
              }
            }} className="space-y-4" aria-label="Booking request form">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <div>
                <label htmlFor="booking-name" className="block text-xs font-medium text-[#362b24] uppercase tracking-wide mb-1.5">
                  Full Name <span className="text-[#c06e46]">*</span>
                </label>
                <input 
                  required 
                  type="text" 
                  id="booking-name"
                  aria-required="true"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  className="w-full bg-white border border-[#362b24]/10 rounded-xl px-4 py-3 text-[#362b24] focus:outline-none focus:border-[#c06e46] focus:ring-1 focus:ring-[#c06e46]/20 transition-colors" 
                  placeholder="Jane Doe" 
                />
              </div>
              <div>
                <label htmlFor="booking-email" className="block text-xs font-medium text-[#362b24] uppercase tracking-wide mb-1.5">
                  Email Address <span className="text-[#c06e46]">*</span>
                </label>
                <input 
                  required 
                  type="email" 
                  id="booking-email"
                  aria-required="true"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  className="w-full bg-white border border-[#362b24]/10 rounded-xl px-4 py-3 text-[#362b24] focus:outline-none focus:border-[#c06e46] focus:ring-1 focus:ring-[#c06e46]/20 transition-colors" 
                  placeholder="jane@example.com" 
                />
              </div>
              {/* Calendar and Time Selection */}
              <div>
                <label className="block text-xs font-medium text-[#362b24] uppercase tracking-wide mb-2">
                  Select Date & Time <span className="text-[#c06e46]">*</span>
                </label>
                <CalendarPicker
                  selectedDate={bookingData.selectedDate}
                  selectedTime={bookingData.selectedTime}
                  onDateSelect={(date) => {
                    setBookingData({ ...bookingData, selectedDate: date, selectedTime: '' });
                    setError(null);
                  }}
                  onTimeSelect={(time) => {
                    setBookingData({ ...bookingData, selectedTime: time });
                    setError(null);
                  }}
                />
                {bookingData.selectedDate && bookingData.selectedTime && (
                  <p className="mt-2 text-sm text-[#85756b]">
                    Selected: {bookingData.selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {bookingData.selectedTime}
                  </p>
                )}
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="primary" 
                  className="w-full justify-center"
                  onClick={(e) => {
                    // Form submission is handled by onSubmit
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Continue to Reserve'}
                </Button>
                <p className="text-center text-[10px] text-[#85756b] mt-3">
                  No payment required today. We will contact you to confirm dates.
                </p>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#c06e46]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#c06e46]">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl text-[#362b24] mb-2">Request Received</h4>
              <p className="text-[#85756b] mb-6">Thank you for choosing the {pkg.name} package. We will be in touch within 24 hours to finalize your booking.</p>
              <Button variant="outline" onClick={onClose} className="w-full justify-center">
                Return to Site
              </Button>
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-[#362b24]/5">
            <motion.div 
                className="h-full bg-[#c06e46]" 
                initial={{ width: "0%" }}
                animate={{ width: step === 1 ? "50%" : "100%" }}
            />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Pricing: React.FC = () => {
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);

  // Helper function to get theme styles based on package ID
  interface ThemeStyles {
    card: string;
    title: string;
    price: string;
    desc: string;
    checkBg: string;
    checkIcon: string;
    featureText: string;
    button: string;
    badge: string;
  }

  const getTheme = (id: string): ThemeStyles => {
    switch (id) {
        case 'essential':
            return {
                card: "bg-white border border-[#362b24]/10 hover:shadow-xl hover:border-[#c06e46]/30 hover:-translate-y-2",
                title: "text-[#362b24]",
                price: "text-[#362b24]",
                desc: "text-[#85756b]",
                checkBg: "bg-[#362b24]/5",
                checkIcon: "text-[#362b24]",
                featureText: "text-[#5c5048]",
                button: "bg-[#362b24] text-[#f5f2eb] hover:bg-[#2e231e] shadow-md shadow-[#362b24]/10",
                badge: "hidden"
            };
        case 'signature': // Reverted to Dark Brown with explicitly defined corners
            return {
                card: "bg-[#362b24] text-[#f5f2eb] rounded-3xl overflow-hidden shadow-2xl shadow-black/20 z-10 border border-[#4a3e36] hover:-translate-y-2",
                title: "text-[#f5f2eb]",
                price: "text-[#f5f2eb]",
                desc: "text-[#a89b91]",
                checkBg: "bg-[#c06e46]", // Orange Accent
                checkIcon: "text-white",
                featureText: "text-[#e8e2d9]",
                button: "bg-[#f5f2eb] text-[#362b24] hover:bg-white hover:scale-[1.02] shadow-xl", // Light button
                badge: "bg-[#c06e46] text-[#f5f2eb]"
            };
        case 'masterpiece': // Premium Deep Navy & Gold
            return {
                card: "bg-[#16213e] text-[#f5f2eb] border border-[#16213e] hover:shadow-2xl hover:shadow-[#16213e]/30 hover:-translate-y-2", 
                title: "text-[#f5f2eb]",
                price: "text-[#d6ad60]", // Gold
                desc: "text-[#94a3b8]", // Blue-grey
                checkBg: "bg-[#d6ad60]/10", 
                checkIcon: "text-[#d6ad60]", // Gold
                featureText: "text-[#e2e8f0]", 
                button: "bg-[#d6ad60] text-[#16213e] hover:bg-[#c49b50] shadow-xl shadow-[#d6ad60]/10", // Gold Button
                badge: "hidden"
            };
        default: 
            return {
                card: "bg-white border border-[#362b24]/10",
                title: "text-[#362b24]",
                price: "text-[#362b24]",
                desc: "text-[#85756b]",
                checkBg: "bg-[#362b24]/5",
                checkIcon: "text-[#362b24]",
                featureText: "text-[#5c5048]",
                button: "bg-[#362b24] text-[#f5f2eb]",
                badge: "hidden"
            };
    }
  };

  return (
    <section id="plans" className="relative py-24 md:py-32 px-6">
      <AnimatePresence>
        {selectedPkg && <BookingModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Reveal width="100%">
            <h2 className="font-serif text-4xl md:text-5xl text-[#362b24] mb-6">
              Simple, transparent pricing.
            </h2>
          </Reveal>
          <Reveal delay={0.2} width="100%">
            <p className="text-[#85756b] text-lg">
              Choose the perfect package for your family's needs. All packages include our signature cinematic color grading and professional sound mixing.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {packages.map((pkg, i) => {
            const theme = getTheme(pkg.id);
            
            return (
              <Reveal key={pkg.id} delay={0.1 * i} allowOverflow>
                <div 
                  className={`relative h-full flex flex-col p-8 rounded-3xl transition-all duration-300 cursor-default ${theme.card}`}
                >
                  <div className="mb-8">
                    <h3 className={`font-serif text-2xl mb-2 ${theme.title}`}>
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className={`text-4xl font-semibold ${theme.price}`}>{pkg.price}</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${theme.desc}`}>
                      {pkg.description}
                    </p>
                  </div>

                  <ul className="flex-grow space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <div className={`mt-0.5 rounded-full p-0.5 ${theme.checkBg}`}>
                          <Check className={`w-3 h-3 ${theme.checkIcon}`} />
                        </div>
                        <span className={theme.featureText}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPkg(pkg)}
                    className={`w-full py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 ${theme.button}`}
                  >
                    Book This Package
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
        
        <Reveal delay={0.4} width="100%">
           <p className="text-center text-[#85756b] text-sm mt-12">
             Need a custom arrangement? <a href="#inquire" className="text-[#c06e46] underline decoration-[#c06e46]/30 underline-offset-4 hover:decoration-[#c06e46] transition-all">Contact us</a> for bespoke production quotes.
           </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Pricing;