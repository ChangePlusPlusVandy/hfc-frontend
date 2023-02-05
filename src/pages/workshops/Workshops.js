import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Workshops.css";

export const Workshops = () => {
    return (
        <div className="workshops-page-container">
            <h1> Choose an option</h1>
            <div>
                <Link className="button" to="./create">
                    Create Workshop
                </Link>
                <Link className="button" to="./all">
                    Get Workshops
                </Link>
            </div>
        </div>
    );
};
