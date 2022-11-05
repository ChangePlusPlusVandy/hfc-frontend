// Packages
import React from "react";
import { createRoot } from "react-dom/client";

// React Components
import App from "./src/App";

// Mount the App component to the DOM element with id "root"
const root = createRoot(document.getElementById("root"));
root.render(<App />);