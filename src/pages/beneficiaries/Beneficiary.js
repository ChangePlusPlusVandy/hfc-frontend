import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import DefaultUser from "../../../src/assets/images/default-user.png";
import Select from "react-select";
import { Link } from "react-router-dom";

import "./Beneficiary.css";

const languageOpts = [
    { value: "English ", label: "English" },
    { value: "Mandarin ", label: "Mandarin" },
    { value: "French ", label: "French" },
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

    const [assessmentObjects, setAssessmentObjects] = useState([]);

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

    const handleChangeLanguages = (data) => {
        setLanguages(data);
    };

    const handleChangeNationality = (data) => {
        setNationality(data);
    };

    const handleChangeEduLvl = (data) => {
        console.log(eduLvl);
        setEduLvl(data);
    };

    const handleChangeNeeds = (event) => {
        setNeeds(event.target.value);
    };

    const handleChangeInterests = (data) => {
        setInterests(data);
    };

    const handleChangeSponsorInfo = (event) => {
        setSponsorInfo(event.target.value);
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

    const getPrograms = async () => {
        try {
            let data = await fetch(
                "http://localhost:3000/programs/beneficiary?id=" + beneficiaryId
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
                    beneficiaryId
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
    };

    const handleSubmit = () => {
        const body = JSON.stringify({
            _id: id,
            firstName,
            lastName,
            phone,
            email,
            languages: languages?.map((option) => option.value),
            // languages,
            archived,
            bday,
            address,
            assessments,
            eduLvl: eduLvl.value,
            nationality: nationality?.map((option) => option.value),
            interests: interests?.map((option) => option.value),
            needs,
            sponsorInfo,
        });
        console.log("updated beneficiary", body);
        fetch(`http://localhost:3000/beneficiaries/${beneficiaryId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body,
        })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

        // navigate(-1);
        setEditing(false);
    };

    useEffect(() => {
        fetch(`http://localhost:3000/beneficiaries/?id=${beneficiaryId}`)
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
                setLastName(data.lastName);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);
                // setLanguages(data.languages);
                setLanguages(
                    data.languages.map((item) => ({
                        value: item,
                        label: item,
                    }))
                );
                setBday(data.bday);
                setArchived(data.archived);
                setId(data._id);
                setAssessments(data.assessments);
                setEduLvl({
                    value: data.eduLvl,
                    label: data.eduLvl,
                });
                setNationality(
                    data.nationality.map((item) => ({
                        value: item,
                        label: item,
                    }))
                );
                setSponsorInfo(data.sponsorInfo);
                setInterests(
                    data.interests.map((item) => ({
                        value: item,
                        label: item,
                    }))
                );
                setNeeds(data.needs);
                setInitials(
                    data.firstName.substring(0, 1) +
                        data.lastName.substring(0, 1)
                );
            })
            .catch((error) => console.log(error));
        getPrograms();
        getWorkshops();
    }, []);

    // useEffect(() => {
    //     console.log("beneficiary", beneficiary);
    //     console.log("eduLvl", eduLvl);
    //     console.log("lang and nationality", languages, nationality);
    // }, [beneficiary, eduLvl, editing, nationality]);
    useEffect(() => {
        console.log("old lanugages", languages);
    }, [languages]);

    return (
        <div className="beneficiary-page-container">
            <div className="button-header">
                <div className="back">
                    <button onClick={handleBack} id="back-button">
                        Back
                    </button>
                </div>
                <div className="archive-delete-buttons">
                    {editing && (
                        <button onClick={handleToggleArchive}>
                            {archived
                                ? "Unarchive Beneficiary"
                                : "Archive Beneficiary"}
                        </button>
                    )}
                    {editing && (
                        <button onClick={handleDelete}>
                            Delete Beneficiary
                        </button>
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
                    <div className="personal-info">
                        <div className="personal-line">
                            <h4 className="personal-label"> Birthday </h4>

                            <div className="personal-value">
                                {editing ? (
                                    <input
                                        placeholder="Birthday"
                                        value={bday}
                                        onChange={handleChangeBday}
                                        type="date"
                                    />
                                ) : (
                                    beneficiary.bday?.split("T")[0]
                                )}{" "}
                            </div>
                        </div>
                        <div className="personal-line">
                            <h4 className="personal-label"> Address </h4>
                            <div className="personal-value">
                                {editing ? (
                                    <input
                                        placeholder="Address"
                                        value={address}
                                        onChange={handleChangeAddress}
                                    />
                                ) : (
                                    beneficiary.address
                                )}{" "}
                            </div>
                        </div>
                        <div className="personal-line">
                            <h4 className="personal-label"> Phone Number </h4>
                            <div className="personal-value">
                                {editing ? (
                                    <input
                                        placeholder="Phone Number"
                                        value={phone}
                                        onChange={handleChangePhone}
                                    />
                                ) : (
                                    beneficiary.phone
                                )}{" "}
                            </div>
                        </div>
                        <div className="personal-line">
                            <h4 className="personal-label"> Email </h4>
                            <div className="personal-value">
                                {editing ? (
                                    <input
                                        placeholder="Email"
                                        value={email}
                                        onChange={handleChangeEmail}
                                    />
                                ) : (
                                    beneficiary.email
                                )}
                            </div>
                        </div>
                        <div className="personal-line">
                            <h4 className="personal-label"> Languages</h4>
                            <div className="personal-value">
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
                                    // languages.value
                                    // languages.map((language) => {
                                    //     language.label;
                                    // })
                                    // beneficiary.languages?.map((language) => {
                                    //     language;
                                    // })

                                    //typeof languages
                                    // beneficiary.languages?.map((item) => ({
                                    //     (item, " ")
                                    // ))
                                    // beneficiary.languages

                                    // beneficiary.languages.join(", ")
                                    // typeof beneficiary.languages
                                    // languages.map((language) => {
                                    //     language.label;
                                    // })
                                    // typeof beneficiary.languages
                                    // beneficiary.languages?.map((language) => {
                                    //     language;
                                    // })
                                )}
                            </div>
                        </div>
                        <div className="personal-line">
                            <h4 className="personal-label"> Nationality </h4>
                            <div className="personal-value">
                                {editing ? (
                                    <CreatableSelect
                                        name="Nationality"
                                        value={nationality}
                                        onChange={handleChangeNationality}
                                        isMulti
                                        options={nationalityOpts}
                                    />
                                ) : (
                                    beneficiary.nationality
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
                                        value={eduLvl}
                                        onChange={handleChangeEduLvl}
                                        name="education"
                                        className="single-select"
                                        classNamePrefix="select"
                                    />
                                ) : (
                                    beneficiary.eduLvl
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="edit-submit-buttons">
                        <button
                            onClick={handleToggleEditMode}
                            className="edit-button"
                        >
                            {editing ? "Cancel Edits" : "Edit"}
                        </button>

                        {editing && (
                            <button
                                onClick={handleSubmit}
                                className="submit-button"
                            >
                                Save Edits
                            </button>
                        )}
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
                                {/* {needsInterestsSponsors === 0 &&
                                    !editing &&
                                    beneficiary.needs?.map((need) => (
                                        <div className="mapped-need-interest">
                                            <h4> {need} </h4>
                                        </div>
                                    ))}
                                {needsInterestsSponsors === 0 && editing && (
                                    <CreatableSelect
                                        options={needOpts}
                                        value={needs}
                                        onChange={handleChangeNeeds}
                                        isMulti
                                        class="dropdown"
                                    />
                                )} */}
                                {needsInterestsSponsors === 0 && (
                                    <h4 className="mapped-sponsors">
                                        {editing ? (
                                            <input
                                                placeholder="Need Information"
                                                value={needs}
                                                onChange={handleChangeNeeds}
                                            />
                                        ) : (
                                            beneficiary.needs
                                        )}{" "}
                                    </h4>
                                )}
                                {needsInterestsSponsors === 1 &&
                                    !editing &&
                                    beneficiary.interests?.map((interest) => (
                                        <div className="mapped-need-interest">
                                            <h4> {interest} </h4>
                                        </div>
                                    ))}
                                {needsInterestsSponsors === 1 && editing && (
                                    <CreatableSelect
                                        options={interestOpts}
                                        value={interests}
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
                                                value={sponsorInfo}
                                                onChange={
                                                    handleChangeSponsorInfo
                                                }
                                            />
                                        ) : (
                                            beneficiary.sponsorInfo
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

        // <div className="beneficiary-page-container">
        //     <div className="button-header"> hi </div>
        //     <div className="page-content">
        //         <div className="beneficiary-icon">
        //             <h2 className="initals"> {initials} </h2>
        //         </div>
        //         <div className="beneficiary-name">
        //             <h1>
        //                 {" "}
        //                 {editing ? (
        //                     <input
        //                         placeholder="First Name"
        //                         value={firstName}
        //                         onChange={handleChangeFirstName}
        //                     />
        //                 ) : (
        //                     beneficiary.firstName
        //                 )}{" "}
        //                 {editing ? (
        //                     <input
        //                         placeholder="Last Name"
        //                         value={lastName}
        //                         onChange={handleChangeLastName}
        //                     />
        //                 ) : (
        //                     beneficiary.lastName
        //                 )}{" "}
        //             </h1>
        //         </div>
        //         <div className="personal-info">
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Birthday </h4>

        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <input
        //                             placeholder="Birthday"
        //                             value={bday}
        //                             onChange={handleChangeBday}
        //                             type="date"
        //                         />
        //                     ) : (
        //                         beneficiary.bday?.split("T")[0]
        //                     )}{" "}
        //                 </div>
        //             </div>
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Address </h4>
        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <input
        //                             placeholder="Address"
        //                             value={address}
        //                             onChange={handleChangeAddress}
        //                         />
        //                     ) : (
        //                         beneficiary.address
        //                     )}{" "}
        //                 </div>
        //             </div>
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Phone Number </h4>
        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <input
        //                             placeholder="Phone Number"
        //                             value={phone}
        //                             onChange={handleChangePhone}
        //                         />
        //                     ) : (
        //                         beneficiary.phone
        //                     )}{" "}
        //                 </div>
        //             </div>
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Email </h4>
        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <input
        //                             placeholder="Email"
        //                             value={email}
        //                             onChange={handleChangeEmail}
        //                         />
        //                     ) : (
        //                         beneficiary.email
        //                     )}
        //                 </div>
        //             </div>
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Languages</h4>
        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <CreatableSelect
        //                             name="Languages"
        //                             value={languages}
        //                             onChange={handleChangeLanguages}
        //                             isMulti
        //                             options={languageOpts}
        //                         />
        //                     ) : (
        //                         // JSON.stringify(beneficiary.languages)
        //                         // beneficiary.languages?.map((item) => ({
        //                         //     (item, " ")
        //                         // ))
        //                         beneficiary.languages
        //                         // beneficiary.languages.join(", ")
        //                         // typeof beneficiary.languages
        //                     )}
        //                 </div>
        //             </div>
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Nationality </h4>
        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <CreatableSelect
        //                             name="Nationality"
        //                             value={nationality}
        //                             onChange={handleChangeNationality}
        //                             isMulti
        //                             options={nationalityOpts}
        //                         />
        //                     ) : (
        //                         beneficiary.nationality
        //                     )}
        //                 </div>
        //             </div>
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Education Level </h4>
        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <Select
        //                             options={eduOpts}
        //                             value={eduLvl}
        //                             onChange={handleChangeEduLvl}
        //                             name="education"
        //                             className="single-select"
        //                             classNamePrefix="select"
        //                         />
        //                     ) : (
        //                         beneficiary.eduLvl
        //                     )}
        //                 </div>
        //             </div>
        //         </div>

        //         <div className="edit-submit-buttons">
        //             <button
        //                 onClick={handleToggleEditMode}
        //                 className="edit-button"
        //             >
        //                 {editing ? "Cancel Edits" : "Edit"}
        //             </button>

        //             {editing && (
        //                 <div className="submit-button">
        //                     <button onClick={handleSubmit}>Save Edits</button>
        //                 </div>
        //             )}
        //         </div>
        //     </div>

        //     <div className="beneficiary-registration-info">
        //         <div className="programs-workshops-container">
        //             <div className="programs-workshops-buttons">
        //                 <button
        //                     onClick={handleClickPrograms}
        //                     class={`tab ${
        //                         programsWorkshops === 0 ? "active" : ""
        //                     }`}
        //                     id="programs-button"
        //                 >
        //                     {" "}
        //                     Programs{" "}
        //                 </button>
        //                 <button
        //                     onClick={handleClickWorkshops}
        //                     class={`tab ${
        //                         programsWorkshops === 1 ? "active" : ""
        //                     }`}
        //                     id="workshops-button"
        //                 >
        //                     {" "}
        //                     Workshops
        //                 </button>
        //             </div>
        //             <div className="program-workshop-header">
        //                 <h4 className="mapped-title">Title</h4>
        //                 <h4 className="mapped-date">Start Date</h4>
        //                 <h4 className="mapped-status">Status</h4>
        //             </div>
        //             <div className="list-container">
        //                 {programsWorkshops === 0 &&
        //                     programs.map((program) => (
        //                         <div className="mapped-list">
        //                             <h4 className="mapped-title">
        //                                 {" "}
        //                                 {program.title}{" "}
        //                             </h4>
        //                             <h4 className="mapped-date">
        //                                 {" "}
        //                                 {program.startDate?.split("T")[0]}
        //                             </h4>

        //                             {program.active ? (
        //                                 <h4 className="mapped-status">
        //                                     {" "}
        //                                     Active{" "}
        //                                 </h4>
        //                             ) : (
        //                                 <h4 className="mapped-status">
        //                                     {" "}
        //                                     Archived{" "}
        //                                 </h4>
        //                             )}
        //                         </div>
        //                     ))}

        //                 {programsWorkshops === 1 &&
        //                     workshops.map((workshop) => (
        //                         <div className="mapped-list">
        //                             <h4 className="mapped-title">
        //                                 {" "}
        //                                 {workshop.title}{" "}
        //                             </h4>
        //                             <h4 className="mapped-date">
        //                                 {" "}
        //                                 {workshop.date?.split("T")[0]}
        //                             </h4>

        //                             {workshop.active ? (
        //                                 <h4 className="mapped-status">
        //                                     {" "}
        //                                     Active{" "}
        //                                 </h4>
        //                             ) : (
        //                                 <h4 className="mapped-status">
        //                                     {" "}
        //                                     Archived{" "}
        //                                 </h4>
        //                             )}
        //                         </div>
        //                     ))}
        //             </div>
        //         </div>
        //         <div className="needs-interests-sponsor-container">
        //             <div className="needs-interests-sponsor-buttons">
        //                 <button
        //                     onClick={handleClickNeeds}
        //                     class={`tab ${
        //                         needsInterestsSponsors === 0 ? "active" : ""
        //                     }`}
        //                     id="needs-button"
        //                 >
        //                     {" "}
        //                     Needs{" "}
        //                 </button>
        //                 <button
        //                     onClick={handleClickInterests}
        //                     class={`tab ${
        //                         needsInterestsSponsors === 1 ? "active" : ""
        //                     }`}
        //                     id="interests-button"
        //                 >
        //                     {" "}
        //                     Interests
        //                 </button>
        //                 <button
        //                     onClick={handleClickSponsors}
        //                     class={`tab ${
        //                         needsInterestsSponsors === 2 ? "active" : ""
        //                     }`}
        //                     id="sponsors-button"
        //                 >
        //                     {" "}
        //                     Sponsors
        //                 </button>
        //             </div>

        //             <div className="needs-list-container">
        //                 <div className="needs-interests-sponsors-display">
        //                     {needsInterestsSponsors === 0 &&
        //                         !editing &&
        //                         beneficiary.needs?.map((need) => (
        //                             <div className="mapped-need-interest">
        //                                 <h4> {need} </h4>
        //                             </div>
        //                         ))}
        //                     {needsInterestsSponsors === 0 && editing && (
        //                         <CreatableSelect
        //                             options={needOpts}
        //                             value={needs}
        //                             onChange={handleChangeNeeds}
        //                             isMulti
        //                         />
        //                     )}
        //                     {needsInterestsSponsors === 1 &&
        //                         !editing &&
        //                         beneficiary.interests?.map((interest) => (
        //                             <div className="mapped-need-interest">
        //                                 <h4> {interest} </h4>
        //                             </div>
        //                         ))}
        //                     {needsInterestsSponsors === 1 && editing && (
        //                         <CreatableSelect
        //                             options={interestOpts}
        //                             value={interests}
        //                             onChange={handleChangeInterests}
        //                             isMulti
        //                         />
        //                     )}
        //                     {needsInterestsSponsors === 2 && (
        //                         <h4 className="mapped-sponsors">
        //                             {editing ? (
        //                                 <input
        //                                     placeholder="Sponsorship Information"
        //                                     value={sponsorInfo}
        //                                     onChange={handleChangeSponsorInfo}
        //                                 />
        //                             ) : (
        //                                 beneficiary.sponsorInfo
        //                             )}{" "}
        //                         </h4>
        //                     )}
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="assessment-history">
        //             <div className="assessment-buttons">
        //                 <button
        //                     onClick={handleClickRecent}
        //                     class={`tab ${recentHistory === 0 ? "active" : ""}`}
        //                     id="recent-button"
        //                 >
        //                     {" "}
        //                     Recent{" "}
        //                 </button>
        //                 <button
        //                     onClick={handleClickHistory}
        //                     class={`tab ${recentHistory === 1 ? "active" : ""}`}
        //                     id="history-button"
        //                 >
        //                     {" "}
        //                     History{" "}
        //                 </button>
        //             </div>
        //             <div className="assessment-header">
        //                 <h4 className="assessment-mapped-id">Assessment</h4>
        //                 <h4 className="assessment-mapped-date">Date</h4>
        //             </div>
        //             <div className="list-container">
        //                 {recentHistory === 0 && assessments && (
        //                     <div className="assessment-mapped-list">
        //                         <div className="assessment-subscore">
        //                             <h4 className="assessment-mapped-id">
        //                                 {" "}
        //                                 Overall Score:{" "}
        //                                 {assessments[0]?.totalScore}{" "}
        //                             </h4>
        //                             <h4 className="assessment-mapped-date">
        //                                 {" "}
        //                                 {
        //                                     assessments[0]?.dateTaken?.split(
        //                                         "T"
        //                                     )[0]
        //                                 }
        //                             </h4>
        //                         </div>
        //                         <div className="assessment-subscore">
        //                             <h4 className="assessment-mapped-id">
        //                                 Mental Health Summary:{" "}
        //                                 {assessments[0]?.mentalHealthScore}
        //                             </h4>
        //                             <h4 className="assessment-mapped-date">
        //                                 {" "}
        //                                 {
        //                                     assessments[0]?.dateTaken?.split(
        //                                         "T"
        //                                     )[0]
        //                                 }
        //                             </h4>
        //                         </div>
        //                         <div className="assessment-subscore">
        //                             <h4 className="assessment-mapped-id">
        //                                 Life Skills Summary:{" "}
        //                                 {assessments[0]?.lifeSkillsScore}
        //                             </h4>
        //                             <h4 className="assessment-mapped-date">
        //                                 {" "}
        //                                 {
        //                                     assessments[0]?.dateTaken?.split(
        //                                         "T"
        //                                     )[0]
        //                                 }
        //                             </h4>
        //                         </div>
        //                         <div className="assessment-subscore">
        //                             <h4 className="assessment-mapped-id">
        //                                 Social Skills Summary:{" "}
        //                                 {assessments[0]?.socialSkillsScore}
        //                             </h4>
        //                             <h4 className="assessment-mapped-date">
        //                                 {" "}
        //                                 {
        //                                     assessments[0]?.dateTaken?.split(
        //                                         "T"
        //                                     )[0]
        //                                 }
        //                             </h4>
        //                         </div>
        //                         <div className="assessment-subscore">
        //                             <h4 className="assessment-mapped-id">
        //                                 Education Vocational Summary:{" "}
        //                                 {assessments[0]?.educationVocationScore}{" "}
        //                             </h4>
        //                             <h4 className="assessment-mapped-date">
        //                                 {" "}
        //                                 {
        //                                     assessments[0]?.dateTaken?.split(
        //                                         "T"
        //                                     )[0]
        //                                 }
        //                             </h4>
        //                         </div>
        //                     </div>
        //                 )}

        //                 {recentHistory === 1 &&
        //                     assessments.map((assessment) => (
        //                         <div className="mapped-list">
        //                             <h4 className="assessment-mapped-id">
        //                                 <Link
        //                                     to={`/dashboard/assessments/${assessment._id}`}
        //                                 >
        //                                     {assessment._id}
        //                                 </Link>
        //                             </h4>
        //                             <h4 className="assessment-mapped-date">
        //                                 {" "}
        //                                 {assessment.dateTaken?.split("T")[0]}
        //                             </h4>
        //                         </div>
        //                     ))}
        //             </div>
        //         </div>
        //     </div>

        //     {/* <div className="beneficiary-identification-info">
        //         <div className="back-button">
        //             <button onClick={handleBack}>Back</button>
        //         </div>
        //         <div className="beneficiary-icon">
        //             <h2 className="initals"> {initials} </h2>
        //         </div>
        //         <div className="beneficiary-name">
        //             <h1>
        //                 {" "}
        //                 {editing ? (
        //                     <input
        //                         placeholder="First Name"
        //                         value={firstName}
        //                         onChange={handleChangeFirstName}
        //                     />
        //                 ) : (
        //                     beneficiary.firstName
        //                 )}{" "}
        //                 {editing ? (
        //                     <input
        //                         placeholder="Last Name"
        //                         value={lastName}
        //                         onChange={handleChangeLastName}
        //                     />
        //                 ) : (
        //                     beneficiary.lastName
        //                 )}{" "}
        //             </h1>
        //         </div>
        //         <div className="personal-info">
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Birthday </h4>

        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <input
        //                             placeholder="Birthday"
        //                             value={bday}
        //                             onChange={handleChangeBday}
        //                             type="date"
        //                         />
        //                     ) : (
        //                         beneficiary.bday?.split("T")[0]
        //                     )}{" "}
        //                 </div>
        //             </div>
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Address </h4>
        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <input
        //                             placeholder="Address"
        //                             value={address}
        //                             onChange={handleChangeAddress}
        //                         />
        //                     ) : (
        //                         beneficiary.address
        //                     )}{" "}
        //                 </div>
        //             </div>
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Phone Number </h4>
        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <input
        //                             placeholder="Phone Number"
        //                             value={phone}
        //                             onChange={handleChangePhone}
        //                         />
        //                     ) : (
        //                         beneficiary.phone
        //                     )}{" "}
        //                 </div>
        //             </div>
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Email </h4>
        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <input
        //                             placeholder="Email"
        //                             value={email}
        //                             onChange={handleChangeEmail}
        //                         />
        //                     ) : (
        //                         beneficiary.email
        //                     )}
        //                 </div>
        //             </div>
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Languages</h4>
        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <CreatableSelect
        //                             name="Languages"
        //                             value={languages}
        //                             onChange={handleChangeLanguages}
        //                             isMulti
        //                             options={languageOpts}
        //                         />
        //                     ) : (
        //                         // JSON.stringify(beneficiary.languages)
        //                         // beneficiary.languages?.map((item) => ({
        //                         //     (item, " ")
        //                         // ))
        //                         beneficiary.languages
        //                         // beneficiary.languages.join(", ")
        //                         // typeof beneficiary.languages
        //                     )}
        //                 </div>
        //             </div>
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Nationality </h4>
        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <CreatableSelect
        //                             name="Nationality"
        //                             value={nationality}
        //                             onChange={handleChangeNationality}
        //                             isMulti
        //                             options={nationalityOpts}
        //                         />
        //                     ) : (
        //                         beneficiary.nationality
        //                     )}
        //                 </div>
        //             </div>
        //             <div className="personal-line">
        //                 <h4 className="personal-label"> Education Level </h4>
        //                 <div className="personal-value">
        //                     {editing ? (
        //                         <Select
        //                             options={eduOpts}
        //                             value={eduLvl}
        //                             onChange={handleChangeEduLvl}
        //                             name="education"
        //                             className="single-select"
        //                             classNamePrefix="select"
        //                         />
        //                     ) : (
        //                         beneficiary.eduLvl
        //                     )}
        //                 </div>
        //             </div>
        //         </div>

        //         <div className="edit-submit-buttons">
        //             <button
        //                 onClick={handleToggleEditMode}
        //                 className="edit-button"
        //             >
        //                 {editing ? "Cancel Edits" : "Edit"}
        //             </button>

        //             {editing && (
        //                 <div className="submit-button">
        //                     <button onClick={handleSubmit}>Save Edits</button>
        //                 </div>
        //             )}
        //         </div>
        //     </div>

        //     <div className="beneficiary-registration-info">
        //         <div className="programs-workshops-container">
        //             <div className="programs-workshops-buttons">
        //                 <button
        //                     onClick={handleClickPrograms}
        //                     class={`tab ${
        //                         programsWorkshops === 0 ? "active" : ""
        //                     }`}
        //                     id="programs-button"
        //                 >
        //                     {" "}
        //                     Programs{" "}
        //                 </button>
        //                 <button
        //                     onClick={handleClickWorkshops}
        //                     class={`tab ${
        //                         programsWorkshops === 1 ? "active" : ""
        //                     }`}
        //                     id="workshops-button"
        //                 >
        //                     {" "}
        //                     Workshops
        //                 </button>
        //             </div>
        //             <div className="program-workshop-header">
        //                 <h4 className="mapped-title">Title</h4>
        //                 <h4 className="mapped-date">Start Date</h4>
        //                 <h4 className="mapped-status">Status</h4>
        //             </div>
        //             <div className="list-container">
        //                 {programsWorkshops === 0 &&
        //                     programs.map((program) => (
        //                         <div className="mapped-list">
        //                             <h4 className="mapped-title">
        //                                 {" "}
        //                                 {program.title}{" "}
        //                             </h4>
        //                             <h4 className="mapped-date">
        //                                 {" "}
        //                                 {program.startDate?.split("T")[0]}
        //                             </h4>

        //                             {program.active ? (
        //                                 <h4 className="mapped-status">
        //                                     {" "}
        //                                     Active{" "}
        //                                 </h4>
        //                             ) : (
        //                                 <h4 className="mapped-status">
        //                                     {" "}
        //                                     Archived{" "}
        //                                 </h4>
        //                             )}
        //                         </div>
        //                     ))}

        //                 {programsWorkshops === 1 &&
        //                     workshops.map((workshop) => (
        //                         <div className="mapped-list">
        //                             <h4 className="mapped-title">
        //                                 {" "}
        //                                 {workshop.title}{" "}
        //                             </h4>
        //                             <h4 className="mapped-date">
        //                                 {" "}
        //                                 {workshop.date?.split("T")[0]}
        //                             </h4>

        //                             {workshop.active ? (
        //                                 <h4 className="mapped-status">
        //                                     {" "}
        //                                     Active{" "}
        //                                 </h4>
        //                             ) : (
        //                                 <h4 className="mapped-status">
        //                                     {" "}
        //                                     Archived{" "}
        //                                 </h4>
        //                             )}
        //                         </div>
        //                     ))}
        //             </div>
        //         </div>
        //         <div className="needs-interests-sponsor-container">
        //             <div className="needs-interests-sponsor-buttons">
        //                 <button
        //                     onClick={handleClickNeeds}
        //                     class={`tab ${
        //                         needsInterestsSponsors === 0 ? "active" : ""
        //                     }`}
        //                     id="needs-button"
        //                 >
        //                     {" "}
        //                     Needs{" "}
        //                 </button>
        //                 <button
        //                     onClick={handleClickInterests}
        //                     class={`tab ${
        //                         needsInterestsSponsors === 1 ? "active" : ""
        //                     }`}
        //                     id="interests-button"
        //                 >
        //                     {" "}
        //                     Interests
        //                 </button>
        //                 <button
        //                     onClick={handleClickSponsors}
        //                     class={`tab ${
        //                         needsInterestsSponsors === 2 ? "active" : ""
        //                     }`}
        //                     id="sponsors-button"
        //                 >
        //                     {" "}
        //                     Sponsors
        //                 </button>
        //             </div>

        //             <div className="needs-list-container">
        //                 <div className="needs-interests-sponsors-display">
        //                     {needsInterestsSponsors === 0 &&
        //                         !editing &&
        //                         beneficiary.needs?.map((need) => (
        //                             <div className="mapped-need-interest">
        //                                 <h4> {need} </h4>
        //                             </div>
        //                         ))}
        //                     {needsInterestsSponsors === 0 && editing && (
        //                         <CreatableSelect
        //                             options={needOpts}
        //                             value={needs}
        //                             onChange={handleChangeNeeds}
        //                             isMulti
        //                         />
        //                     )}
        //                     {needsInterestsSponsors === 1 &&
        //                         !editing &&
        //                         beneficiary.interests?.map((interest) => (
        //                             <div className="mapped-need-interest">
        //                                 <h4> {interest} </h4>
        //                             </div>
        //                         ))}
        //                     {needsInterestsSponsors === 1 && editing && (
        //                         <CreatableSelect
        //                             options={interestOpts}
        //                             value={interests}
        //                             onChange={handleChangeInterests}
        //                             isMulti
        //                         />
        //                     )}
        //                     {needsInterestsSponsors === 2 && (
        //                         <h4 className="mapped-sponsors">
        //                             {editing ? (
        //                                 <input
        //                                     placeholder="Sponsorship Information"
        //                                     value={sponsorInfo}
        //                                     onChange={handleChangeSponsorInfo}
        //                                 />
        //                             ) : (
        //                                 beneficiary.sponsorInfo
        //                             )}{" "}
        //                         </h4>
        //                     )}
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="assessment-history">
        //             <div className="assessment-buttons">
        //                 <button
        //                     onClick={handleClickRecent}
        //                     class={`tab ${recentHistory === 0 ? "active" : ""}`}
        //                     id="recent-button"
        //                 >
        //                     {" "}
        //                     Recent{" "}
        //                 </button>
        //                 <button
        //                     onClick={handleClickHistory}
        //                     class={`tab ${recentHistory === 1 ? "active" : ""}`}
        //                     id="history-button"
        //                 >
        //                     {" "}
        //                     History{" "}
        //                 </button>
        //             </div>
        //             <div className="assessment-header">
        //                 <h4 className="assessment-mapped-id">Assessment</h4>
        //                 <h4 className="assessment-mapped-date">Date</h4>
        //             </div>
        //             <div className="list-container">
        //                 {recentHistory === 0 && assessments && (
        //                     <div className="assessment-mapped-list">
        //                         <div className="assessment-subscore">
        //                             <h4 className="assessment-mapped-id">
        //                                 {" "}
        //                                 Overall Score:{" "}
        //                                 {assessments[0]?.totalScore}{" "}
        //                             </h4>
        //                             <h4 className="assessment-mapped-date">
        //                                 {" "}
        //                                 {
        //                                     assessments[0]?.dateTaken?.split(
        //                                         "T"
        //                                     )[0]
        //                                 }
        //                             </h4>
        //                         </div>
        //                         <div className="assessment-subscore">
        //                             <h4 className="assessment-mapped-id">
        //                                 Mental Health Summary:{" "}
        //                                 {assessments[0]?.mentalHealthScore}
        //                             </h4>
        //                             <h4 className="assessment-mapped-date">
        //                                 {" "}
        //                                 {
        //                                     assessments[0]?.dateTaken?.split(
        //                                         "T"
        //                                     )[0]
        //                                 }
        //                             </h4>
        //                         </div>
        //                         <div className="assessment-subscore">
        //                             <h4 className="assessment-mapped-id">
        //                                 Life Skills Summary:{" "}
        //                                 {assessments[0]?.lifeSkillsScore}
        //                             </h4>
        //                             <h4 className="assessment-mapped-date">
        //                                 {" "}
        //                                 {
        //                                     assessments[0]?.dateTaken?.split(
        //                                         "T"
        //                                     )[0]
        //                                 }
        //                             </h4>
        //                         </div>
        //                         <div className="assessment-subscore">
        //                             <h4 className="assessment-mapped-id">
        //                                 Social Skills Summary:{" "}
        //                                 {assessments[0]?.socialSkillsScore}
        //                             </h4>
        //                             <h4 className="assessment-mapped-date">
        //                                 {" "}
        //                                 {
        //                                     assessments[0]?.dateTaken?.split(
        //                                         "T"
        //                                     )[0]
        //                                 }
        //                             </h4>
        //                         </div>
        //                         <div className="assessment-subscore">
        //                             <h4 className="assessment-mapped-id">
        //                                 Education Vocational Summary:{" "}
        //                                 {assessments[0]?.educationVocationScore}{" "}
        //                             </h4>
        //                             <h4 className="assessment-mapped-date">
        //                                 {" "}
        //                                 {
        //                                     assessments[0]?.dateTaken?.split(
        //                                         "T"
        //                                     )[0]
        //                                 }
        //                             </h4>
        //                         </div>
        //                     </div>
        //                 )}

        //                 {recentHistory === 1 &&
        //                     assessments.map((assessment) => (
        //                         <div className="mapped-list">
        //                             <h4 className="assessment-mapped-id">
        //                                 <Link
        //                                     to={`/dashboard/assessments/${assessment._id}`}
        //                                 >
        //                                     {assessment._id}
        //                                 </Link>
        //                             </h4>
        //                             <h4 className="assessment-mapped-date">
        //                                 {" "}
        //                                 {assessment.dateTaken?.split("T")[0]}
        //                             </h4>
        //                         </div>
        //                     ))}
        //             </div>
        //         </div>
        //     </div> */}
        //     {/* <div className="archive-delete-buttons">
        //         <div className="archive-button">
        //             {editing && (
        //                 <button onClick={handleToggleArchive}>
        //                     {archived
        //                         ? "Unarchive Beneficiary"
        //                         : "Archive Beneficiary"}
        //                 </button>
        //             )}
        //         </div>
        //         <div className="delete-button">
        //             {editing && (
        //                 <button onClick={handleDelete}>
        //                     Delete Beneficiary
        //                 </button>
        //             )}
        //         </div>
        //     </div> */}
        // </div>
    );
};

export default Beneficiary;
