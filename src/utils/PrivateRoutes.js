import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const PrivateRoute = () => {
    // const { fbUser } = useAuth();

    // if (fbUser == undefined) {
    //     return <Navigate to="/login" />
    // }

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                console.log("User is not logged in. Redirecting...");
                navigate("/login");
            } else {
                console.log("User is logged in:", currentUser);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return <Outlet />;
};

export default PrivateRoute;
