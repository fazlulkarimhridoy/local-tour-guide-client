/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";


export const AuthContext = createContext(null);
const auth = getAuth(app);


const AuthProvider = ({ children }) => {
    // states
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    //getting current user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail }
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                axios.post("https://local-tour-server.vercel.app/jwt", loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log("token response", res.data);
                    })
            }
            else {
                axios.post("https://local-tour-server.vercel.app/logout", loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log("clear token", res.data);
                    })
            }
        });
        return () => {
            unsubscribe;
        }
    }, [user])

    // google login
    const googleProvider = new GoogleAuthProvider();
    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // create new user
    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sign in existing user
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // logout existing user
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }


    // value of provider
    const authInfo = {
        loginWithGoogle,
        signUp,
        signIn,
        logout,
        loading,
        user
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;