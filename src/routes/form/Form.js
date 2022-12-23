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

    // Form Data (Page 0)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState(); // new
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [age, setAge] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());

    const [reason, setReason] = useState("");
    const [selectedPrograms, setSelectedPrograms] = useState(); // Displays what Programs were selected
    const [programs, setPrograms] = useState([{}]); // Save and render programs collection data as state
    const [selectedReferrals, setSelectedReferrals] = useState(); // Display what Referal Orgs were Selected
    const [needs, setNeeds] = useState();
    const [interests, setInterests] = useState();
    const [sponsorInfo, setSponsorInfo] = useState("");

    const [languages, setLanguages] = useState();
    const [nationalities, setNationalites] = useState();
    const [education, setEducation] = useState();

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
                id:"111111234", // TODO
                bday: birthDate,
                age: age,
                gender: gender,
                visitReason: reason,
                joinDate: new Date(),
                phone: phoneNumber,
                email: email,
                languages: languages,
                nationality: nationalities,
                eduLvl: education,
                interests: interests,
                needs: needs,
                sponsorInfo: sponsorInfo,
                referrals: selectedReferrals,
            }),
        });

        console.log(response.json());
    };

    useEffect(() => {
        // const endpoint = "http://localhost:3000/programs"; // edit to programs
        // fetch(endpoint)
        //     .then((res) => res.json())
        //     .then((data) => setPrograms(data));

        fetch("http://localhost:3000/beneficiaries")
        .then((res) => res.json())
        .then((data) => setBeneficiaries(data));
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
                formReason={reason}
                setFormReason={setReason}
                // formSelectedPrograms={selectedPrograms}
                // setFormSelectedPrograms={setSelectedPrograms}
                // formPrograms={programs}
                // setFormPrograms={setPrograms}
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

/*
else if (pageNum === 1) {
    return <Page1/>
} else if (pageNum === 2) {
    return <Page2/>
} else if (pageNum === 3) {
    return <Page3/>
} else if (pageNum === 4) {
    return <Page4/>
}
*/
