import React, { useState } from "react";
import Popup from "./Popup";

const SingleBfc = (item) => {
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newGender, setNewGender] = useState({ value: "female", label: "Female" });
    const [newPhoneNumber, setPhoneNumber] = useState("");
    const [newEmail, setEmail] = useState("");
    const [newBirthDate, setBirthDate] = useState(new Date());

    const [isEditing, setEditing] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);

    const handleChangeFirstName = (event) => {
        setFormFirstName(event.target.value);
    };

    const handleChangeLastName = (event) => {
        setFormLastName(event.target.value);
    };

    const handleGenderSelect = (data) => {
        setFormSelectedGender(data);
    };

    const handleChangePhoneNumber = (event) => {
        setFormPhoneNumber(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setFormEmail(event.target.value);
    };

    const handleChangeBirthDate = (event) => {
        setFormBirthDate(new Date(event.target.value));
    };


    function handleSubmit(e) {
        e.preventDefault();
        item.editBfc(item.id, newFirstName, newLastName, newGender, newPhoneNumber, newEmail, newBirthDate);
        setNewFirstName("");
        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="bfc-label" htmlFor="firstName">
                    New first name for {item.firstName}
                </label>
                <input
                    id="firstName"
                    className="bfc-text"
                    type="text"
                    onChange={handleChangeFirstName}
                />
                <label className="bfc-label" htmlFor="lastName">
                    New last name for {item.lastName}
                </label>
                <input
                    id="lastName"
                    className="bfc-text"
                    type="text"
                    onChange={handleChangeLastName}
                />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn bfc-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                </button>

                <button type="submit" className="btn btn__primary bfc-edit">
                    Save
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="bfc-checkbox">
                <input
                    id={item.id}
                    type="checkbox"
                    defaultChecked={item.archived}
                    onChange={() => item.toggleBfcArchived(item.id)}
                />
                <label className="bfc-label" htmlFor={item.id}>
                    {item.firstName}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                >
                    Edit{" "}
                </button>

                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => item.deleteBfc(item.id)}
                >
                    Delete{" "}
                </button>
            </div>
        </div>
    );

    return (
        <div className="edit-popup">
            <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
            <main>
                <button onClick={() => setButtonPopup(true)}> Edit </button>
            </main>

            <Popup 
                trigger={buttonPopup} 
                setTrigger={setButtonPopup}>
                    <h3>My Popup</h3>
                    <form className="stack-small" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="bfc-label" htmlFor="firstName">
                                New first name for {item.firstName}
                            </label>
                            <input
                                id="firstName"
                                className="bfc-text"
                                type="text"
                                onChange={handleChangeFirstName}
                            />
                            <label className="bfc-label" htmlFor="lastName">
                                New last name for {item.lastName}
                            </label>
                            <input
                                id="lastName"
                                className="bfc-text"
                                type="text"
                                onChange={handleChangeLastName}
                            />
                        </div>
                        <div className="btn-group">
                            <button
                                type="button"
                                className="btn bfc-cancel"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>

                            <button type="submit" className="btn btn__primary bfc-edit">
                                Save
                            </button>
                        </div>
                    </form>
            </Popup>
        </div>
    );
}

const genderOpts = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
];

export default SingleBfc;