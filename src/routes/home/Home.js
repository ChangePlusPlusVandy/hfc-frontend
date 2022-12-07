// Packages
import React from "react";
import { Link } from "react-router-dom";

// Styles
import "./Home.css";

const Home = () => {
    return (
        <div className="home">
            <h1>Home</h1>
            <div>
                <Link className="button" to="/users">
                    Users
                </Link>
                <Link className="button" to="/beneficiaries">
                    Beneficiaries
                </Link>
                <Link className="button" to="/programs">
                    Programs
                </Link>
                <Link className="button" to="/workshops">
                    Workshops
                </Link>
                <Link className="button" to="/assessment">
                    Assessment
                </Link>
                <Link className="button" to="/form">
                    Form
                </Link>
            </div>
        </div>
    );
};

export default Home;
