import React, { useEffect, useState } from "react";
import DateInput from "./TypeDate";
import Select from "react-select";
import SetSchedule from "./SetSchedule";
import "./styles/Modal.css";

const CreateProgramPopup = (props) => {
    const [openModal, setOpenModal] = useState(false);

    const [users, setUsers] = useState([]);
    const [newProgTitle, setNewProgTitle] = useState("");
    const [newProgDesc, setNewProgDesc] = useState("");
    const [newProgStartDate, setNewProgStartDate] = useState("");
    const [newProgEndDate, setNewProgEndDate] = useState("");
    const [userOptions, setUserOptions] = useState([]);
    const [addUsers, setAddUsers] = useState([]);

    const [newProgScheduleMondayStart, setNewProgScheduleMondayStart] =
        useState("");
    const [newProgScheduleMondayEnd, setNewProgScheduleMondayEnd] =
        useState("");
    const [newProgScheduleTuesdayStart, setNewProgScheduleTuesdayStart] =
        useState("");
    const [newProgScheduleTuesdayEnd, setNewProgScheduleTuesdayEnd] =
        useState("");
    const [newProgScheduleWednesdayStart, setNewProgScheduleWednesdayStart] =
        useState("");
    const [newProgScheduleWednesdayEnd, setNewProgScheduleWednesdayEnd] =
        useState("");
    const [newProgScheduleThursdayStart, setNewProgScheduleThursdayStart] =
        useState("");
    const [newProgScheduleThursdayEnd, setNewProgScheduleThursdayEnd] =
        useState("");
    const [newProgScheduleFridayStart, setNewProgScheduleFridayStart] =
        useState("");
    const [newProgScheduleFridayEnd, setNewProgScheduleFridayEnd] =
        useState("");
    const [newProgScheduleSaturdayStart, setNewProgScheduleSaturdayStart] =
        useState("");
    const [newProgScheduleSaturdayEnd, setNewProgScheduleSaturdayEnd] =
        useState("");
    const [newProgScheduleSundayStart, setNewProgScheduleSundayStart] =
        useState("");
    const [newProgScheduleSundayEnd, setNewProgScheduleSundayEnd] =
        useState("");

    useEffect(() => {
        getUsers();
    }, []);

    // useEffect(() => {
    //     console.log(sunday);
    // }, [sunday]);

    const closeSchedule = () => {
        setOpenModal(false);
    };

    // TODO: remove this
    const createProgramFromModal = (e) => {
        handleSubmit();
        handleExitModal();
    };

    const resetAllVals = () => {
        setOpenModal(false);
        setNewProgTitle("");
        setNewProgDesc("");
        setNewProgStartDate("");
        setNewProgEndDate("");
        setAddUsers([]);
        setNewProgScheduleMondayStart("");
        setNewProgScheduleMondayEnd("");
        setNewProgScheduleTuesdayStart("");
        setNewProgScheduleTuesdayEnd("");
        setNewProgScheduleWednesdayStart("");
        setNewProgScheduleWednesdayEnd("");
        setNewProgScheduleThursdayStart("");
        setNewProgScheduleThursdayEnd("");
        setNewProgScheduleFridayStart("");
        setNewProgScheduleFridayEnd("");
        setNewProgScheduleSaturdayStart("");
        setNewProgScheduleSaturdayEnd("");
        setNewProgScheduleSundayStart("");
        setNewProgScheduleSundayEnd("");
    };

    const handleSubmit = async () => {
        console.log(newProgTitle);
        console.log(newProgDesc);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem(
                    "auth"
                )}`,
            },
            //UPDATE
            body: JSON.stringify({
                title: newProgTitle,
                description: newProgDesc,
                startDate: newProgStartDate,
                endDate: newProgEndDate,
                hosts: addUsers,
                schedule: {
                    Sunday: {
                        startTime: newProgScheduleSundayStart,
                        endTime: newProgScheduleSundayEnd,
                    },
                    Monday: {
                        startTime: newProgScheduleMondayStart,
                        endTime: newProgScheduleMondayEnd,
                    },
                    Tuesday: {
                        startTime: newProgScheduleTuesdayStart,
                        endTime: newProgScheduleTuesdayEnd,
                    },
                    Wednesday: {
                        startTime: newProgScheduleWednesdayStart,
                        endTime: newProgScheduleWednesdayEnd,
                    },
                    Thursday: {
                        startTime: newProgScheduleThursdayStart,
                        endTime: newProgScheduleThursdayEnd,
                    },
                    Friday: {
                        startTime: newProgScheduleFridayStart,
                        endTime: newProgScheduleFridayEnd,
                    },
                    Saturday: {
                        startTime: newProgScheduleSaturdayStart,
                        endTime: newProgScheduleSaturdayEnd,
                    },
                },
            }),
        };
        // TODO: Add error handling
        // TODO: Exit modal after successful submission
        await fetch("http://localhost:3000/programs", requestOptions);
        props.reloadList();
    };

    const handleAddUser = (e) => {
        let addUserFiltered = e.map((event, i) => event.value);
        setAddUsers(addUserFiltered);
    };

    const getUsers = async () => {
        try {
            let data = await fetch("http://localhost:3000/users/users",{headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem(
                    "auth"
                )}`,
            },});
            data = await data.json();
            setUsers(data);
            let tmp = data.map((e) => ({
                value: e._id,
                label: e.firstName,
                color: "black",
            }));
            setUserOptions(tmp);
        } catch (err) {
            console.log(err);
        }
    };

    const handleExitModal = () => {
        resetAllVals();
        props.closeModal();
    };

    // TODO: implement after talking about schedule design
    const submitSchedule = () => {
        console.log(tmp);
        console.log("kdjf");
        setOpenModal(false);
    };

    if (!props.openModal) return;
    return (
        <div className="modal-container">
            <div className="modal-body">
                <button className="cancel-button" onClick={handleExitModal}>
                    X
                </button>

                <h1>Create New Program</h1>

                <h6>Basic Information</h6>

                <input
                    type="text"
                    value={newProgTitle}
                    name="title"
                    placeholder="Title"
                    className="modal-input-text"
                    onChange={(e) => setNewProgTitle(e.target.value)}
                />

                <textarea
                    type="text"
                    value={newProgDesc}
                    name="description"
                    placeholder="Description..."
                    className="modal-text-area"
                    onChange={(e) => setNewProgDesc(e.target.value)}
                />

                <div className="start-end-date">
                    <DateInput
                        placeholder="Start (MM-DD-YYYY)"
                        onChange={setNewProgStartDate}
                    />
                    <DateInput
                        placeholder="End (MM-DD-YYYY)"
                        onChange={setNewProgEndDate}
                    />
                </div>
                <div className="add-hosts">
                    <h6>Hosts</h6>
                    <Select
                        isMulti
                        name="colors"
                        isSearchable
                        menuPortalTarget={document.body}
                        options={userOptions}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        onChange={handleAddUser}
                        placeholder="Add hosts"
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 15,
                            border: "#d0d0d1",
                        })}
                    />
                </div>
                <div className="add-schedule">
                    <h6>Time/Schedule</h6>
                    <button
                        className="submit-button add-schedule-button"
                        onClick={() => setOpenModal(true)}
                    >
                        add schedule
                    </button>

                    <SetSchedule
                        openModal={openModal}
                        closeModal={closeSchedule}
                        submitSchedule={closeSchedule}
                        sundayStart={newProgScheduleSundayStart}
                        setSundayStart={setNewProgScheduleSundayStart}
                        sundayEnd={newProgScheduleSundayEnd}
                        setSundayEnd={setNewProgScheduleSundayEnd}
                        mondayStart={newProgScheduleMondayStart}
                        setMondayStart={setNewProgScheduleMondayStart}
                        mondayEnd={newProgScheduleMondayEnd}
                        setMondayEnd={setNewProgScheduleMondayEnd}
                        tuesdayStart={newProgScheduleTuesdayStart}
                        setTuesdayStart={setNewProgScheduleTuesdayStart}
                        tuesdayEnd={newProgScheduleTuesdayEnd}
                        setTuesdayEnd={setNewProgScheduleTuesdayEnd}
                        wednesdayStart={newProgScheduleWednesdayStart}
                        setWednesdayStart={setNewProgScheduleWednesdayStart}
                        wednesdayEnd={newProgScheduleWednesdayEnd}
                        setWednesdayEnd={setNewProgScheduleWednesdayEnd}
                        thursdayStart={newProgScheduleThursdayStart}
                        setThursdayStart={setNewProgScheduleThursdayStart}
                        thursdayEnd={newProgScheduleThursdayEnd}
                        setThursdayEnd={setNewProgScheduleThursdayEnd}
                        fridayStart={newProgScheduleFridayStart}
                        setFridayStart={setNewProgScheduleFridayStart}
                        fridayEnd={newProgScheduleFridayEnd}
                        setFridayEnd={setNewProgScheduleFridayEnd}
                        saturdayStart={newProgScheduleSaturdayStart}
                        setSaturdayStart={setNewProgScheduleSaturdayStart}
                        saturdayEnd={newProgScheduleSaturdayEnd}
                        setSaturdayEnd={setNewProgScheduleSaturdayEnd}
                    />
                </div>

                <button
                    className="modal-submit-button submit-button"
                    onClick={createProgramFromModal}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CreateProgramPopup;
