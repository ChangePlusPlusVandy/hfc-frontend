import React, { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import "./Workshops.css";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";

export const WorkshopsList = () => {
    const [workshops, setWorkshops] = useState([]);

    // Fetch workshops
    useEffect(() => {
        fetch("http://localhost:3000/workshops")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched workshops:");
                console.log(data);
                setWorkshops(data);
            });
    }, []);

    return (
        <ul>
            {workshops.map((workshop) => (
                <li key={workshop.id}>{JSON.stringify(workshop)}</li>
            ))}
        </ul>
    );
};
