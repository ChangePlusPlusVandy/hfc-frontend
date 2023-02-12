import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Beneficiary = () => {
    const { beneficiaryId } = useParams();
    const navigate = useNavigate();
    const [beneficiary, setBeneficiary] = useState({});
    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [bday, setBday] = useState();
    const [languages, setLanguages] = useState([]);
    const [phone, setPhone] = useState();
    const [archived, setArchived] = useState(false);

    const handleToggleEditMode = () => {
        setEditing((prev) => !prev);
    };

    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    };

    const handleChangeBday = (event) => {
        setBday(event.target.value);
    };

    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangeLanguages = (event) => {
        setLanguages(event.target.value);
    };

    const handleChangePhone = (event) => {
        setPhone(event.target.value);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleToggleArchive = () => {
        setArchived((prev) => !prev);
        console.log(archived);
    };

    const handleSubmit = () => {
        fetch(`http://localhost:3000/beneficiaries/${beneficiaryId}`, {
            // this may be /beneficiary but either way doesn't work
            method: "PUT",
            body: JSON.stringify({
                id: beneficiaryId,
                firstName,
                lastName,
                phone,
                email,
                languages,
                archived,
                bday,
                address,
            }),
        })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetch(`http://localhost:3000/beneficiaries/?id=${beneficiaryId}`)
            .then((response) => response.json())
            .then((data) => {
                setBeneficiary(data);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);
                setLanguages(data.languages);
                setBday(data.bday);
                setArchived(data.archived);
                console.log(data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="beneficiary-page-container">
            <p> {beneficiaryId} </p>
            <p>
                {" "}
                First Name:{" "}
                {editing ? (
                    <input
                        placeholder="First Name"
                        value={firstName}
                        onChange={handleChangeFirstName}
                    />
                ) : (
                    beneficiary.firstName
                )}{" "}
            </p>
            <p>
                {" "}
                Last Name:{" "}
                {editing ? (
                    <input
                        placeholder="Last Name"
                        value={lastName}
                        onChange={handleChangeLastName}
                    />
                ) : (
                    beneficiary.lastName
                )}{" "}
            </p>
            <p>
                {" "}
                Email:{" "}
                {editing ? (
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                ) : (
                    beneficiary.email
                )}{" "}
            </p>
            <p>
                {" "}
                Phone Number:{" "}
                {editing ? (
                    <input
                        placeholder="Phone Number"
                        value={phone}
                        onChange={handleChangePhone}
                    />
                ) : (
                    beneficiary.phone
                )}{" "}
            </p>
            <p>
                {" "}
                Address:{" "}
                {editing ? (
                    <input
                        placeholder="Address"
                        value={address}
                        onChange={handleChangeAddress}
                    />
                ) : (
                    beneficiary.address
                )}{" "}
            </p>
            <p>
                {" "}
                Birthday:{" "}
                {editing ? (
                    <input
                        placeholder="Birthday"
                        value={bday}
                        onChange={handleChangeBday}
                        type="date"
                    />
                ) : (
                    beneficiary.bday
                )}{" "}
            </p>
            <p>
                {" "}
                Languages:{" "}
                {editing ? (
                    <input
                        placeholder="Languages"
                        value={languages}
                        onChange={handleChangeLanguages}
                    />
                ) : (
                    beneficiary.languages
                )}{" "}
            </p>
            <button onClick={handleToggleEditMode}>
                {editing ? "Cancel Edits" : "Edit Beneficiary"}
            </button>
            <button onClick={handleToggleArchive}>
                {archived ? "Unarchive Beneficiary" : "Archive Beneficiary"}
            </button>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Beneficiary;
