// Packages
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    Workshops,
    WorkshopsList,
    WorkshopCreateForm,
    WorkshopDeleteForm,
} from "./src/routes/workshops/Workshops";
// Styles
import "./index.css";

// React Components
import Home from "./src/routes/home/Home";
import Beneficiaries from "./src/routes/beneficiaries/Beneficiaries";
import Form from "./src/routes/form/Form";

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
        element: <Beneficiaries />,
    },
    {
        path: "/programs",
        element: <div>INSERT PROGRAMS COMPONENT HERE</div>,
    },
    {
        path: "/workshops",
        children: [
            { path: "", element: <Workshops /> },
            { path: "create", element: <WorkshopCreateForm /> },
            { path: "get", element: <WorkshopsList /> },
            { path: "delete", element: <WorkshopDeleteForm /> },
        ],
    },
    {
        path: "/assessment",
        element: <div>INSERT ASSESSMENT COMPONENT HERE</div>,
    },
    {
        path: "/form",
        element: <Form />,
    },
]);

// Mount the App component to the DOM element with id "root"
const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
