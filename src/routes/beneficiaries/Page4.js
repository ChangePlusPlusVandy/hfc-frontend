import React from "react";
import "./BeneficiaryRegistration.css";

//TO DO: add gender and interests

const Page4 = ({
    firstName,
    lastName,
    age,
    email,
    phoneNumber,
    address,
    languages,
    nationalities,
    education,
    reasons,
    referrals,
    interests,
    birthDate,
    joinDate,
    needs,
    selectedGender,
    staffNotes,
    sponsorInfo,
}) => {
    return (
        <div>
            <h1>Review</h1>
            <h5>
                {" "}
                {firstName} {lastName}{" "}
            </h5>
            <h5> Age: {age} </h5>
            <h5> Gender: {selectedGender.label} </h5>
            <h5> Email: {email} </h5>
            <h5> Phone: {phoneNumber}</h5>
            <h5> Address: {address} </h5>
            <h5> Birthdate: {birthDate} </h5>
            <h5>
                {" "}
                Languages: {languages.map(
                    (language) => language.label + " "
                )}{" "}
            </h5>
            <h5>
                {" "}
                Nationalities:{" "}
                {nationalities.map(
                    (nationality) => nationality.label + " "
                )}{" "}
            </h5>
            <h5> Education: {education.label} </h5>
            <h5> Join Date: {joinDate.toDateString()} </h5>
            <h5> Reasons For Visit: {reasons} </h5>
            <h5>
                {" "}
                Interests: {interests.map(
                    (interest) => interest.label + " "
                )}{" "}
            </h5>
            <h5> Referrals: {referrals} </h5>
            <h5> Needs: {needs.map((need) => need.label + " ")} </h5>
            <h5> Sponsorship: {sponsorInfo} </h5>
            <h5> Notes: {staffNotes} </h5>
        </div>
    );
};

export default Page4;
