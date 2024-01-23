import { View, Text } from 'react-native'
import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [isRegisterForm, setIsRegisterForm] = useState(false);

    const signOut = () => {
        setIsUserLoggedIn(false);
    }

    const signIn = () => {
        setIsUserLoggedIn(true);
    }

    const openLoginForm = () => {
        setIsLoginForm(prevState => !prevState)
    }


    const openRegisterForm = () => {
        setIsRegisterForm(prevState => !prevState)
    }

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, signOut, signIn, isLoginForm, isRegisterForm, openLoginForm, openRegisterForm }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthProvider