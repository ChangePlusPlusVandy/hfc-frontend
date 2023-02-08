import React, { useState } from "react";

import "./BeneficiaryRegistration.css";

import FormProgressBar from "../../../components/FormProgressBar";
import FormNavBar from "../../../components/FormNavBar";
import Page1 from "./Page1";
import Page0 from "./Page0";
import Page2 from "./Page2";
import Page3 from "./Page3";
import ReviewPage from "./ReviewPage";

const BeneficiaryRegistration = () => {
    const [pageNum, setPageNum] = useState(0);

    // Page 0 Data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState(""); // BirthDate is defined as a string not a date
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("female");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    // Page 1 Data
    const [languages, setLanguages] = useState([]);
    const [nationalities, setNationalities] = useState([]);
    const [education, setEducation] = useState("");

    // Page 2 Data
    const [reason, setReason] = useState(""); // Displays what Reason were selected
    const [interests, setInterests] = useState([]);
    const [joinDate, setJoinDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [needs, setNeeds] = useState([]);

    // Page 3 Data
    const [referrals, setReferrals] = useState(); // Display what Referal Orgs were Selected
    const [staffNotes, setStaffNotes] = useState();
    const [sponsorInfo, setSponsorInfo] = useState();

    const PAGES = [
        {
            title: "Basic Info: Fill In",
            shortName: "Fill",
            component: (
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
                />
            ),
        },
        {
            title: "Basic Info: Check Box",
            shortName: "Check",
            component: (
                <Page1
                    languages={languages}
                    setLanguages={setLanguages}
                    nationalities={nationalities}
                    setNationalities={setNationalities}
                    education={education}
                    setEducation={setEducation}
                />
            ),
        },
        {
            title: "Basic Info: Check & Fill",
            shortName: "Both",
            component: (
                <Page2
                    reason={reason}
                    setReason={setReason}
                    interests={interests}
                    setInterests={setInterests}
                    joinDate={joinDate}
                    setJoinDate={setJoinDate}
                    needs={needs}
                    setNeeds={setNeeds}
                />
            ),
        },
        {
            title: "Basic Info: Other",
            shortName: "Other",
            component: (
                <Page3
                    referrals={referrals}
                    setReferrals={setReferrals}
                    staffNotes={staffNotes}
                    setStaffNotes={setStaffNotes}
                    sponsorInfo={sponsorInfo}
                    setSponsorInfo={setSponsorInfo}
                />
            ),
        },
        {
            title: "Review",
            shortName: "Review",
            component: (
                <ReviewPage
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
                />
            ),
        },
    ];

    const handleStepClick = (index) => {
        setPageNum(index);
    };

    const handleSubmit = async () => {
        const newBeneficiary = {
            firstName,
            lastName,
            id: "2222345", // TODO
            bday: birthDate,
            age,
            gender,
            visitReason: reason,
            joinDate,
            phone: phoneNumber,
            email,
            languages: languages.map((option) => option.value),
            nationality: nationalities.map((option) => option.value),
            eduLvl: education.value,
            interests: interests.map((option) => option.value),
            needs: needs.map((option) => option.value),
            sponsorInfo,
            referrals,
            archived: false,
            address,
        };

        let response;
        try {
            console.log("Attempting to save a new beneficiary...");
            console.log("New beneficiary:", newBeneficiary);
            response = await fetch("http://localhost:3000/beneficiaries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBeneficiary),
            });
        } catch (error) {
            console.log("Error saving a new beneficiary:", error);
        } finally {
            console.log("Successfully saved a new beneficiary!");
            console.log("Response:", response.json());
        }
    };

    return (
        <div className="beneficiary-registration-container">
            <FormProgressBar
                stepNames={PAGES.map((page) => page.shortName)}
                activeStepIndex={pageNum}
                onStepClick={handleStepClick}
            />
            <h2 className="page-title">{PAGES[pageNum].title}</h2>
            <div className="page-container">{PAGES[pageNum].component}</div>
            <FormNavBar
                pageNum={pageNum}
                setPageNum={setPageNum}
                numPages={PAGES.length}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default BeneficiaryRegistration;
