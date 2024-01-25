import React, { createContext, useContext, useState } from 'react'

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ setIsCreateModalOpen, isCreateModalOpen }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default ModalProvider