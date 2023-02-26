import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Select from "react-select";
import { Navigate } from "react-router-dom";

import "react-tabs/style/react-tabs.css";
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
        })};
        fetch(
            "http://localhost:3000/workshops",
            requestOptions
        );
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
        setUpdateDate(Date(workshop.date.substring(0, 10)));
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
                <Tabs defaultIndex={1}>
                    <h1>{workshop.title}</h1>

                    <TabPanel className="tab-panel">
                        <div>
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
                                id: workshopID,
                            }}
                        >
                            Take Attendance
                        </Link>
                    </TabPanel>
                </Tabs>
            )}
        </div>
    );
};
