import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import "./DashboardLayout.css";

const DashboardLayout = () => {
    const handleLogout = () => {
        alert("TODO: this lol");
    };

    return (
        <div className="dashboard-layout">
            <div className="sidebar">
                <div>Her Future Coalition Logo</div>
                <div className="PLACEHOLDER-PROFILE-PIC" />
                <h1 className="display-name">Amanda C.</h1>
                <nav>
                    <NavLink to="beneficiaries/all">Beneficiaries List</NavLink>
                    <NavLink to="data">Data Dashboard</NavLink>
                    <NavLink to="beneficiaries/register">
                        Register a Beneficiary
                    </NavLink>
                    <NavLink to="programs">Manage Programs</NavLink>
                    <NavLink to="workshops">Manage Workshops</NavLink>
                    <NavLink to="assessments">Manage Assessments</NavLink>
                </nav>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <Outlet />
        </div>
    );
};

export default DashboardLayout;