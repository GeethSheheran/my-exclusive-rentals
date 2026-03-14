import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import emailjs from '@emailjs/browser';

export function ContactSection() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, name, value } = e.target;
        const key = name || id;
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            await emailjs.send(
                'service_bn40tao',
                'template_8bofmhs',
                {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    message: formData.message
                },
                'PG8ecyqFJPVF8AudW'
            );
            setStatus('success');
            setFormData({ first_name: '', last_name: '', email: '', message: '' });
        } catch (error: any) {
            console.error('EmailJS Error Details:', {
                status: error?.status,
                text: error?.text,
                message: error?.message,
                fullError: error
            });
            setStatus('error');
            setErrorMessage(error?.text || 'Failed to send message. Please try again later.');
        }
    };

    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Column: Contact Info */}
                    <div className="space-y-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-serif text-3xl md:text-4xl text-dark mb-6 leading-tight">
                                Feel free to write on <span className="text-dark/80">info@myexclusiverentals.com</span>
                            </h2>
                            <p className="font-sans text-dark/50 font-extralight tracking-wide text-xl md:text-lg leading-relaxed">
                                To reserve your stay, simply reach out to us via email. Let us help you create your perfect getaway at <span className="font-semibold text-dark/80">Exclusive Rentals</span>. Whether you&apos;re seeking a peaceful retreat or an adventure-filled escape, we are here to ensure your stay is as memorable and comfortable as possible. Get in touch today, and let us turn your dream stay into a reality!
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="font-serif text-3xl md:text-4xl text-dark mb-6 leading-tight">
                                Call us <span className="text-dark/80">+94 77 765 4560</span>
                            </h2>
                            <p className="font-sans text-dark/50 font-extralight tracking-wide text-xl md:text-lg leading-relaxed">
                                For reservations and inquiries, feel free to contact us via mobile or WhatsApp. We&apos;re here to assist you in planning your perfect stay at <span className="font-semibold text-dark/80">Exclusive Rentals</span>. Whether you need more information or help with booking, don&apos;t hesitate to reach out. Let us make your dream getaway a reality with just a message!
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="font-serif text-3xl text-dark mb-6">How can we help?</h3>
                            <p className="font-sans text-dark/50 font-extralight tracking-wide text-xl md:text-lg leading-relaxed mb-12">
                                Whether you have questions about our apartments, need help with bookings, or require more information, we&apos;re here to make your experience effortless and enjoyable. Reach out to us, and let us take care of the rest!
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                {/* Name Field Group */}
                                <div className="space-y-4">
                                    <label className="font-sans text-sm font-bold text-dark block">Name *</label>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                name="first_name"
                                                required
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-dark/10 rounded-sm focus:border-gold outline-none transition-colors font-sans text-dark"
                                            />
                                            <span className="font-sans text-[10px] text-dark/40 uppercase tracking-wider block">First</span>
                                        </div>
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                name="last_name"
                                                required
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-dark/10 rounded-sm focus:border-gold outline-none transition-colors font-sans text-dark"
                                            />
                                            <span className="font-sans text-[10px] text-dark/40 uppercase tracking-wider block">Last</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="space-y-4">
                                    <label htmlFor="email" className="font-sans text-sm font-bold text-dark block">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-dark/10 rounded-sm focus:border-gold outline-none transition-colors font-sans text-dark"
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="space-y-4">
                                    <label htmlFor="message" className="font-sans text-sm font-bold text-dark block">Comment or Message</label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-dark/10 rounded-sm focus:border-gold outline-none transition-colors font-sans text-dark resize-none"
                                    />
                                </div>

                                {/* Submit Button & Feedback */}
                                <div className="space-y-6">
                                    <Button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="rounded-full !px-12 !py-5 text-xs font-bold tracking-wider shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : 'Submit'}
                                    </Button>

                                    {status === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex items-center gap-3 text-green-600 bg-green-50 p-4 rounded-lg border border-green-100"
                                        >
                                            <CheckCircle2 size={20} />
                                            <p className="font-sans text-sm font-medium">Message sent successfully! We&apos;ll get back to you soon.</p>
                                        </motion.div>
                                    )}

                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg border border-red-100"
                                        >
                                            <AlertCircle size={20} />
                                            <p className="font-sans text-sm font-medium">{errorMessage}</p>
                                        </motion.div>
                                    )}
                                </div>
                            </form>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
