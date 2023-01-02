import React, { useState, useEffect } from "react";

import "./Form.css";

import ProgressBar from "./ProgressBar";
import Page1 from "./Page1";
import Page0 from "./Page0";
import Page2 from "./Page2";
import Page3 from "./Page3";

const NUM_PAGES = 5;

const Form = () => {
    const [pageNum, setpageNum] = useState(0);

    // Page 0
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState({ value: "female", label: "Female" });
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [age, setAge] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());

    // Page 1
    const [joinDate, setJoinDate] = useState(new Date());
    const [reason, setReason] = useState("");
    const [needs, setNeeds] = useState([]);
    const [interests, setInterests] = useState();

    // Page2
    const [languages, setLanguages] = useState();
    const [nationalities, setNationalites] = useState();
    const [education, setEducation] = useState();

    // Page3
    const [selectedReferrals, setSelectedReferrals] = useState();
    const [sponsorInfo, setSponsorInfo] = useState("");

    const handlePageDecrement = () => {
        setpageNum((prev) => prev - 1);
    };

    const handlePageIncrement = () => {
        setpageNum((prev) => prev + 1);
    };

    const handleSubmit = async () => {
        const response = await fetch("http://localhost:3000/beneficiaries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                id: "2222345", // TODO
                bday: birthDate,
                age: 20,
                gender: gender.value,
                visitReason: reason,
                joinDate: joinDate,
                phone: phoneNumber,
                email: email,
                languages: languages.map((option) => option.value),
                nationality: nationalities.map((option) => option.value),
                eduLvl: education.value,
                interests: interests.map((option) => option.value),
                needs: needs.map((option) => option.value),
                sponsorInfo: sponsorInfo,
                referrals: selectedReferrals.map((option) => option.value),
            }),
        });

        console.log(response.json());
    };

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
            <div>PAGE CONTENT</div>
            <div className="button-container">
                {pageNum > 0 && (
                    <button onClick={handlePageDecrement}>Previous</button>
                )}
                {pageNum < NUM_PAGES - 1 && (
                    <button onClick={handlePageIncrement}>Next</button>
                )}
            </div>
            <Page0
                formFirstName={firstName}
                setFormFirstName={setFirstName}
                formLastName={lastName}
                setFormLastName={setLastName}
                formSelectedGender={gender}
                setFormSelectedGender={setGender}
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
            />
            <Page1
                formLanguages={languages}
                setFormLanguages={setLanguages}
                formNationalities={nationalities}
                setFormNationalities={setNationalites}
                formEducation={education}
                setFormEducation={setEducation}
            />
            <Page2
                formJoinDate={joinDate}
                setFormJoinDate={setJoinDate}
                formReason={reason}
                setFormReason={setReason}
                formSelectedNeeds={needs}
                setFormSelectedNeeds={setNeeds}
                formSelectedInterests={interests}
                setFormSelectedInterest={setInterests}
            />
            <Page3
                formSelectedReferrals={selectedReferrals}
                setFormSelectedReferrals={setSelectedReferrals}
                formSponsorInfo={sponsorInfo}
                setFormSponsorInfo={setSponsorInfo}
            />
            <br />
            <div className="button-container">
                <button onClick={handleSubmit}>Create Beneficiary</button>
            </div>
        </div>
    );
};

export default Form;
