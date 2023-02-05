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
    reason,
    referrals,
    interests,
    birthDate,
    joinDate,
    needs,
    gender,
    staffNotes,
    sponsorInfo,
}) => {
    return (
        <div className="review-page-container">
            <p>
                {" "}
                {firstName} {lastName}{" "}
            </p>
            <p> Age: {age} </p>
            <p> Gender: {gender.label} </p>
            <p> Email: {email} </p>
            <p> Phone: {phoneNumber}</p>
            <p> Address: {address} </p>
            <p> Birthdate: {birthDate} </p>
            <p>
                {" "}
                Languages: {languages.map(
                    (language) => language.label + " "
                )}{" "}
            </p>
            <p>
                {" "}
                Nationalities:{" "}
                {nationalities.map(
                    (nationality) => nationality.label + " "
                )}{" "}
            </p>
            <p> Education: {education.label} </p>
            <p> Join Date: {joinDate.toDateString()} </p>
            <p> Reason For Visit: {reason} </p>
            <p>
                {" "}
                Interests: {interests.map(
                    (interest) => interest.label + " "
                )}{" "}
            </p>
            <p> Referrals: {referrals} </p>
            <p> Needs: {needs.map((need) => need.label + " ")} </p>
            <p> Sponsorship: {sponsorInfo} </p>
            <p> Notes: {staffNotes} </p>
        </div>
    );
};

export default Page4;
