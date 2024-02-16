import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [userData, setUserData] = useState({});

    const [firebaseError, setFirebaseError] = useState();

    auth().onAuthStateChanged((newUser) => {
        setUser(newUser);
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const unsubscribeToUser = firestore()
                    .collection("users")
                    .doc(user?.uid)
                    .onSnapshot((doc) => {
                        if (doc.exists) {
                            const userDoc = doc.data();
                            setUserData(userDoc);
                        }
                    });

                return () => unsubscribeToUser();
            } catch (error) {
                console.error("Error fetching user data:", error);
            }

        }

        if (user) {
            fetchUserData();
        }

    }, [user])


    const signOut = async () => {
        try {
            await auth().signOut();
            console.log('User signed out!');
        } catch (error) {
            console.error(error);
        }
    }

    const handleSignUpWithEmailAndPassword = async (email, password, username) => {
        try {
            const createAccountTask = await auth().createUserWithEmailAndPassword(email, password);

            console.log(`User ${createAccountTask.user.email} with the id of ${createAccountTask.user.uid} has been created.`);

            const createUserDoc = await firestore().collection("users").doc(createAccountTask.user.uid).set({
                email: email,
                name: username,
                createdAt: new Date().getTime(),
                id: createAccountTask.user.uid,
            })

            console.log("Doc for the user has been created.")

        } catch (error) {

            if (error.code === 'auth/email-already-in-use') {
                setFirebaseError('That email address is already in use!')
            }
            if (error.code === 'auth/invalid-email') {
                setFirebaseError('That email address is invalid!')
            } else {
                console.error(error)
            }
        }
    }

    const handleSignInWithEmailAndPassword = async (email, password) => {
        try {
            const signInTask = await auth().signInWithEmailAndPassword(email, password);

            console.log(`User with the id of ${signInTask.user.uid} sign in.`);

        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setFirebaseError('Invalid password or email address');
                    break;
                case 'auth/user-disabled':
                    setFirebaseError('User account has been disabled');
                    break;
                case 'auth/user-not-found':
                    setFirebaseError('No user found with this email address');
                    break;
                case 'auth/wrong-password':
                    setFirebaseError('Invalid password or email address');
                    break;
                case 'auth/too-many-requests':
                    setFirebaseError('Too many unsuccessful sign-in attempts. Try again later.');
                    break;
                case 'auth/network-request-failed':
                    setFirebaseError('Network error. Check your internet connection.');
                    break;
                case 'auth/operation-not-allowed':
                    setFirebaseError('Sign-in with email and password is not enabled.');
                    break;
                case 'auth/invalid-credential':
                    setFirebaseError('Invalid password or email address');
                    break;
                default:
                    console.error(error);
            }
        }
    }

    const contextValue = useMemo(() => {
        return {
            user,
            userData,
            signOut,
            handleSignInWithEmailAndPassword,
            handleSignUpWithEmailAndPassword,
            firebaseError,
        };
    }, [user, userData, firebaseError]);


    return (
        <AuthContext.Provider
            value={contextValue}>
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