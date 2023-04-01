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


    useEffect(() => {
        getUsers();
    }, []);


    const closeSchedule = () => {
        setOpenModal(false);
    }

    const createProgramFromModal = (e) => {
        handleSubmit();
        resetAllVals();
        props.closeModal();
    };

    const resetAllVals = () => {
        setOpenModal(false);
        setNewProgTitle("");
        setNewProgDesc("");
        setNewProgStartDate("");
        setNewProgEndDate("");
        setAddUsers([]);
    }

    const handleSubmit = async () => {
        console.log(newProgTitle);
        console.log(newProgDesc);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //UPDATE
            body: JSON.stringify({
                title: newProgTitle,
                description: newProgDesc,
                startDate: newProgStartDate,
                endDate: newProgEndDate,
                hosts: addUsers,
            }),
        };
        await fetch("http://localhost:3000/programs", requestOptions);
        props.reloadList();
    };

    const handleAddUser = (e) => {
        let addUserFiltered = e.map((event, i) => event.value);
        setAddUsers(addUserFiltered);
    };

    const getUsers = async () => {
        try {
            let data = await fetch("http://localhost:3000/users/users");
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
    }

    const submitSchedule = () => {
        console.log(tmp);
        console.log("kdjf");
        setOpenModal(false);
    }

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
                        onChange={(e) => setNewProgStartDate(e)}
                    />
                    <DateInput
                        placeholder="End (MM-DD-YYYY)"
                        onChange={(e) => setNewProgEndDate(e)}
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
                    <button className="submit-button add-schedule-button" onClick={() => setOpenModal(true)}>
                        add schedule
                    </button>

                    <SetSchedule
                        openModal={openModal}
                        closeModal={closeSchedule}
                        submitSchedule={submitSchedule}

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
