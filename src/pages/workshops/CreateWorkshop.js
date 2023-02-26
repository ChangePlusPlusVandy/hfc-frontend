import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { json, Link } from "react-router-dom";
import Select from "react-select";
import "./Workshops.css";

export const WorkshopCreateForm = (props) => {
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [numAttendees, setNumAttendees] = useState(0);
    const [date, setDate] = useState(new Date());
    const [hosts, setHosts] = useState([]);
    const [hostOptions, setHostOptions] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/users/users")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                let tempOptions = data
                    .filter((item) => item.firstName && item.lastName)
                    .map((item) => {
                        return {
                            value: item._id,
                            label: item.firstName + " " + item.lastName,
                        };
                    });
                setHostOptions(tempOptions);
            });
    }, []);
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    //const handleHost
    const handleDescChange = (event) => {
        setDescription(event.target.value);
    };
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };
    const handleHostsChange = (event) => {
        setHosts(event);
        console.log(hosts);
        console.log(hostOptions);
    };

    const createWorkshop = () => {
        console.log("Attempting to create a new workshop...");

        const newWorkshopData = {
            title,
            hosts: hosts.map((item) => {
                return item.value;
            }),
            description,
            date,
            numAttendees, // TODO:
            attendees: [], // TODO:
        };
        if (title && description) {
            console.log("No missing fields...");
            try {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newWorkshopData),
                };
                fetch("http://localhost:3000/workshops", requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.title) {
                            console.log("Post successful! Response:");
                            console.log(data);
                            setMessage("Workshop created successfully!");
                            props.onClose();

                        } else {
                            setMessage("Error: " + data);
                        }
                    });
                navigate(`../`);
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("Missing a required field");
            setMessage("Missing a required field");
        }
    };

    return (
        <div className="modal-container">
            <div className="modal-body">
            <div>Workshop Title</div>
            <input
                type="text"
                id="Workshop Title"
                onChange={handleTitleChange}
                placeholder="Title"
            />
            <br />
            <div>Workshop Description</div>
            <input
                type="text"
                id="description"
                onChange={handleDescChange}
                placeholder="Description"
            />
            <br />
            <div className="dropdown-container">
                <label>
                    Hosts 
                    <br />
                    <Select
                        options={hostOptions}
                        placeholder="Select Hosts"
                        onChange={handleHostsChange}
                        value={hosts}
                        isSearchable={true}
                        isMulti
                    />
                </label>
            </div>
            <br></br>
            <div>Workshop Date</div>
            <input type="date" id="Date" onChange={handleDateChange} />
            <br />
            <br />
            <br />
            <button className="button" onClick={createWorkshop}>
                Create
            </button>
            <div>{message}</div>
            </div>
        </div>
    );
};
