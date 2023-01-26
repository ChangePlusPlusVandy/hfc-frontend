// Packages
import React from "react";
import { createRoot } from "react-dom/client";

// Global Styles
import "./global.css";

// Main App Component
import App from "./App";

// Mount the App component to the DOM element with id "root"
const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
