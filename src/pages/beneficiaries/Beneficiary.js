import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

import "./Beneficiary.css";

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
    const [id, setId] = useState("");
    const [programsWorkshops, setProgramsWorkshops] = useState(0);
    const [needsInterestsSponsors, setNeedsInterestsSponsors] = useState(0);
    const [recentHistory, setRecentHistory] = useState(0);

    const handleToggleEditMode = () => {
        setEditing((prev) => !prev);
        if (!editing) {
        }
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

    const handleChangeLanguages = (data) => {
        setLanguages(data);
    };

    const handleChangePhone = (event) => {
        setPhone(event.target.value);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleClickPrograms = () => {
        setProgramsWorkshops(0);
    };

    const handleClickWorkshops = () => {
        setProgramsWorkshops(1);
    };

    const handleClickNeeds = () => {
        setNeedsInterestsSponsors(0);
    };

    const handleClickInterests = () => {
        setNeedsInterestsSponsors(1);
    };

    const handleClickSponsors = () => {
        setNeedsInterestsSponsors(2);
    };

    const handleClickRecent = () => {
        setRecentHistory(0);
    };

    const handleClickHistory = () => {
        setRecentHistory(1);
    };

    const handleDelete = (id) => {
        console.log("id is" + id);
        fetch("http://localhost:3000/beneficiaries?id=" + beneficiaryId, {
            method: "DELETE",
        }).then(async () => {
            try {
                let data = await fetch("http://localhost:3000/beneficiaries");
                data = await data.json();
            } catch (error) {
                console.error(error);
            }
        });
    };

    const handleToggleArchive = () => {
        setArchived((prev) => !prev);
        console.log(archived);
    };

    const languageOpts = [
        { value: "English", label: "English" },
        { value: "Mandarin", label: "Mandarin" },
        { value: "French", label: "French" },
    ];

    const handleSubmit = () => {
        const body = JSON.stringify({
            _id: id,
            firstName,
            lastName,
            phone,
            email,
            languages: languages.map((option) => option.value),
            archived,
            bday,
            address,
        });
        console.log(body);
        fetch(`http://localhost:3000/beneficiaries/${beneficiaryId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body,
        })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

        navigate(-1);
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
                setLanguages(
                    data.languages.map((item) => ({
                        value: item,
                        label: item,
                    }))
                );
                setBday(data.bday);
                setArchived(data.archived);
                setId(data._id);
                console.log(data._id);
                console.log(data);
                console.log(data.languages);
            })
            .catch((error) => console.log(error));
    }, []);

    console.log(beneficiary);

    return (
        <div className="beneficiary-page-container">
            <div className="beneficiary-identification-info">
                <div className="back-button">
                    <button onClick={handleBack}>Back</button>
                </div>
                <div className="beneficiary-photo">
                    {" "}
                    <p> insert photo here </p>
                </div>
                <div className="beneficiary-name">
                    <h1>
                        {" "}
                        {editing ? (
                            <input
                                placeholder="First Name"
                                value={firstName}
                                onChange={handleChangeFirstName}
                            />
                        ) : (
                            beneficiary.firstName
                        )}{" "}
                        {editing ? (
                            <input
                                placeholder="Last Name"
                                value={lastName}
                                onChange={handleChangeLastName}
                            />
                        ) : (
                            beneficiary.lastName
                        )}{" "}
                    </h1>
                </div>
                <div className="beneficiary-contact-info">
                    <p> Beneficiary ID: {beneficiaryId} </p>
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
                            <CreatableSelect
                                name="Languages"
                                value={languages}
                                onChange={handleChangeLanguages}
                                isMulti
                                options={languageOpts}
                            />
                        ) : (
                            beneficiary.languages
                        )}{" "}
                    </p>
                </div>
                <div className="edit-submit-buttons">
                    <div className="edit-button">
                        <button onClick={handleToggleEditMode}>
                            {editing ? "Cancel Edits" : "Edit Beneficiary"}
                        </button>
                    </div>
                    <button onClick={handleSubmit} id="submit-button">
                        Submit
                    </button>
                </div>
            </div>

            <div className="beneficiary-registration-info">
                <div className="programs-workshops-container">
                    <div className="programs-workshops-buttons">
                        <button onClick={handleClickPrograms}>
                            {" "}
                            Programs{" "}
                        </button>
                        <button onClick={handleClickWorkshops}>
                            {" "}
                            Workshops
                        </button>
                    </div>
                    <div className="list-container">
                        <h5>
                            {" "}
                            {programsWorkshops === 0 && (
                                <p>
                                    {/* TODO: Add program data */}
                                    Programs Here{" "}
                                </p>
                            )}
                            {programsWorkshops === 1 && (
                                <p>
                                    {/* TODO: Add workshop data */}
                                    Workshops Here{" "}
                                </p>
                            )}
                        </h5>
                    </div>
                </div>
                <div className="needs-interests-sponsor-container">
                    <div className="needs-interests-sponsor-buttons">
                        <button onClick={handleClickNeeds}> Needs </button>
                        <button onClick={handleClickInterests}>
                            {" "}
                            Interests
                        </button>
                        <button onClick={handleClickSponsors}> Sponsors</button>
                    </div>
                    <div className="list-container">
                        <h5>
                            {needsInterestsSponsors === 0 && (
                                <p>
                                    {" "}
                                    {beneficiary.needs?.map(
                                        (need) => need + " "
                                    )}{" "}
                                </p>
                            )}
                            {needsInterestsSponsors === 1 && (
                                <p>
                                    {" "}
                                    {beneficiary.interests?.map(
                                        (interest) => interest + " "
                                    )}{" "}
                                </p>
                            )}
                            {needsInterestsSponsors === 2 && (
                                <p> {beneficiary.sponsors} </p>
                            )}
                        </h5>
                    </div>
                </div>
                <div className="assessment-history">
                    <div className="assessment-buttons">
                        <button onClick={handleClickRecent}> Recent </button>
                        <button onClick={handleClickHistory}> History </button>
                    </div>
                    <div className="list-container">
                        <h5>
                            {" "}
                            {recentHistory === 0 && (
                                <p>
                                    {/* TODO: Add recent assessment data */}
                                    Recent Assessment Here{" "}
                                </p>
                            )}
                            {recentHistory === 1 && (
                                <p>
                                    {/* TODO: Add past assessment data */}
                                    Past Assessment Here{" "}
                                </p>
                            )}
                        </h5>
                    </div>
                </div>
            </div>
            <div className="archive-delete-buttons">
                <div className="archive-button">
                    {editing && (
                        <button onClick={handleToggleArchive}>
                            {archived
                                ? "Unarchive Beneficiary"
                                : "Archive Beneficiary"}
                        </button>
                    )}
                </div>
                <div className="delete-button">
                    {editing && (
                        <button onClick={handleDelete}>
                            Delete Beneficiary
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Beneficiary;
