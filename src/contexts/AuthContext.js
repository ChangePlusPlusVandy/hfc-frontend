import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [fbUser, setFbUser] = useState();
    const [mongoUser, setMongoUser] = useState({
        firstName: "",
        lastName: "",
        firebaseUID: "",
        joinDate: "",
        level: "",
        languages: "",
        phoneNumber: "",
        archived: "",
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setFbUser(user);

                // Get mongo user
                const res = await fetch(
                    `http://localhost:3000/users?firebaseUID=${user.uid}`
                );
                const mongoUser = await res.json();
                const {
                    firstName,
                    lastName,
                    firebaseUID,
                    joinDate,
                    level,
                    languages,
                    phoneNumber,
                    archived,
                } = mongoUser[0];
                setMongoUser({
                    firstName: firstName,
                    lastName: lastName,
                    firebaseUID: firebaseUID,
                    joinDate: joinDate,
                    level: level,
                    languages: languages,
                    phoneNumber: phoneNumber,
                    archived: archived,
                });
                setIsAdmin(parseInt(level) == 3);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const setToken = async () => {
        const userToken = await fbUser.getIdToken();
        window.localStorage.setItem("auth", userToken);
    };

    useEffect(() => {
        if (isAdmin) {
            console.log("Admin user found, setting token");
            setToken();
        } else {
            console.log("Admin user not found, removing token");
            window.localStorage.removeItem("auth");
        }
    }, [isAdmin]);

    const value = {
        fbUser,
        mongoUser,
        isAdmin,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
