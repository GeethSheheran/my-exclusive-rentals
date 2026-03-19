'use client';

import React, { createContext, useContext, useState } from 'react';

interface InquiryContextType {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <InquiryContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
        </InquiryContext.Provider>
    );
}

export function useInquiry() {
    const context = useContext(InquiryContext);
    if (context === undefined) {
        throw new Error('useInquiry must be used within an InquiryProvider');
    }
    return context;
}
