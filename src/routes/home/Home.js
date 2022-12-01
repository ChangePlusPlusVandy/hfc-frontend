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
                <Link to="/users">Users</Link>
                <Link to="/beneficiaries">Beneficiaries</Link>
                <Link to="/programs">Programs</Link>
                <Link to="/workshops">Workshops</Link>
                <Link to="/assessment">Assessment</Link>
            </div>
        </div>
    );
};

export default Home;
