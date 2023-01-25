import React, { useState } from "react";
import Popup from "./Popup";

const SingleBfc = (item) => {
    const [beneficiary, setBeneficiary] = useState([]);

    const [firstName, setFirstName] = useState(item.firstName);
    const [lastName, setLastName] = useState(item.lastName);
    const [gender, setGender] = useState(item.gender);
    const [phone, setPhone] = useState(item.phone);
    const [email, setEmail] = useState(item.email);
    const [birthDate, setBirthDate] = useState(item.bday);
    const [archived, setArchived] = useState(item.archived);

    const [isEditing, setEditing] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);

    // // states used when editing individual field
    // const [firstNameEdited, setFirstNameEdited] = useState(false);
    // const [lastNameEdited, setLastNameEdited] = useState(false);
    // const [genderEdited, setGenderEdited] = useState(false);
    // const [phoneEdited, setPhoneEdited] = useState(false);
    // const [emailEdited, setEmailEdited] = useState(false);
    // const [birthDateEdited, setBirthDateEdited] = useState(false);
    // const [archivedEdited, setArchivedEdited] = useState(false);

    const handleChangeFirstName = (event) => {
        // setFirstNameEdited(true);
        setFirstName(event.target.value);
    };

    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleChangePhone = (event) => {
        setPhone(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangeBirthDate = (event) => {
        setBirthDate(new Date(event.target.value));
    };

    const handleChangeArchived = () => {
        setArchived(!archived);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("You clicked save.");
        const id = item.mongoKey.toString();
        console.log(`id: ${id}`);
        // update backend
        fetch(`http://localhost:3000/beneficiaries`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                beneficiaryID: id,
                firstName: firstName,
                lastName: lastName,
                bday: birthDate,
                gender: gender,
                phone: phone,
                email: email,
                archived: archived,
            }),
        }).then(async () => {
            try {
                let data = await fetch("http://localhost:3000/beneficiaries");
                data = await data.json();
                setBeneficiary(data);
                console.log(data);
                console.log(beneficiary);
            } catch (error) {
                console.error(error);
            }
        });

        setEditing(false);
    };

    const ViewComponent = () => (
        <div className="bfc-view-info-btns">
            <div className="bfc-info">
                <h3 id="bfc-first-name">{`${item.firstName} ${item.lastName}`}</h3>
                <h4 id="bfc-gender">{`gender: ${item.gender}`}</h4>
                <h4 id="bfc-phone">{`phone: ${item.phone}`}</h4>
                <h4 id="bfc-email">{`email: ${item.email}`}</h4>
                <h4 id="bfc-bday">{`birthdate: ${item.bday}`}</h4>
                <h4 id="bfc-archived">{`archived: ${item.archived}`}</h4>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                >
                    Edit
                </button>

                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => item.deleteBfc(item.mongoKey.toString())}
                >
                    Delete
                </button>
            </div>
        </div>
    );

    return (
        <div className="edit-popup">
            <li className="bfc-label" htmlFor={item.id}>
                {`${item.firstName} ${item.lastName}`}
            </li>
            <main>
                <button onClick={() => setButtonPopup(true)}> Expand </button>
            </main>

            <Popup
                isEditingPopup={isEditing}
                trigger={buttonPopup}
                setTrigger={setButtonPopup}
            >
                <div className="bfc-edit">
                    {isEditing ? 
        <div className="bfc-edit-info-btns">
            <div className="edit-group">
                <label>
                    First Name:
                    <input
                        type="text"
                        id="first-name"
                        onChange={handleChangeFirstName}
                        defaultValue={firstName}
                    />
                </label>
                <br></br>
                <label>
                    Last Name:
                    <input
                        type="text"
                        id="last-name"
                        onChange={handleChangeLastName}
                        defaultValue={lastName}
                    />
                </label>
                <br></br>
                <label>
                    Gender:
                    <input
                        type="text"
                        id="gender"
                        onChange={handleChangeGender}
                        defaultValue={gender}
                    />
                </label>
                <br></br>
                <label>
                    Birth Date:
                    <input
                        type="date"
                        id="birthdate"
                        onChange={handleChangeBirthDate}
                        defaultValue={
                            new Date(birthDate).toISOString().split("T")[0]
                        }
                    />
                </label>
                <br></br>
                <label>
                    Phone Number:
                    <input
                        type="number"
                        onChange={handleChangePhone}
                        id="phone-numbef_r"
                        defaultValue={phone}
                    />
                </label>
                <br></br>
                <label>
                    Email:
                    <input
                        type="email"
                        onChange={handleChangeEmail}
                        id="email-address"
                        defaultValue={email}
                    />
                </label>
                <br></br>
                <label>
                    Archived:
                    <input
                        type="checkbox"
                        defaultChecked={archived}
                        onChange={handleChangeArchived}
                    />
                </label>
            </div>
            <div className="btn-group">
                <button
                    className="btn bfc-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                </button>

                <button
                    className="btn btn__primary bfc-edit"
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </div> : <ViewComponent />}
                </div>
            </Popup>
        </div>
    );
};

export default SingleBfc;
