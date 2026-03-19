'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import emailjs from '@emailjs/browser';
import { useInquiry } from '@/context/InquiryContext';

export function InquiryModal() {
    const { isOpen, closeModal } = useInquiry();
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
        setFormData((prev: typeof formData) => ({ ...prev, [key]: value }));
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
            setTimeout(() => {
                closeModal();
                setStatus('idle');
            }, 3000);
        } catch (error: unknown) {
            const err = error as { text?: string };
            console.error('EmailJS Error Details:', err);
            setStatus('error');
            setErrorMessage(err?.text || 'Failed to send message. Please try again later.');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
                    {/* Darker subtle overlay to focus on the modal, but keeping it very minimal as requested */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-dark/5 backdrop-blur-[2px] pointer-events-auto"
                        onClick={closeModal}
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-xl mx-4 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_30px_100px_-15px_rgba(0,0,0,0.2)] border border-white/50 overflow-hidden pointer-events-auto"
                    >
                        {/* Header Image/Pattern */}
                        <div className="h-32 bg-gold/10 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent scale-150" />
                            </div>
                            <button 
                                onClick={closeModal}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/50 backdrop-blur-sm text-dark hover:bg-white transition-colors z-20"
                            >
                                <X size={20} />
                            </button>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <span className="text-gold font-sans text-[10px] tracking-[0.4em] uppercase font-bold block mb-1">Inquiry Form</span>
                                    <h3 className="font-serif text-3xl text-dark">Book Your Experience</h3>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 lg:p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            required
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-soft-gray border border-dark/5 rounded-xl focus:border-gold outline-none transition-colors font-sans text-dark"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            required
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-soft-gray border border-dark/5 rounded-xl focus:border-gold outline-none transition-colors font-sans text-dark"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-soft-gray border border-dark/5 rounded-xl focus:border-gold outline-none transition-colors font-sans text-dark"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Message</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-soft-gray border border-dark/5 rounded-xl focus:border-gold outline-none transition-colors font-sans text-dark resize-none"
                                        placeholder="Tell us about your planned stay..."
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full rounded-2xl py-4 flex items-center justify-center gap-2 shadow-xl shadow-gold/20"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : 'Send Inquiry'}
                                    </Button>
                                </div>

                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center gap-3 text-green-600 bg-green-50 p-4 rounded-xl border border-green-100"
                                    >
                                        <CheckCircle2 size={20} />
                                        <p className="font-sans text-sm font-medium">Message sent successfully! We&apos;ll get back to you soon.</p>
                                    </motion.div>
                                )}

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100"
                                    >
                                        <AlertCircle size={20} />
                                        <p className="font-sans text-sm font-medium">{errorMessage}</p>
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
