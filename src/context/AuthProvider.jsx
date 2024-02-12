import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [firebaseError, setFirebaseError] = useState();
    const [userData, setUserData] = useState({});

    const [isLoginForm, setIsLoginForm] = useState(false);
    const [isRegisterForm, setIsRegisterForm] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [isHeaderShowing, setIsHeaderShowing] = useState(true);

    auth().onAuthStateChanged((newUser) => {
        setUser(newUser);
    });

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("users")
            .doc(user?.uid)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    const userDoc = doc.data();
                    setUserData(userDoc);
                }
            });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [user]);


    const signOut = async () => {
        try {
            await auth().signOut();
            console.log('User signed out!');
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

    const checkIfUserDocExists = (uid) => {
        return new Promise((resolve, reject) => {
            firestore()
                .collection("users")
                .doc(uid)
                .get()
                .then((doc) => {
                    resolve(doc.exists);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const generateRandomUsername = () => {
        const prefix = "user";
        const randomNumber = Math.floor(Math.random() * 10000); // Vous pouvez ajuster la plage de nombres si nécessaire
        return `${prefix}${randomNumber}`;
    };

    const createUserDoc = (uid, email, username) => {
        const randomUsername = generateRandomUsername();

        return new Promise((resolve, reject) => {
            firestore()
                .collection("users")
                .doc(uid)
                .set({
                    email: email,
                    name: username,
                    createdAt: new Date().getTime(),
                    id: uid,
                })
                .then(() => {
                    console.log('User doc created.');
                    setFirebaseError("");
                    openRegisterForm();
                    resolve(null);
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    const signUpWithEmailAndPassword = (email, password, username) => {
        return new Promise((resolve, reject) => {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log("Account created.");
                    resolve(userCredential.user);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    const handleSignUp = (email, password, username) => {
        let uid = "";

        signUpWithEmailAndPassword(email, password)
            .then((user) => {
                if (user) {
                    uid = user.uid;
                    // L'utilisateur est maintenant créé, vérifier si le document existe
                    return checkIfUserDocExists(user.uid);
                }
            })
            .then((docExists) => {
                if (!docExists) {
                    // Le document n'existe pas, créer le document de l'utilisateur
                    return createUserDoc(uid, email, username);
                }
            })
            .catch((error) => {
                console.error(error);
                // Gérer les erreurs ici
                if (error.code === 'auth/email-already-in-use') {
                    setFirebaseError('That email address is already in use!')
                }
                if (error.code === 'auth/invalid-email') {
                    setFirebaseError('That email address is invalid!')
                }
            });
    };


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

    const openLoginForm = () => {
        setIsLoginForm(prevState => !prevState)
    }

    const openRegisterForm = () => {
        setIsRegisterForm(prevState => !prevState)
    }

    const contextValue = useMemo(() => {
        return {
            user,
            userData,
            signOut,
            isLoginForm,
            isRegisterForm,
            openLoginForm,
            openRegisterForm,
            signInWithEmailAndPassword,
            handleSignUp,
            firebaseError,
            setFirebaseError,
            isProfileLoading,
            setIsProfileLoading,
            isHeaderShowing,
            setIsHeaderShowing
        };
    }, [user, userData, isLoginForm, isRegisterForm, firebaseError, isProfileLoading, isHeaderShowing]);


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