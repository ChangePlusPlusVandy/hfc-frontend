import React, { useState, useEffect } from "react";

import "./Form.css";

import ProgressBar from "./ProgressBar";
import Page1 from "./Page1";
import Page0 from "./Page0";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";

const NUM_PAGES = 5;

const Form = () => {

    const [pageNum, setpageNum] = useState(0);

    // Form Data (Page 0)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [age, setAge] = useState("");
    const [birthDate, setBirthDate] = useState(""); // BirthDate is defined as a string not a date

    const [selectedReasons, setSelectedReasons] = useState(); // Displays what Reasons were selected
    const [selectedPrograms, setSelectedPrograms] = useState(); // Displays what Programs were selected
    const [programs, setPrograms] = useState([{}]); // Save and render programs collection data as state
    const [selectedReferrals, setSelectedReferrals] = useState(); // Display what Referal Orgs were Selected

    const [languages, setLanguages] = useState();
    const [nationalities, setNationalites] = useState();
    const [education, setEducation] = useState();

    const PAGES = [
        <Page0
            formFirstName={firstName}
            setFormFirstName={setFirstName}
            formLastName={lastName}
            setFormLastName={setLastName}
            formPhoneNumber={phoneNumber}
            setFormPhoneNumber={setPhoneNumber}
            formEmail={email}
            setFormEmail={setEmail}
            formAddress={address}
            setFormAddress={setAddress}
            formCity={city}
            setFormCity={setCity}
            formState={state}
            setFormState={setState}
            formZipcode={zipcode}
            setFormZipcode={setZipcode}
            formAge={age}
            setFormAge={setAge}
            formBirthDate={birthDate}
            setFormBirthDate={setBirthDate}
        />, 
        <Page1
            formLanguages={languages}
            setFormLanguages={setLanguages}
            formNationalities={nationalities}
            setFormNationalities={setNationalites}
            formEducation={education}
            setFormEducation={setEducation}
        />, 
        <Page2
            formSelectedReasons={selectedReasons}
            setFormSelectedReasons={setSelectedReasons}
            formSelectedPrograms={selectedPrograms}
            setFormSelectedPrograms={setSelectedPrograms}
            formPrograms={programs}
            setFormPrograms={setPrograms}
        />, 
        <Page3
            formSelectedReferrals={selectedReferrals}
            setFormSelectedReferrals={setSelectedReferrals}
        />, 
        <Page4
            formFirstName={firstName}
            formLastName={lastName}
            formAge={age}
            formEmail={email}
            formPhoneNumber={phoneNumber}
            formAddress={address}
            formCity={city} 
            formState={state}
            formZipcode={zipcode}
            formLanguages={languages}
            formNationalities={nationalities}
            formEducation={education}
            formSelectedReasons={selectedReasons}
            formSelectedPrograms={selectedPrograms}
            formSelectedReferrals={selectedReferrals}
        />
    ];

    const handlePageDecrement = () => {
        setpageNum((prev) => prev - 1);
    };

    const handlePageIncrement = () => {
        setpageNum((prev) => prev + 1);
    };

    useEffect(() => {
        const endpoint = "http://localhost:3000/programs"; // edit to programs
        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => setPrograms(data));
    }, []);

    return (
        <div className="form-container">
            <div>
                <ProgressBar
                    bgcolor={"#2680AF"}
                    completed={(pageNum / 5) * 100}
                />
            </div>
            <h1>Form</h1>
            <h4>Page Number: {pageNum}</h4>
            <div className="page-content">
                {PAGES[pageNum]}  
            </div>
            <div className="button-container">
                {pageNum > 0 && (
                    <button onClick={handlePageDecrement}>Previous</button>
                )}
                {pageNum < NUM_PAGES - 1 && (
                    <button onClick={handlePageIncrement}>Next</button>
                )}
            </div>
            <div className="submit-button">
                {pageNum === 4 && (
                    <button onClick={handleSubmit}>Create Beneficiary</button>
                )}

            </div>
        
        </div>
    );
};

export default Form;
