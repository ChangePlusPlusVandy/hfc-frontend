import React, { useState, useEffect } from "react";

import "./BeneficiaryRegistration.css";

import ProgressBar from "./ProgressBar";
import Page1 from "./Page1";
import Page0 from "./Page0";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";

const NUM_PAGES = 5;

const BeneficiaryRegistration = () => {
    const [pageNum, setpageNum] = useState(0);

    // Form Data (Page 0)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [birthDate, setBirthDate] = useState(""); // BirthDate is defined as a string not a date
    const [gender, setGender] = useState("");

    const [reason, setReason] = useState(); // Displays what Reason were selected
    const [referrals, setReferrals] = useState(); // Display what Referal Orgs were Selected
    const [staffNotes, setStaffNotes] = useState();
    const [sponsorInfo, setSponsorInfo] = useState();
    const [interests, setInterests] = useState([]);
    const [joinDate, setJoinDate] = useState(new Date());
    const [needs, setNeeds] = useState([]);

    const [languages, setLanguages] = useState([]);
    const [nationalities, setNationalities] = useState([]);
    const [education, setEducation] = useState("");

    const PAGES = [
        <Page0
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            email={email}
            setEmail={setEmail}
            address={address}
            setAddress={setAddress}
            age={age}
            setAge={setAge}
            birthDate={birthDate}
            setBirthDate={setBirthDate}
            gender={gender}
            setGender={setGender}
        />,
        <Page1
            languages={languages}
            setLanguages={setLanguages}
            nationalities={nationalities}
            setNationalites={setNationalities}
            education={education}
            setEducation={setEducation}
        />,
        <Page2
            reason={reason}
            setReason={setReason}
            interests={interests}
            setInterests={setInterests}
            joinDate={joinDate}
            setJoinDate={setJoinDate}
            needs={needs}
            setNeeds={setNeeds}
        />,
        <Page3
            referrals={referrals}
            setReferrals={setReferrals}
            staffNotes={staffNotes}
            setStaffNotes={setStaffNotes}
            sponsorInfo={sponsorInfo}
            setSponsorInfo={setSponsorInfo}
        />,
        <Page4
            firstName={firstName}
            lastName={lastName}
            age={age}
            email={email}
            phoneNumber={phoneNumber}
            address={address}
            languages={languages}
            nationalities={nationalities}
            education={education}
            reason={reason}
            referrals={referrals}
            birthDate={birthDate}
            joinDate={joinDate}
            interests={interests}
            needs={needs}
            gender={gender}
            staffNotes={staffNotes}
            sponsorInfo={sponsorInfo}
        />,
    ];

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
                age: age,
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
                referrals: referrals,
                archived: false,
                address: address,
            }),
        });

        console.log(response.json());
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
            <div className="page-content">{PAGES[pageNum]}</div>
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

export default BeneficiaryRegistration;
