import React from "react";
import { Outlet } from "react-router-dom";

import "./DashboardLayout.css";

import NavSidebar from "../components/NavSidebar";

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <NavSidebar />
            <div className="page-content">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
