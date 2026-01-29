import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Download, Sparkles, Clock, Users } from 'lucide-react';
import { sanitizeName, sanitizeEmail, sanitizePhone, sanitizeText, RateLimiter } from '../utils/security';
import { Reveal } from './ui/Reveal';

const FreeQuestionsLanding: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    recipient: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const rateLimiter = new RateLimiter('cta', 3, 60000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rateLimiter.canSubmit()) {
      const waitTime = Math.ceil(rateLimiter.getTimeUntilNextSubmission() / 1000);
      setErrors({ submit: `Please wait ${waitTime} seconds before submitting again.` });
      return;
    }
    
    const newErrors: Record<string, string> = {};
    
    try {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else {
        sanitizeName(formData.name);
      }
    } catch (err) {
      newErrors.name = err instanceof Error ? err.message : 'Invalid name';
    }
    
    try {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else {
        sanitizeEmail(formData.email);
      }
    } catch (err) {
      newErrors.email = err instanceof Error ? err.message : 'Invalid email address';
    }
    
    try {
      if (formData.phone) {
        sanitizePhone(formData.phone);
      }
    } catch (err) {
      newErrors.phone = err instanceof Error ? err.message : 'Invalid phone number';
    }
    
    try {
      if (!formData.recipient.trim()) {
        newErrors.recipient = 'Please tell us who this interview is for';
      } else {
        sanitizeText(formData.recipient, 500);
      }
    } catch (err) {
      newErrors.recipient = err instanceof Error ? err.message : 'Invalid input';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setFormState('submitting');
    
    try {
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_CTA || 'https://mattarntsen.app.n8n.cloud/webhook-test/free-questions';
      
      if (!webhookUrl || webhookUrl === 'undefined') {
        throw new Error('Webhook URL not configured');
      }

      const sanitizedName = sanitizeName(formData.name);
      const sanitizedEmail = sanitizeEmail(formData.email);
      const sanitizedPhone = formData.phone ? sanitizePhone(formData.phone) : 'Not provided';
      const sanitizedRecipient = sanitizeText(formData.recipient, 500);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sanitizedName,
          email: sanitizedEmail,
          phone: sanitizedPhone,
          recipient: sanitizedRecipient,
          timestamp: new Date().toISOString(),
          source: 'Free Questions Landing Page',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      rateLimiter.recordSubmission();
      
      setFormState('success');
      setFormData({ name: '', email: '', phone: '', recipient: '' });
      setErrors({});
    } catch (error) {
      setFormState('idle');
      setErrors({ 
        submit: 'Failed to submit. Please try again or contact us directly.' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2eb]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#c06e46]/10 rounded-[100%] blur-[150px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <Reveal width="100%">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 bg-[#c06e46]/10 text-[#c06e46] px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span>FREE RESOURCE</span>
              </motion.div>
            </Reveal>
            
            <Reveal delay={0.1} width="100%">
              <h1 className="font-serif text-5xl md:text-7xl text-[#362b24] mb-6 leading-tight">
                Capture Their Story<br />
                <span className="text-[#c06e46] italic">Before It's Too Late</span>
              </h1>
            </Reveal>
            
            <Reveal delay={0.2} width="100%">
              <p className="text-xl md:text-2xl text-[#85756b] mb-8 max-w-3xl mx-auto leading-relaxed">
                Get my <strong className="text-[#362b24]">free list of 12 interview questions</strong>—the same ones I use when creating professional legacy films.
              </p>
            </Reveal>
          </div>

          {/* Benefits Grid */}
          <Reveal delay={0.3} width="100%">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#362b24]/10">
                <div className="w-12 h-12 bg-[#c06e46]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Download className="w-6 h-6 text-[#c06e46]" />
                </div>
                <h3 className="font-semibold text-[#362b24] mb-2 text-center">Instant Access</h3>
                <p className="text-sm text-[#85756b] text-center">Get your questions delivered immediately to your inbox</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#362b24]/10">
                <div className="w-12 h-12 bg-[#c06e46]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-6 h-6 text-[#c06e46]" />
                </div>
                <h3 className="font-semibold text-[#362b24] mb-2 text-center">12 Essential Questions</h3>
                <p className="text-sm text-[#85756b] text-center">From months of legacy film production</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#362b24]/10">
                <div className="w-12 h-12 bg-[#c06e46]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Clock className="w-6 h-6 text-[#c06e46]" />
                </div>
                <h3 className="font-semibold text-[#362b24] mb-2 text-center">No Time Limit</h3>
                <p className="text-sm text-[#85756b] text-center">Take your time - these stories are worth preserving</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form Section - The Main CTA */}
      <section className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl shadow-[#362b24]/10 border border-[#362b24]/10 overflow-hidden">
            {formState === 'success' ? (
              <div className="p-12 md:p-16 text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 rounded-full bg-[#c06e46] flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="font-serif text-3xl md:text-4xl text-[#362b24] mb-4">Check Your Email!</h2>
                <p className="text-lg text-[#85756b] mb-8">
                  Your free interview questions list is on its way. Check your inbox (and spam folder) in the next few minutes.
                </p>
                <div className="bg-[#f5f2eb] rounded-xl p-6 mb-8">
                  <p className="text-sm text-[#85756b] mb-2">While you wait, check out our:</p>
                  <a 
                    href="/#plans" 
                    className="text-[#c06e46] hover:text-[#362b24] font-medium underline decoration-[#c06e46]/30 underline-offset-4 hover:decoration-[#c06e46] transition-all"
                  >
                    Professional Legacy Film Packages →
                  </a>
                </div>
                <button 
                  onClick={() => {
                    setFormState('idle');
                    setFormData({ name: '', email: '', phone: '', recipient: '' });
                  }}
                  className="text-sm text-[#c06e46] hover:text-[#362b24] transition-colors"
                >
                  Request another copy
                </button>
              </div>
            ) : (
              <div className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="font-serif text-3xl md:text-4xl text-[#362b24] mb-4">
                    Get Your Free Questions List
                  </h2>
                  <p className="text-lg text-[#85756b]">
                    The same 12 questions I use when creating professional legacy films. Refined through months of work.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="landing-name" className="block text-sm font-medium text-[#362b24] mb-2">
                        Your Name <span className="text-[#c06e46]">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="landing-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        placeholder="Jane Doe" 
                        className={`w-full bg-[#f5f2eb] border rounded-xl px-4 py-3 text-[#362b24] placeholder-[#85756b]/70 focus:outline-none focus:ring-2 transition-all ${
                          errors.name 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-[#362b24]/10 focus:border-[#c06e46] focus:ring-[#c06e46]/20'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600" role="alert">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="landing-email" className="block text-sm font-medium text-[#362b24] mb-2">
                        Email Address <span className="text-[#c06e46]">*</span>
                      </label>
                      <input 
                        type="email" 
                        id="landing-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={254}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        placeholder="jane@example.com" 
                        className={`w-full bg-[#f5f2eb] border rounded-xl px-4 py-3 text-[#362b24] placeholder-[#85756b]/70 focus:outline-none focus:ring-2 transition-all ${
                          errors.email 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-[#362b24]/10 focus:border-[#c06e46] focus:ring-[#c06e46]/20'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone (Optional) */}
                  <div>
                    <label htmlFor="landing-phone" className="block text-sm font-medium text-[#362b24] mb-2">
                      Phone Number <span className="text-xs text-[#85756b] font-normal">(optional)</span>
                    </label>
                    <input 
                      type="tel" 
                      id="landing-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={20}
                      aria-invalid={!!errors.phone}
                      placeholder="(555) 123-4567" 
                      className={`w-full bg-[#f5f2eb] border rounded-xl px-4 py-3 text-[#362b24] placeholder-[#85756b]/70 focus:outline-none focus:ring-2 transition-all ${
                        errors.phone 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-[#362b24]/10 focus:border-[#c06e46] focus:ring-[#c06e46]/20'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600" role="alert">{errors.phone}</p>
                    )}
                  </div>

                  {/* Recipient */}
                  <div>
                    <label htmlFor="landing-recipient" className="block text-sm font-medium text-[#362b24] mb-2">
                      Who is this interview for? <span className="text-[#c06e46]">*</span>
                    </label>
                    <textarea 
                      id="landing-recipient"
                      name="recipient"
                      value={formData.recipient}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      rows={3}
                      aria-required="true"
                      aria-invalid={!!errors.recipient}
                      placeholder="e.g. My grandmother, parents, myself..." 
                      className={`w-full bg-[#f5f2eb] border rounded-xl px-4 py-3 text-[#362b24] placeholder-[#85756b]/70 focus:outline-none focus:ring-2 transition-all resize-none ${
                        errors.recipient 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-[#362b24]/10 focus:border-[#c06e46] focus:ring-[#c06e46]/20'
                      }`}
                    />
                    {errors.recipient && (
                      <p className="mt-1 text-sm text-red-600" role="alert">{errors.recipient}</p>
                    )}
                  </div>

                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-sm text-red-600" role="alert">{errors.submit}</p>
                    </div>
                  )}

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full bg-[#c06e46] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#a85a35] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#c06e46]/20 text-lg"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Get My Free Questions List
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-center text-[#85756b]">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA to Main Site */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal width="100%">
            <div className="bg-[#362b24] rounded-3xl p-12 text-white">
              <h3 className="font-serif text-3xl md:text-4xl mb-4">
                Want a Cinematic Interview of Your Loved One?
              </h3>
              <p className="text-lg text-[#a89b91] mb-8">
                We'll create a cinematic interview of your loved one for your family to keep for generations.
              </p>
              <a 
                href="/#plans"
                className="inline-flex items-center gap-2 bg-[#c06e46] hover:bg-[#a85a35] text-white font-semibold px-8 py-4 rounded-full transition-all shadow-lg"
              >
                View Our Packages
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default FreeQuestionsLanding;
