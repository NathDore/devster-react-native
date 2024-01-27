import React, { createContext, useContext, useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [firebaseError, setFirebaseError] = useState();

    const [isLoginForm, setIsLoginForm] = useState(false);
    const [isRegisterForm, setIsRegisterForm] = useState(false);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((newUser) => {
            setUser(newUser);
        });
        return subscriber;
    }, []);

    const signOut = async () => {
        try {
            await auth().signOut();
            console.log('User signed out!')
        } catch (error) {
            switch (error.code) {
                case 'auth/no-current-user':
                    console.log('No user is currently signed in.');
                    break;
                case 'auth/network-request-failed':
                    console.log('Network error. Check your internet connection.');
                    break;
                default:
                    console.error(error);
            }
        }
    }

    //abc123?Nm

    const checkIfUserIdExists = (email, username) => {
        firestore()
            .collection("users")
            .doc(user?.uid)
            .get()
            .then((doc) => {
                if (!doc.exists) createUserDoc(email, username);
            })
            .catch((error) => {
                console.error(error);
            })
    };

    const createUserDoc = (email, username) => {
        firestore()
            .collection("users")
            .doc(user?.uid)
            .set({
                email: email,
                name: username,
            })
            .then(() => {
                console.log('user doc created.');
                setFirebaseError("");
            }).catch((error) => {
                console.error(error);
            })
    }

    // Sign up the user with email and password
    const signUpWithEmailAndPassword = (email, password, username) => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                checkIfUserIdExists(email, username);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setFirebaseError('That email address is already in use!')
                }
                if (error.code === 'auth/invalid-email') {
                    setFirebaseError('That email address is invalid!')
                }
                console.error(error);
            })
    }

    // Sign in the user with email and password
    const signInWithEmailAndPassword = (email, password) => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                openLoginForm();
                setFirebaseError("");
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        console.log('Invalid email address');
                        setFirebaseError('Invalid password or email address');
                        break;
                    case 'auth/user-disabled':
                        console.log('User account has been disabled');
                        break;
                    case 'auth/user-not-found':
                        console.log('No user found with this email address');
                        break;
                    case 'auth/wrong-password':
                        setFirebaseError('Invalid password or email address');
                        break;
                    case 'auth/too-many-requests':
                        console.log('Too many unsuccessful sign-in attempts. Try again later.');
                        break;
                    case 'auth/network-request-failed':
                        console.log('Network error. Check your internet connection.');
                        break;
                    case 'auth/operation-not-allowed':
                        console.log('Sign-in with email and password is not enabled.');
                        break;
                    case 'auth/invalid-credential':
                        setFirebaseError('Invalid password or email address');
                        break;
                    default:
                        console.error(error);
                }
            })
    }

    // Open or close the login form
    const openLoginForm = () => {
        setIsLoginForm(prevState => !prevState)
    }

    // Open or close the register form
    const openRegisterForm = () => {
        setIsRegisterForm(prevState => !prevState)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signOut,
                isLoginForm,
                isRegisterForm,
                openLoginForm,
                openRegisterForm,
                signInWithEmailAndPassword,
                signUpWithEmailAndPassword,
                firebaseError,
                setFirebaseError,
            }}>
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