// Packages
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Styles
import "./index.css";

// React Components
import Home from "./src/routes/home/Home";
import Programs from "./src/routes/Programs/Programs";
import SingleProgram from "./src/routes/Programs/SingleProgram";

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
        element: <div>INSERT BENEFICIARIES COMPONENT HERE</div>,
    },
    {
        path: "/programs",
        element: <Programs />,
    },
    {
        path: "/programs/singleview",
        element: <SingleProgram />,
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
