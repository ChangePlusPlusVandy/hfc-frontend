import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import "./SingleWorkshop.css";
import "./Workshops.css";
export const WorkshopSingle = () => {
    const { workshopID } = useParams();

    const [workshop, setWorkshop] = useState({});
    const [updateWorkTitle, setUpdateWorkTitle] = useState("");
    const [updateWorkDesc, setUpdateWorkDesc] = useState("");
    const [updateWorkHosts, setUpdateWorkHosts] = useState([]);
    const [updateWorkStatus, setUpdateWorkStatus] = useState(false);
    const [updateDate, setUpdateDate] = useState(new Date());
    const [editMode, setEditMode] = useState(false);
    const [hostOptions, setHostOptions] = useState([]);
    const [deleteClicked, setDeleteClicked] = useState(false);

    const navigate = useNavigate();
    const deleteWorkshop = () => {
        try {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "auth"
                    )}`,
                },
                body: JSON.stringify({
                    workshopID,
                }),
            };
            fetch("http://localhost:3000/workshops", requestOptions);
            navigate("../");
        } catch (err) {
            console.log(err);
        }
    };

    const updateWorkshop = () => {
        console.log("editing");
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
            },
            body: JSON.stringify({
                _id: workshopID,
                content: {
                    title: updateWorkTitle,
                    description: updateWorkDesc,
                    archived: updateWorkStatus,
                    hosts: updateWorkHosts.map((item) => {
                        return item.value;
                    }),
                    date: new Date(String(updateDate) + "T12:00:00.000z"),
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
        setUpdateWorkHosts(
            workshop.hosts.map((item) => {
                return {
                    value: item._id,
                    label: item.firstName + " " + item.lastName,
                };
            })
        );
    };

    useEffect(() => {
        console.log("here");
        try {
            //TODO: better error handling
            fetch("http://localhost:3000/workshops?_id=" + workshopID, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "auth"
                    )}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    data = data[0];
                    setWorkshop(data);
                });
            fetch("http://localhost:3000/users/users", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "auth"
                    )}`,
                },
            })
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
                    setHostOptions(tempOptions);
                });
        } catch (err) {
            console.log(err);
        }
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
                                >
                                    <input
                                        type="radio"
                                        value={false}
                                        name="sortVal"
                                        defaultChecked={!updateWorkStatus}
                                    />
                                    Active &emsp;&emsp;&emsp;
                                    <input
                                        type="radio"
                                        value={true}
                                        name="sortVal"
                                        defaultChecked={updateWorkStatus}
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
                            {!deleteClicked && (
                                <button
                                    className="delete-btn"
                                    onClick={(e) => setDeleteClicked(true)}
                                >
                                    delete
                                </button>
                            )}
                            {deleteClicked && (
                                <div className="confirm-delete-container">
                                    <p className="confirm-delete-text">
                                        Delete this assessment? You cannot undo
                                        this.
                                    </p>

                                    <button
                                        className="delete-btn"
                                        onClick={(e) => deleteWorkshop()}
                                    >
                                        confirm delete
                                    </button>
                                    <button
                                        className="cancel-btn"
                                        onClick={(e) => setDeleteClicked(false)}
                                    >
                                        cancel
                                    </button>
                                </div>
                            )}
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
                                id="overview-button"
                                className="tab"
                                style={{ backgroundColor: "darkgray" }}
                            >
                                Overview
                            </button>
                            <Link to={"../attendance/" + workshopID}>
                                <button id="enrollment-button" className="tab">
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
                                    <>
                                        {workshop.hosts.map((item) => (
                                            <Link
                                                to={"../../users/" + item._id}
                                            >
                                                {item.firstName +
                                                    " " +
                                                    item.lastName}
                                                <br></br>
                                            </Link>
                                        ))}
                                    </>
                                ) : (
                                    <>none</>
                                )}
                            </div>
                        </div>
                        <div className="workshop-info">
                            <h3>Date</h3>
                            {/*use divs instead of h7*/}
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
                                    <h3>Total Attendees</h3>
                                    <h7>{workshop.numAttendees}</h7>
                                </div>
                                <div className="workshop-info">
                                    <h3>Registered Attendees</h3>
                                    <h7>{workshop.attendees.length}</h7>
                                </div>
                                <div className="workshop-info">
                                    <h3>Unregistered Attendees</h3>
                                    <h7>
                                        {workshop.numAttendees -
                                            workshop.attendees.length}
                                    </h7>
                                </div>
                                <div className="workshop-info">
                                    <h3>Rating</h3>
                                    <h7>{workshop.rating.toFixed(2)}</h7>
                                </div>
                                <div className="workshop-info">
                                    <h3>Attendees: </h3>
                                    <h7>
                                        {workshop.attendees.map((item) => (
                                            <Link
                                                to={
                                                    "../../beneficiaries/" +
                                                    item._id
                                                }
                                            >
                                                {item.firstName +
                                                    " " +
                                                    item.lastName}
                                                <br></br>
                                            </Link>
                                        ))}
                                    </h7>
                                </div>
                            </>
                        ) : (
                            //TODO: Change this to say XX for each item
                            <>
                                <div className="workshop-info">
                                    <h3>Attendees</h3>
                                    <h7>XX</h7>
                                </div>
                                <div className="workshop-info">
                                    <h3>Unregistered Attendees</h3>
                                    <h7>XX</h7>
                                </div>
                                <div className="workshop-info">
                                    <h3>Rating</h3>
                                    <h7>XX</h7>
                                </div>
                                <div className="workshop-info">
                                    <h3>Attendees:</h3>
                                </div>
                            </>
                        )}
                        <br></br>
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
