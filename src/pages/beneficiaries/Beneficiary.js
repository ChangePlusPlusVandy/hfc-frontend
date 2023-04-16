import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { Link } from "react-router-dom";
import TrashIcon from "../../assets/icons/trash-icon.png";
import { useAuth } from "../contexts/AuthContext";

import "./Beneficiary.css";

const languageOpts = [
    { value: "Bangla", label: "Bangla " },
    { value: "Hindi", label: "Hindi " },
    { value: "English", label: "English " },
];

const nationalityOpts = [
    { value: "Canada", label: "Canada" },
    { value: "India", label: "India" },
    { value: "United States", label: "United States" },
    { value: "Nepal", label: "Nepal" },
];

const eduOpts = [
    { value: "Elementary School", label: "Elementary School" },
    { value: "Middle School", label: "Middle School" },
    { value: "Secondary School", label: "Secondary School" },
    { value: "Post Secondary", label: "Post Secondary" },
];

const needOpts = [
    { value: "Need 1", label: "Need 1" },
    { value: "Need 2", label: "Need 2" },
];

const interestOpts = [
    { value: "Computers", label: "Computers" },
    { value: "English", label: "Spoken English" },
    { value: "Literacy", label: "Literacy" },
    { value: "Math", label: "Math" },
    { value: "Bengali", label: "Bengali" },
    { value: "Arts", label: "Arts" },
    { value: "Bakery", label: "Bakery/Cafe" },
    { value: "Counseling", label: "Counseling" },
    // TODO: change counseling label to whatever they asked
];

