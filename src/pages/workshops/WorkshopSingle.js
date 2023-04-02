import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Select from "react-select";
import { Navigate } from "react-router-dom";

import "react-tabs/style/react-tabs.css";
import "./SingleWorkshop.css";
import "./Workshops.css";
export const WorkshopSingle = () => {
    const workshopID = useLocation().state.id;
    console.log(workshopID);
    const [workshop, setWorkshop] = useState({});
    const [updateWorkTitle, setUpdateWorkTitle] = useState("");
    const [updateWorkDesc, setUpdateWorkDesc] = useState("");
    const [updateWorkHosts, setUpdateWorkHosts] = useState([]);
    const [updateWorkStatus, setUpdateWorkStatus] = useState(false);
    const [updateDate, setUpdateDate] = useState(new Date());
    const [editMode, setEditMode] = useState(false);
    const [hostOptions, setHostOptions] = useState([]);
    const deleteWorkshop = () => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                workshopID,
            }),
        };
        fetch("http://localhost:3000/workshops", requestOptions);
        Navigate(`../`);
    };
    const updateWorkshop = () => {
        console.log("editing");
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                _id: workshopID,
                content: {
                    title: updateWorkTitle,
                    description: updateWorkDesc,
                    archived: updateWorkStatus,
                    hosts: updateWorkHosts.map((item) => {
                        return item.value;
                    }),
                    date: updateDate,
                },
            }),
        };
        console.log(requestOptions);
        fetch("http://localhost:3000/workshops", requestOptions).then(
            (response) => {
                setEditMode(false);
            }
        );
    };
    const enterUpdateMode = () => {
        setUpdateWorkDesc(workshop.description);
        setUpdateWorkTitle(workshop.title);
        setUpdateWorkStatus(workshop.archived);
        setUpdateDate(new Date(workshop.date).toISOString().substring(0, 10));
        setEditMode(true);
    };
    useEffect(() => {
        console.log("here");
        fetch("http://localhost:3000/workshops?_id=" + workshopID)
            .then((response) => response.json())
            .then((data) => {
                data = data[0];
                fetch("http://localhost:3000/users/users")
                    .then((response2) => response2.json())
                    .then((data2) => {
                        let tempOptions = data2
                            .filter((item) => item.firstName && item.lastName)
                            .map((item) => {
                                return {
                                    value: item._id,
                                    label: item.firstName + " " + item.lastName,
                                };
                            });
                        if (updateWorkHosts) {
                            setUpdateWorkHosts([]);
                        } //because useEffect gets called twice
                        let tempHosts = data.hosts.map((item) => {
                            for (let k = 0; k < tempOptions.length; k++) {
                                if (item == tempOptions[k].value) {
                                    setUpdateWorkHosts((oldArray) => [
                                        ...oldArray,
                                        tempOptions[k],
                                    ]);
                                    return tempOptions[k].label;
                                }
                            }
                        });
                        console.log(tempHosts);
                        if (tempHosts) {
                            data.hosts = tempHosts;
                        }
                        setHostOptions(tempOptions);
                        setWorkshop(data);
                    });
            });
    }, [editMode]);
    return (
        <div className="single-workshop-container">
            <Link to="/dashboard/workshops">&lt; back to workshop list</Link>
            {editMode ? (
                <div className="single-workshop">
                    <div className="workshop-info-container">
                        <div className="workshop-info">
                            <h3>Title:</h3>
                            <h7>
                                <input
                                    type="text"
                                    value={updateWorkTitle}
                                    //name="title"
                                    onChange={(e) =>
                                        setUpdateWorkTitle(e.target.value)
                                    }
                                />
                            </h7>
                        </div>
                        <div className="workshop-info">
                            <h3>Description:</h3>
                            <h7>
                                <input
                                    type="text"
                                    value={updateWorkDesc}
                                    name="description"
                                    onChange={(e) =>
                                        setUpdateWorkDesc(e.target.value)
                                    }
                                />
                            </h7>
                        </div>
                        <div className="workshop-info">
                            <h3>Workshop Date</h3>
                            <h7>
                                <input
                                    type="date"
                                    id="Date"
                                    onChange={(e) => {
                                        setUpdateDate(e.target.value);
                                    }}
                                    value={updateDate}
                                />
                            </h7>
                        </div>
                        <div className="workshop-info">
                            <h3>Hosts:</h3>
                            <h7>
                                {" "}
                                <Select
                                    options={hostOptions}
                                    type="text"
                                    value={updateWorkHosts}
                                    name="description"
                                    onChange={(e) => setUpdateWorkHosts(e)}
                                    isMulti
                                />
                            </h7>
                        </div>
                        <div className="workshop-info">
                            <h3>Status</h3>
                            <h7>
                                <div
                                    className="sortIndicator"
                                    onChange={(e) =>
                                        setUpdateWorkStatus(e.target.value)
                                    }
                                    value={updateWorkStatus}
                                >
                                    <input
                                        type="radio"
                                        value={false}
                                        name="sortVal"
                                        checked
                                    />
                                    Active
                                    <input
                                        type="radio"
                                        value={true}
                                        name="sortVal"
                                    />
                                    Archived
                                </div>
                            </h7>
                        </div>
                        <br></br>
                        <div className="workshop-info-buttons-container.workshop-buttons-inner">
                            <button
                                onClick={updateWorkshop}
                                className="submit-button"
                            >
                                Submit
                            </button>
                            &emsp;&emsp;
                            <button
                                onClick={(e) => setEditMode(false)}
                                className="submit-button"
                            >
                                Cancel
                            </button>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    float: "right",
                                }}
                                onClick={deleteWorkshop}
                                className="submit-button"
                                to="../"
                            >
                                Delete
                            </Link>
                            &emsp;&emsp;
                        </div>
                    </div>
                </div>
            ) : (
                <div className="single-workshop">
                                        <div className="single-workshop-heading">
                                        <h1>{workshop.title}</h1>

                                        <div className="heading-buttons">

                        <button
                            onClick={() => editOverviewOrEnroll(false)}
                            id="overview-button"
                            className="tab"
                            style={{backgroundColor: "darkgray"}}
                        >
                            Overview
                        </button>
                        <Link to="../attendance"
                            state={{
                                id: workshopID,
                            }}>
                        <button
                            onClick={() => editOverviewOrEnroll(true)}
                            id="enrollment-button"
                            className="tab"
                        >
                            Attendance
                        </button>
                        </Link>

                    </div>

                    </div>


                    <div className="workshop-info-container">
                        <div className="workshop-info">
                            <h3>Description</h3>
                            <h7>{workshop.description}</h7>
                        </div>
                        <div className="workshop-info">
                            <h3>Hosts</h3>
                            <div className="workshop-hosts">
                                {workshop.hosts && workshop.hosts.length > 0 ? (
                                    <>{workshop.hosts.join(", ")}</>
                                ) : (
                                    <>none</>
                                )}
                            </div>
                        </div>
                        <div className="workshop-info">
                            <h3>Date</h3>
                            <h7>
                                {workshop.date
                                    ? new Date(workshop.date)
                                          .toString()
                                          .substring(0, 10)
                                    : ""}
                            </h7>
                        </div>
                        <div className="workshop-info">
                            <h3>Status</h3>
                            {workshop.archived ? (
                                <h7>ARCHIVED</h7>
                            ) : (
                                <h7>ACTIVE</h7>
                            )}
                        </div>
                        {workshop.numAttendees > 0 ? (
                            <>
                                <div className="workshop-info">
                                    <h3>Attendees</h3>
                                    <h7>{workshop.numAttendees}</h7>
                                </div>
                                <div className="workshop-info">
                                    <h3>Registered Attendees</h3>
                                    <h7>{workshop.numRegistered}</h7>
                                </div>
                                <div className="workshop-info">
                                    <h3>Unregistered Attendees</h3>
                                    <h7>
                                        {workshop.numAttendees -
                                            workshop.numRegistered}
                                    </h7>
                                </div>
                                <div className="workshop-info">
                                    <h3>Rating</h3>
                                    <h7>{workshop.rating.toFixed(2)}</h7>
                                </div>
                            </>
                        ) : (
                            
                            <>
                            Registration not taken yet<br></br><br></br></> 
                        )}
                        <div className="workshop-info-buttons-container.workshop-buttons-inner">
                            <button
                                onClick={enterUpdateMode}
                                className="submit-button"
                            >
                                {" "}
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/*return (
        <div className="single-workshop-container">
            {editMode === true ? (
                <div>
                    <div>
                        <label>
                            <h3>
                                Title:
                                <input
                                    type="text"
                                    value={updateWorkTitle}
                                    //name="title"
                                    onChange={(e) =>
                                        setUpdateWorkTitle(e.target.value)
                                    }
                                />
                            </h3>
                        </label>
                    </div>
                    <div>
                        <h3>
                            <label>
                                Description:
                                <input
                                    type="text"
                                    value={updateWorkDesc}
                                    name="description"
                                    onChange={(e) =>
                                        setUpdateWorkDesc(e.target.value)
                                    }
                                />
                            </label>
                        </h3>
                    </div>
                    <div>
                        <h3>Workshop Date</h3>
                        <input
                            type="date"
                            id="Date"
                            onChange={(e) => {
                                setUpdateDate(e.target.value);
                            }}
                            value={updateDate}
                        />
                    </div>
                    <div>
                        <h3>
                            <label>
                                Hosts:
                                <Select
                                    options={hostOptions}
                                    type="text"
                                    value={updateWorkHosts}
                                    name="description"
                                    onChange={(e) => setUpdateWorkHosts(e)}
                                    isMulti
                                />
                            </label>
                        </h3>
                        <div
                            className="sortIndicator"
                            onChange={(e) =>
                                setUpdateWorkStatus(e.target.value)
                            }
                            value={updateWorkStatus}
                        >
                            <input type="radio" value={false} name="sortVal" />
                            Active
                            <input type="radio" value={true} name="sortVal" />
                            Archived
                        </div>
                    </div>
                    <button onClick={updateWorkshop} className="submit-button">
                        Submit
                    </button>
                </div>
            ) : (
                <div className="single-workshop-container">
                <Link to="/dashboard/workshops">&lt; back to workshop list</Link>
                    <div className="single-workshop">
                    <div className="single-workshop-heading">
                        <h1>{workshop.title}</h1>
                            <h3>Description: {workshop.description}</h3>
                            <h3>
                                {" "}
                                {workshop.hosts && workshop.hosts.length > 0 ? (
                                    <>Hosts: {workshop.hosts.join(", ")}</>
                                ) : (
                                    <></>
                                )}
                            </h3>
                            <h3>Date: {workshop.date}</h3>
                            <h3>
                                Status:{" "}
                                {workshop.archived ? (
                                    <>archived</>
                                ) : (
                                    <>active</>
                                )}
                            </h3>
                            <h3>
                                {workshop.numAttendees ? (
                                    <>
                                        Attendees:{" "}
                                        {workshop.numAttendees}
                                        <br></br>
                                        Registered Attendees:{" "}
                                        {workshop.numRegistered}
                                        <br></br>
                                        Unregistered Attendees:{" "}
                                        {workshop.numAttendees -
                                            workshop.numRegistered}
                                        <br></br>
                                        Rating: {workshop.rating.toFixed(2)}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </h3>
                        </div>

                        <button
                            onClick={enterUpdateMode}
                            className="submit-button"
                        >
                            {" "}
                            Edit Workshop
                        </button>
                        <button
                            onClick={deleteWorkshop}
                            className="submit-button"
                        >
                            {" "}
                            Delete Workshop
                        </button>
                        <Link
                            className="button"
                            to="../attendance"
                            state={{
                                //id: workshopID,
                            }}
                        >
                            Take Attendance
                        </Link>
                        </div>
                        </div>
            )}
        </div>
    );
};


            <div className="heading-buttons">
                        <button
                            onClick={() => editOverviewOrEnroll(false)}
                            id="overview-button"
                            className="tab"
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => editOverviewOrEnroll(true)}
                            id="enrollment-button"
                            className="tab"
                        >
                            Attendance
                        </button>
                    </div>

*/
