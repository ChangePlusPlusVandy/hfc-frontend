// Packages
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

// Styles
import "./index.css";

// React Components
import Home from "./src/routes/Home";

// Router from React Router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/beneficiaries",
        element: <div>INSERT BENEFICIARIES COMPONENT HERE</div>,
    },
    {
        path: "/programs",
        element: <div>INSERT PROGRAMS COMPONENT HERE</div>,
    },
    {
        path: "/workshops",
        element: <div>INSERT WORKSHOPS COMPONENT HERE</div>,
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
