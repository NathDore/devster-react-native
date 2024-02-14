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
                    setFirebaseError('No user is currently signed in.');
                    break;
                case 'auth/network-request-failed':
                    setFirebaseError('Network error. Check your internet connection.');
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

    const createUserDoc = (uid, email, username) => {
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
                    resolve(null);
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    const signUpWithEmailAndPassword = (email, password) => {
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
            })
    }

    const contextValue = useMemo(() => {
        return {
            user,
            userData,
            signOut,
            signInWithEmailAndPassword,
            handleSignUp,
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