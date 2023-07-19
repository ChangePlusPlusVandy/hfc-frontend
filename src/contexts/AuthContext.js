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
        _id: "",
        phoneNumber: "",
        archived: "",
    });

    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Setting firebase user state
                console.log("[AuthContext] firebase user found");
                setFbUser(user);
            } else {
                console.log("[AuthContext] firebase user NOT found");
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const setToken = async () => {
        const userToken = await fbUser.getIdToken();
        window.localStorage.setItem("auth", userToken);
    };

    const getMongoUser = async () => {
        const API_URL = process.env.API_URL;
        // Get mongo user to set mongo user state
        try {
            const res = await fetch(
                API_URL + `/users?firebaseUID=${fbUser.uid}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "auth"
                        )}`,
                    },
                }
            );
            const mongoUser = await res.json();
            console.log("AuthContext got associated mongoUser");
            const {
                firstName,
                lastName,
                firebaseUID,
                joinDate,
                level,
                languages,
                phoneNumber,
                archived,
                _id,
            } = mongoUser[0];
            setMongoUser({
                firstName: firstName,
                lastName: lastName,
                firebaseUID: firebaseUID,
                joinDate: joinDate,
                level: level,
                _id: _id,
                languages: languages,
                phoneNumber: phoneNumber,
                archived: archived,
            });
            // if mongoUser is level 3 set admin state
            setIsAdmin(parseInt(level) == 3);
        } catch (err) {
            console.log(err);
        }
    };

    // use effect that fires sets/removes auth token when isAdmin state changes
    useEffect(() => {
        if (fbUser) {
            console.log("User found, setting token");
            setToken()
                .then(() => getMongoUser())
                .then(() => setLoading(false));
        } else {
            console.log("User not found, removing token");
            window.localStorage.removeItem("auth");
        }
    }, [fbUser]);

    // these are the states that will be available to the whole app through the useAuth hook
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
