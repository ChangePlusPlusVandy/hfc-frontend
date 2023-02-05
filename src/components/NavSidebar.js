import React, { useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./NavSidebar.css";

import HFCLogo from "../assets/images/hfc-logo-peach.png";
import DefaultUserProfilePic from "../assets/images/default-user.png";
import UserListIcon from "../assets/icons/user-list-icon.png";
import ChartLineIcon from "../assets/icons/chart-line-icon.png";
import UserCirclePlusIcon from "../assets/icons/user-circle-plus-icon.png";
import TabsIcon from "../assets/icons/tabs-icon.png";
import BookIcon from "../assets/icons/book-icon.png";
import ClipboardTextIcon from "../assets/icons/clipboard-text-icon.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const NavSidebar = () => {
    // TODO: Get first and last name from logged in user using Firebase Auth
    const [user, setUser] = useState({
        firstName: "Amanda",
        lastName: "Cunningham",
    });

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
        onAuthStateChanged(auth, async (user) => {
            if (user) { 
                console.log("User exists",user,user.uid);
                const res = await fetch(`http://localhost:3000/users?firebaseUID=${user.uid}`);
                const mongoUser = await res.json()
                setUser({firstName: mongoUser[0].firstName,
                            lastName: mongoUser[0].lastName});
            
            } else {
                navigate("../login");
            }
        });
    },[])

    return (
        <div className="nav-sidebar">
            <img src={HFCLogo} alt="Her Future Coalition" className="logo" />
            <img
                src={DefaultUserProfilePic}
                alt="Default User"
                className="user-profile-pic"
            />
            <h1 className="display-name">
                {user.firstName}{" "}
                {user.lastName && user.lastName.charAt(0) + "."}
            </h1>
            <nav>
                <NavLink to="beneficiaries">
                    <img
                        src={UserListIcon}
                        alt="Beneficiaries List"
                        className="icon"
                    />
                    <span>Beneficiaries List</span>
                </NavLink>
                <NavLink to="data">
                    <img
                        src={ChartLineIcon}
                        alt="Data Dashboard"
                        className="icon"
                    />
                    <span>Data Dashboard</span>
                </NavLink>
                <NavLink to="beneficiaries/register">
                    <img
                        src={UserCirclePlusIcon}
                        alt="Register a Beneficiary"
                        className="icon"
                    />
                    <span>Register a Beneficiary</span>
                </NavLink>
                <NavLink to="programs">
                    <img
                        src={TabsIcon}
                        alt="Manage Programs"
                        className="icon"
                    />
                    <span>Manage Programs</span>
                </NavLink>
                <NavLink to="workshops">
                    <img
                        src={BookIcon}
                        alt="Manage Workshops"
                        className="icon"
                    />
                    <span>Manage Workshops</span>
                </NavLink>
                <NavLink to="assessments">
                    <img
                        src={ClipboardTextIcon}
                        alt="Manage Assessments"
                        className="icon"
                    />
                    <span>Manage Assessments</span>
                </NavLink>
            </nav>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default NavSidebar;
