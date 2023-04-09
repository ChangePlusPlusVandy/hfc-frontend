import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./NavSidebar.css";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import {useAuth} from '../contexts/AuthContext'

import HFCLogo from "../assets/images/hfc-logo-peach.png";
import HFCLogoSmall from "../assets/images/hfc-logo-peach-small.png";
import DefaultUserProfilePic from "../assets/images/default-user.png";
import UserListIcon from "../assets/icons/user-list-icon.png";
import IdentificiationCardIcon from "../assets/icons/identification-card-icon.png";
import ChartLineIcon from "../assets/icons/chart-line-icon.png";
import TabsIcon from "../assets/icons/tabs-icon.png";
import BookIcon from "../assets/icons/book-icon.png";
import ClipboardTextIcon from "../assets/icons/clipboard-text-icon.png";
import CaretDoubleRightIcon from "../assets/icons/caret-double-right-icon.png";
import UserCircleIcon from "../assets/icons/user-circle-icon.png";

const COLLAPSE_SIDEBAR_THRESHOLD = 768; // the width at which the sidebar collapses in px

const NavSidebar = () => {
    const {mongoUser} = useAuth(); 
    const [user, setUser] = useState({
        firstName: "Amanda",
        lastName: "Cunningham",
    });

    const [isCollapsed, setIsCollapsed] = useState(
        window.innerWidth <= COLLAPSE_SIDEBAR_THRESHOLD
    );

    const toggleIsCollapsed = () => setIsCollapsed((prev) => !prev);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("signout successful");
                navigate("../login");
            })
            .catch((err) => {
                console.log("error signing out");
                console.log(err);
            });
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (mongoUser) {
            setUser({
                firstName: mongoUser.firstName,
                lastName: mongoUser.lastName
            })
        }
    }, [mongoUser]);

    return (
        <div className={`nav-sidebar${isCollapsed ? " collapsed" : ""}`}>
            <img
                src={CaretDoubleRightIcon}
                alt="Collapse"
                className="collapse-icon"
                onClick={toggleIsCollapsed}
            />
            <NavLink to="/dashboard" className="logo-container">
                <img
                    src={isCollapsed ? HFCLogoSmall : HFCLogo}
                    alt="Her Future Coalition"
                    className="logo"
                />
            </NavLink>

            {/* TODO: refactor when auth is implemented */}
            <NavLink to="users/me" className="profile-link-container">
                {isCollapsed ? (
                    <img
                        src={UserCircleIcon}
                        alt={user.firstName + " " + user.lastName}
                        className="icon"
                    />
                ) : (
                    <>
                        <img
                            src={DefaultUserProfilePic}
                            alt={user.firstName + " " + user.lastName}
                            className="user-profile-pic"
                        />
                        <h1 className="display-name">
                            {user.firstName}{" "}
                            {user.lastName && user.lastName.charAt(0) + "."}
                        </h1>
                    </>
                )}
            </NavLink>

            <nav>
                <NavLink to="beneficiaries">
                    <img
                        src={UserListIcon}
                        alt="Beneficiary Directory"
                        className="icon"
                    />
                    <span className="link-label">Beneficiary Directory</span>
                </NavLink>
                <NavLink to="users">
                    <img
                        src={IdentificiationCardIcon}
                        alt="Staff Directory"
                        className="icon"
                    />
                    <span className="link-label">Staff Directory</span>
                </NavLink>
                <NavLink to="data">
                    <img
                        src={ChartLineIcon}
                        alt="Data Dashboard"
                        className="icon"
                    />
                    <span className="link-label">Data Dashboard</span>
                </NavLink>
                <NavLink to="programs">
                    <img src={TabsIcon} alt="Programs" className="icon" />
                    <span className="link-label">Programs</span>
                </NavLink>
                <NavLink to="workshops">
                    <img src={BookIcon} alt="Workshops" className="icon" />
                    <span className="link-label">Workshops</span>
                </NavLink>
                <NavLink to="assessments">
                    <img
                        src={ClipboardTextIcon}
                        alt="Assessments"
                        className="icon"
                    />
                    <span className="link-label">Assessments</span>
                </NavLink>
            </nav>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default NavSidebar;
