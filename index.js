// Packages
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Styles
import "./index.css";

// React Components
import Home from "./src/routes/home/Home";
import Programs from "./src/routes/Programs/Programs";
import SingleProgram from "./src/routes/Programs/SingleProgram";
import BeneficiaryRegistration from "./src/routes/beneficiaries/registration/BeneficiaryRegistration";
import Beneficiaries from "./src/routes/beneficiaries/Beneficiaries";
import {
    Workshops,
    WorkshopDeleteForm,
} from "./src/routes/workshops/Workshops";
import { WorkshopCreateForm } from "./src/routes/workshops/CreateWorkshop";
import { WorkshopsList } from "./src/routes/workshops/WorkshopView";
import { WorkshopSingle } from "./src/routes/workshops/singleView";

// Router from React Router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/users",
        element: <div>INSERT USERS COMPONENT HERE</div>,
    },
    {
        path: "/beneficiaries",
        children: [
            { path: "", element: <Beneficiaries /> },
            { path: "register", element: <BeneficiaryRegistration /> },
        ],
    },
    {
        path: "/programs",
        children: [
            { path: "", element: <Programs /> },
            { path: "singleview", element: <SingleProgram /> },
        ],
    },
    {
        path: "/workshops",
        children: [
            { path: "", element: <Workshops /> },
            { path: "create", element: <WorkshopCreateForm /> },
            { path: "get", element: <WorkshopsList /> },
            { path: "delete", element: <WorkshopDeleteForm /> },
            { path: "singleview", element: <WorkshopSingle /> },
        ],
    },
    {
        path: "/assessment",
        element: <div>INSERT ASSESSMENT COMPONENT HERE</div>,
    },
]);

// Mount the App component to the DOM element with id "root"
const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
