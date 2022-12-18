// Packages
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    Workshop,
    GetWorkshops,
    WorkshopForm,
    DeleteWorkshops,
} from "./src/routes/Workshop/Workshop";
// Styles
import "./index.css";

// React Components
import Home from "./src/routes/home/Home";
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
        element: <div>INSERT BENEFICIARIES COMPONENT HERE</div>,
    },
    {
        path: "/programs",
        element: <div>INSERT PROGRAMS COMPONENT HERE</div>,
    },
    {
        path: "/workshops",
        children: [
            { path: "", element: <Workshop /> },
            { path: "form", element: <WorkshopForm /> },
            { path: "get", element: <GetWorkshops /> },
            { path: "delete", element: <DeleteWorkshops /> },
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
