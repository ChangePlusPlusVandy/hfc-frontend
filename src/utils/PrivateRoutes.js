import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase/firebase";

const PrivateRoutes = () => {
    const navigate = useNavigate();

    onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) {
            console.log("User is not logged in. Redirecting...");
            navigate("/login");
        }
    });

    return <Outlet />;
};

export default PrivateRoutes;
