import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Select from "react-select";

import "react-tabs/style/react-tabs.css";
import "./Workshops.css";

export const WorkshopSingle = () => {
    const workshopID = useLocation().state.id;
    console.log(workshopID);
    const [workshop, setWorkshop] = useState({});
    const [hosts, setHosts] = useState([]);
    const [updateWorkTitle, setUpdateWorkTitle] = useState("");
    const [updateWorkDesc, setUpdateWorkDesc] = useState("");
    const [updateWorkHosts, setUpdateWorkHosts] = useState([]);
    const [updateWorkStatus, setUpdateWorkStatus] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [hostOptions, setHostOptions] = useState([]);

    const editUpdateMode = () => {
        setEditMode((current) => !current);
    };
    useEffect(() => {
        console.log("here");
        fetch("http://localhost:3000/workshops?_id=" + workshopID)
            .then((response) => response.json())
            .then((data) => {
                setWorkshop(data[0]);
            });
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
                /*setHosts(workshop.hosts.map((item)=>{
                for(let i=0;i<hostOptions.length;i++){
                    if(hostOptions[i].value==item){
                        console.log(hostOptions[i].label)
                        return(hostOptions[i].label)
                    }
                }
                return(item)
            }))*/
            });
    }, [editMode]);
    return (
        <div className="single-workshop-container">
            {editMode ? (
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
                        <h3>
                            <label>
                                Hosts:
                                <Select
                                    type="text"
                                    value={updateWorkHosts}
                                    name="description"
                                    onChange={(e) => setUpdateWorkHosts(e)}
                                />
                            </label>
                        </h3>
                    </div>
                    <button
                        onClick={updateWorkshopFormOverview}
                        className="submit-button"
                    >
                        Submit
                    </button>
                </div>
            ) : (
                <Tabs defaultIndex={1}>
                    <h3>{workshop.title}</h3>

                    <TabList className="workshop-tabs">
                        <Tab>
                            <h5>Overview</h5>
                        </Tab>
                    </TabList>

                    <TabPanel className="tab-panel">
                        <div>
                            <h3>Description: {workshop.description}</h3>
                            <h3>Hosts: {workshop.hosts}</h3>
                            <h3>Date: {workshop.date}</h3>
                            <h3>
                                Status:{" "}
                                {workshop.archived ? (
                                    <>archived</>
                                ) : (
                                    <>active</>
                                )}
                            </h3>
                        </div>

                        <button
                            onClick={editUpdateMode}
                            className="submit-button"
                        >
                            {" "}
                            Edit Workshop
                        </button>
                    </TabPanel>
                </Tabs>
            )}
        </div>
    );
};

/*{editMode ? (
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
                                        setUpdateWorkTitle(
                                            e.target.value
                                        )
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
                                        setUpdateWorkDesc(
                                            e.target.value
                                        )
                                    }
                                />
                            </label>
                        </h3>
                    </div>

                    <div>
                        <h3>
                            <label>
                                Hosts:
                                <Select
                                    type="text"
                                    value={updateWorkHosts}
                                    name="description"
                                    onChange={(e) =>
                                        setUpdateWorkHosts(
                                            e
                                        )
                                    }
                                />
                            </label>
                        </h3>
                    </div>
                </div>
            ) : (*/

/*            {editMode ? (
                <button
                    onClick={updateWorkshopFormOverview}
                    className="submit-button"
                >
                    Submit
                </button>
            ) : */
