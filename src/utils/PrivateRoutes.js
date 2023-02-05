import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const PrivateRoutes = () => {
    let user = auth.currentUser;

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