const Beneficiary = () => {
    const { beneficiaryId } = useParams();
    const { isAdmin } = useAuth();
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
    const [assessments, setAssessments] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [workshops, setWorkshops] = useState([]);
    const [nationality, setNationality] = useState([]);
    const [eduLvl, setEduLvl] = useState([]);
    const [sponsorInfo, setSponsorInfo] = useState();
    const [needs, setNeeds] = useState();
    const [interests, setInterests] = useState();
    const [initials, setInitials] = useState("");
    const [languageArray, setLanguageArray] = useState([]);
    const [newFirstName, setNewFirstName] = useState();
    const [newLastName, setNewLastName] = useState();
    const [newBday, setNewBday] = useState();
    const [newAddress, setNewAddress] = useState();
    const [newPhone, setNewPhone] = useState();
    const [newEmail, setNewEmail] = useState();
    const [newLanguages, setNewLanguages] = useState();
    const [newNationality, setNewNationality] = useState();
    const [newEduLvl, setNewEduLvl] = useState();
    const [newNeeds, setNewNeeds] = useState();
    const [newInterests, setNewInterests] = useState();
    const [newSponsorInfo, setNewSponsorInfo] = useState();
    const [deleteClicked, setDeleteClicked] = useState(false);

    const handleClickDelete = () => {
        setDeleteClicked(true);
    };

    const handleToggleEditMode = () => {
        setEditing((prev) => !prev);
    };

    const handleChangeFirstName = (event) => {
        setNewFirstName(event.target.value);
    };

    const handleChangeLastName = (event) => {
        setNewLastName(event.target.value);
    };

    const handleChangeBday = (event) => {
        setNewBday(event.target.value);
    };

    const handleChangeAddress = (event) => {
        setNewAddress(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setNewEmail(event.target.value);
    };

    const handleChangeLanguages = (data) => {
        setNewLanguages(data);
    };

    const handleChangeNationality = (data) => {
        setNewNationality(data);
    };

    const handleChangeEduLvl = (data) => {
        setNewEduLvl(data);
    };

    const handleChangeNeeds = (event) => {
        setNewNeeds(event.target.value);
    };

    const handleChangeInterests = (data) => {
        setNewInterests(data);
    };

    const handleChangeSponsorInfo = (event) => {
        setNewSponsorInfo(event.target.value);
    };

    const handleChangePhone = (event) => {
        setNewPhone(event.target.value);
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

    const getPrograms = async () => {
        try {
            let data = await fetch(
                "http://localhost:3000/programs/beneficiary?id=" +
                    beneficiaryId,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "auth"
                        )}`,
                    },
                }
            );
            data = await data.json();
            console.log("json data", data);
            setPrograms(data);
        } catch (err) {
            console.log(err);
        }
    };

    const getWorkshops = async () => {
        try {
            let data = await fetch(
                "http://localhost:3000/workshops/beneficiary?id=" +
                    beneficiaryId,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "auth"
                        )}`,
                    },
                }
            );
            data = await data.json();
            console.log("json workshop data", data);
            setWorkshops(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = (id) => {
        fetch("http://localhost:3000/beneficiaries?id=" + beneficiaryId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
            },
        }).then(async () => {
            try {
                let data = await fetch("http://localhost:3000/beneficiaries", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "auth"
                        )}`,
                    },
                });
                data = await data.json();
            } catch (error) {
                console.error(error);
            }
        });
    };

    const handleToggleArchive = () => {
        setArchived((prev) => !prev);
    };

    const handleSubmit = () => {
        const body = JSON.stringify({
            _id: id,
            firstName: newFirstName,
            lastName: newLastName,
            phone: newPhone,
            email: newEmail,
            languages: newLanguages?.map((option) => option.value),
            archived,
            bday: newBday,
            address: newAddress,
            assessments,
            eduLvl: newEduLvl.value,
            nationality: newNationality?.map((option) => option.value),
            interests: newInterests?.map((option) => option.value),
            needs: newNeeds,
            sponsorInfo: newSponsorInfo,
        });
        console.log("updated beneficiary", body);
        fetch(`http://localhost:3000/beneficiaries/${beneficiaryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
            },
            body,
        })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

        setEditing(false);
        setFirstName(newFirstName);
        setLastName(newLastName);
        setBday(newBday);
        setAddress(newAddress);
        setPhone(newPhone);
        setEmail(newEmail);
        setLanguages(newLanguages);
        setNationality(newNationality);
        setEduLvl(newEduLvl);
        setNeeds(newNeeds);
        setInterests(newInterests);
        setSponsorInfo(newSponsorInfo);
        setInitials(newFirstName.substring(0, 1) + newLastName.substring(0, 1));
        if (archived) {
            navigate(-1);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:3000/beneficiaries/?id=${beneficiaryId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.assessments.sort((a, b) => {
                    const dateA = new Date(a.dateTaken);
                    const dateB = new Date(b.dateTaken);
                    return dateB - dateA;
                });
                console.log("type of languages", typeof data.languages);
                console.log("nationality", data.nationality);
                console.log("data here:", data);
                setBeneficiary(data);
                setFirstName(data.firstName);
                setNewFirstName(data.firstName);
                setLastName(data.lastName);
                setNewLastName(data.lastName);
                setEmail(data.email);
                setNewEmail(data.email);
                setPhone(data.phone);
                setNewPhone(data.phone);
                setAddress(data.address);
                setNewAddress(data.address);
                setLanguages(
                    data.languages.map((item) => ({
                        value: item,
                        label: item,
                    }))
                );
                setNewLanguages(
                    data.languages.map((item) => ({
                        value: item,
                        label: item,
                    }))
                );
                setBday(data.bday);
                setNewBday(data.bday);
                setArchived(data.archived);
                setId(data._id);
                setAssessments(data.assessments);
                setEduLvl({
                    value: data.eduLvl,
                    label: data.eduLvl,
                });
                setNewEduLvl({
                    value: data.eduLvl,
                    label: data.eduLvl,
                });
                setNationality(
                    data.nationality.map((item) => ({
                        value: item,
                        label: item,
                    }))
                );
                setNewNationality(
                    data.nationality.map((item) => ({
                        value: item,
                        label: item,
                    }))
                );
                setSponsorInfo(data.sponsorInfo);
                setNewSponsorInfo(data.sponsorInfo);
                setInterests(
                    data.interests.map((item) => ({
                        value: item,
                        label: item,
                    }))
                );
                setNewInterests(
                    data.interests.map((item) => ({
                        value: item,
                        label: item,
                    }))
                );
                setNeeds(data.needs);
                setNewNeeds(data.needs);
                setInitials(
                    data.firstName.substring(0, 1) +
                        data.lastName.substring(0, 1)
                );
            })
            .catch((error) => console.log(error));
        getPrograms();
        getWorkshops();
        console.log("date and new date", bday, newBday);
    }, []);

    useEffect(() => {
        if (!editing) {
            setNewFirstName(firstName);
            setNewLastName(lastName);
            setNewAddress(address);
            setNewPhone(phone);
            setNewEmail(email);
            setNewBday(bday);
            setNewLanguages(languages);
            setNewNationality(nationality);
            setNewEduLvl(eduLvl);
            setNewNeeds(needs);
            setNewInterests(interests);
            setNewSponsorInfo(sponsorInfo);
        }
    }, [editing]);

    return (
        <div className="beneficiary-page-container">
            <div className="button-header">
                <div className="back">
                    <Link to="/dashboard/beneficiaries" id="back-arrow">
                        &lt; Back to beneficiary list
                    </Link>
                </div>
                <div className="archive-delete-buttons">
                    {editing && !deleteClicked && (
                        <button
                            onClick={handleToggleArchive}
                            id="archive-button"
                        >
                            {archived ? "Unarchive" : "Archive"}
                        </button>
                    )}
                    {editing && !deleteClicked && (
                        <img
                            src={TrashIcon}
                            alt="Delete Beneficiary"
                            className="icon"
                            onClick={handleClickDelete}
                        />
                    )}
                    {deleteClicked && editing && (
                        <div className="confirm-delete-container">
                            <p className="confirm-delete-text">
                                Are you sure you want to delete? This action
                                cannot be undone.
                            </p>
                            <button
                                className="confirm-dlt-buttons"
                                onClick={handleDelete}
                            >
                                Confirm
                            </button>
                            <button
                                className="confirm-dlt-buttons"
                                onClick={() => setDeleteClicked(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="page-content">
                <div className="beneficiary-identification-info">
                    <div className="beneficiary-icon">
                        <h2 className="initals"> {initials} </h2>
                    </div>

                    <div className="beneficiary-name">
                        <h1>
                            {editing ? (
                                <input
                                    placeholder="First Name"
                                    value={newFirstName}
                                    onChange={handleChangeFirstName}
                                />
                            ) : (
                                firstName
                            )}{" "}
                            {editing ? (
                                <input
                                    placeholder="Last Name"
                                    value={newLastName}
                                    onChange={handleChangeLastName}
                                />
                            ) : (
                                lastName
                            )}{" "}
                        </h1>
                    </div>
                    <div className="personal-info">
                        <div className="personal-line">
                            <h4 className="personal-label"> ID Number </h4>

                            <div className="personal-value">
                                {" "}
                                {beneficiary.id}{" "}
                            </div>
                        </div>
                        <div className="personal-line">
                            <h4 className="personal-label"> Birthday </h4>

                            <div className="personal-value">
                                {editing ? (
                                    <input
                                        placeholder={newBday}
                                        value={newBday.split("T")[0]}
                                        onChange={handleChangeBday}
                                        type="date"
                                    />
                                ) : (
                                    bday?.split("T")[0]
                                )}{" "}
                            </div>
                        </div>
                        <div className="personal-line">
                            <h4 className="personal-label"> Address </h4>
                            <div className="personal-value">
                                {editing ? (
                                    <input
                                        placeholder="Address"
                                        value={newAddress}
                                        onChange={handleChangeAddress}
                                    />
                                ) : (
                                    address
                                )}{" "}
                            </div>
                        </div>
                        <div className="personal-line">
                            <h4 className="personal-label"> Phone Number </h4>
                            <div className="personal-value">
                                {editing ? (
                                    <input
                                        placeholder="Phone Number"
                                        value={newPhone}
                                        onChange={handleChangePhone}
                                    />
                                ) : (
                                    phone
                                )}{" "}
                            </div>
                        </div>
                        <div className="personal-line">
                            <h4 className="personal-label"> Email </h4>
                            <div className="personal-value">
                                {editing ? (
                                    <input
                                        placeholder="Email"
                                        value={newEmail}
                                        onChange={handleChangeEmail}
                                    />
                                ) : (
                                    email
                                )}
                            </div>
                        </div>
                        <div className="personal-line">
                            <h4 className="personal-label"> Languages</h4>
                            <div className="personal-value">
                                {editing ? (
                                    <CreatableSelect
                                        name="Languages"
                                        value={newLanguages}
                                        onChange={handleChangeLanguages}
                                        isMulti
                                        options={languageOpts}
                                    />
                                ) : (
                                    languages?.map((language) => (
                                        <div className="mapped-language-nationality">
                                            {language.value}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="personal-line">
                            <h4 className="personal-label"> Nationality </h4>
                            <div className="personal-value">
                                {editing ? (
                                    <CreatableSelect
                                        name="Nationality"
                                        value={newNationality}
                                        onChange={handleChangeNationality}
                                        isMulti
                                        options={nationalityOpts}
                                    />
                                ) : (
                                    nationality?.map((nationality) => (
                                        <div className="mapped-language-nationality">
                                            {nationality.value}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="personal-line">
                            <h4 className="personal-label">
                                {" "}
                                Education Level{" "}
                            </h4>
                            <div className="personal-value">
                                {editing ? (
                                    <Select
                                        options={eduOpts}
                                        value={newEduLvl}
                                        onChange={handleChangeEduLvl}
                                        name="education"
                                        className="single-select"
                                        classNamePrefix="select"
                                    />
                                ) : (
                                    eduLvl.value
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="edit-submit-buttons">
                        {editing && (
                            <button
                                onClick={handleSubmit}
                                className="submit-button"
                            >
                                Submit Changes
                            </button>
                        )}
                        <button
                            onClick={handleToggleEditMode}
                            className="edit-button"
                        >
                            {editing ? "Cancel Edits" : "Edit"}
                        </button>
                    </div>
                </div>
                <div className="beneficiary-registration-info">
                    <div className="programs-workshops-container">
                        <div className="programs-workshops-buttons">
                            <button
                                onClick={handleClickPrograms}
                                class={`tab ${
                                    programsWorkshops === 0 ? "active" : ""
                                }`}
                                id="programs-button"
                            >
                                {" "}
                                Programs{" "}
                            </button>
                            <button
                                onClick={handleClickWorkshops}
                                class={`tab ${
                                    programsWorkshops === 1 ? "active" : ""
                                }`}
                                id="workshops-button"
                            >
                                {" "}
                                Workshops
                            </button>
                        </div>
                        <div className="program-workshop-header">
                            <h4 className="mapped-title">Title</h4>
                            <h4 className="mapped-date">Start Date</h4>
                            <h4 className="mapped-status">Status</h4>
                        </div>
                        <div className="list-container">
                            {programsWorkshops === 0 &&
                                programs.map((program) => (
                                    <div className="mapped-list">
                                        <h4 className="mapped-title">
                                            {" "}
                                            {program.title}{" "}
                                        </h4>
                                        <h4 className="mapped-date">
                                            {" "}
                                            {program.startDate?.split("T")[0]}
                                        </h4>

                                        {program.active ? (
                                            <h4 className="mapped-status">
                                                {" "}
                                                Active{" "}
                                            </h4>
                                        ) : (
                                            <h4 className="mapped-status">
                                                {" "}
                                                Archived{" "}
                                            </h4>
                                        )}
                                    </div>
                                ))}

                            {programsWorkshops === 1 &&
                                workshops.map((workshop) => (
                                    <div className="mapped-list">
                                        <h4 className="mapped-title">
                                            {" "}
                                            {workshop.title}{" "}
                                        </h4>
                                        <h4 className="mapped-date">
                                            {" "}
                                            {workshop.date?.split("T")[0]}
                                        </h4>

                                        {workshop.active ? (
                                            <h4 className="mapped-status">
                                                {" "}
                                                Active{" "}
                                            </h4>
                                        ) : (
                                            <h4 className="mapped-status">
                                                {" "}
                                                Archived{" "}
                                            </h4>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="needs-interests-sponsor-container">
                        <div className="needs-interests-sponsor-buttons">
                            <button
                                onClick={handleClickNeeds}
                                class={`tab ${
                                    needsInterestsSponsors === 0 ? "active" : ""
                                }`}
                                id="needs-button"
                            >
                                {" "}
                                Needs{" "}
                            </button>
                            <button
                                onClick={handleClickInterests}
                                class={`tab ${
                                    needsInterestsSponsors === 1 ? "active" : ""
                                }`}
                                id="interests-button"
                            >
                                {" "}
                                Interests
                            </button>
                            <button
                                onClick={handleClickSponsors}
                                class={`tab ${
                                    needsInterestsSponsors === 2 ? "active" : ""
                                }`}
                                id="sponsors-button"
                            >
                                {" "}
                                Sponsors
                            </button>
                        </div>

                        <div className="needs-list-container">
                            <div className="needs-interests-sponsors-display">
                                {needsInterestsSponsors === 0 && (
                                    <h4 className="mapped-sponsors">
                                        {editing ? (
                                            <input
                                                placeholder="Need Information"
                                                value={newNeeds}
                                                onChange={handleChangeNeeds}
                                            />
                                        ) : (
                                            needs
                                        )}{" "}
                                    </h4>
                                )}
                                {needsInterestsSponsors === 1 &&
                                    !editing &&
                                    interests?.map((interest) => (
                                        <div className="mapped-need-interest">
                                            <h4> {interest.value} </h4>
                                        </div>
                                    ))}
                                {needsInterestsSponsors === 1 && editing && (
                                    <CreatableSelect
                                        options={interestOpts}
                                        value={newInterests}
                                        onChange={handleChangeInterests}
                                        isMulti
                                        class="dropdown"
                                    />
                                )}
                                {needsInterestsSponsors === 2 && (
                                    <h4 className="mapped-sponsors">
                                        {editing ? (
                                            <input
                                                placeholder="Sponsorship Information"
                                                value={newSponsorInfo}
                                                onChange={
                                                    handleChangeSponsorInfo
                                                }
                                            />
                                        ) : (
                                            sponsorInfo
                                        )}{" "}
                                    </h4>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="assessment-history">
                        <div className="assessment-buttons">
                            <button
                                onClick={handleClickRecent}
                                class={`tab ${
                                    recentHistory === 0 ? "active" : ""
                                }`}
                                id="recent-button"
                            >
                                {" "}
                                Recent{" "}
                            </button>
                            <button
                                onClick={handleClickHistory}
                                class={`tab ${
                                    recentHistory === 1 ? "active" : ""
                                }`}
                                id="history-button"
                            >
                                {" "}
                                History{" "}
                            </button>
                        </div>
                        <div className="assessment-header">
                            <h4 className="assessment-mapped-id">Assessment</h4>
                            <h4 className="assessment-mapped-date">Date</h4>
                        </div>
                        <div className="list-container">
                            {recentHistory === 0 && assessments && (
                                <div className="assessment-mapped-list">
                                    <div className="assessment-subscore">
                                        <h4 className="assessment-mapped-id">
                                            {" "}
                                            Overall Score:{" "}
                                            {assessments[0]?.totalScore}{" "}
                                        </h4>
                                        <h4 className="assessment-mapped-date">
                                            {" "}
                                            {
                                                assessments[0]?.dateTaken?.split(
                                                    "T"
                                                )[0]
                                            }
                                        </h4>
                                    </div>
                                    <div className="assessment-subscore">
                                        <h4 className="assessment-mapped-id">
                                            Mental Health Summary:{" "}
                                            {assessments[0]?.mentalHealthScore}
                                        </h4>
                                        <h4 className="assessment-mapped-date">
                                            {" "}
                                            {
                                                assessments[0]?.dateTaken?.split(
                                                    "T"
                                                )[0]
                                            }
                                        </h4>
                                    </div>
                                    <div className="assessment-subscore">
                                        <h4 className="assessment-mapped-id">
                                            Life Skills Summary:{" "}
                                            {assessments[0]?.lifeSkillsScore}
                                        </h4>
                                        <h4 className="assessment-mapped-date">
                                            {" "}
                                            {
                                                assessments[0]?.dateTaken?.split(
                                                    "T"
                                                )[0]
                                            }
                                        </h4>
                                    </div>
                                    <div className="assessment-subscore">
                                        <h4 className="assessment-mapped-id">
                                            Social Skills Summary:{" "}
                                            {assessments[0]?.socialSkillsScore}
                                        </h4>
                                        <h4 className="assessment-mapped-date">
                                            {" "}
                                            {
                                                assessments[0]?.dateTaken?.split(
                                                    "T"
                                                )[0]
                                            }
                                        </h4>
                                    </div>
                                    <div className="assessment-subscore">
                                        <h4 className="assessment-mapped-id">
                                            Education Vocational Summary:{" "}
                                            {
                                                assessments[0]
                                                    ?.educationVocationScore
                                            }{" "}
                                        </h4>
                                        <h4 className="assessment-mapped-date">
                                            {" "}
                                            {
                                                assessments[0]?.dateTaken?.split(
                                                    "T"
                                                )[0]
                                            }
                                        </h4>
                                    </div>
                                </div>
                            )}

                            {recentHistory === 1 &&
                                assessments.map((assessment) => (
                                    <div className="mapped-list">
                                        <h4 className="assessment-mapped-id">
                                            <Link
                                                to={`/dashboard/assessments/${assessment._id}`}
                                            >
                                                {assessment._id}
                                            </Link>
                                        </h4>
                                        <h4 className="assessment-mapped-date">
                                            {" "}
                                            {
                                                assessment.dateTaken?.split(
                                                    "T"
                                                )[0]
                                            }
                                        </h4>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Beneficiary;
