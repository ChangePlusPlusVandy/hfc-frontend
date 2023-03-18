import React from "react";

import "./BeneficiaryRegistration.css";

import DefaultUserProfilePic from "../../../assets/images/default-user.png";

const ReviewPage = ({
    firstName,
    lastName,
    gender,
    birthDate,
    age,
    email,
    phoneNumber,
    address,
    languages,
    nationalities,
    joinDate,
    education,
    reason,
    referrals,
    interests,
    needs,
    staffNotes,
    sponsorInfo,
}) => {
    return (
        <div className="review-container">
            <div className="review-info-header">
                <img
                    className="beneficiary-profile-pic"
                    src={DefaultUserProfilePic}
                    alt={firstName + lastName}
                />
                <div className="basic-info">
                    <h2 className="beneficiary-name">
                        {firstName || "[No Name]"} {lastName}
                    </h2>
                    <p>
                        <strong>Gender: </strong>
                        {gender || "N/A"}
                    </p>
                    <p>
                        <strong>Birthdate: </strong>
                        {birthDate || "N/A"}
                    </p>
                    <p>
                        <strong>Age: </strong>
                        {age || "N/A"}
                    </p>
                </div>
            </div>
            <div className="section-container">
                <label className="section-label">Contact</label>
                <div className="section-contents">
                    <p>Email: {email || "N/A"}</p>
                    <p>Phone: {phoneNumber || "N/A"}</p>
                </div>
            </div>
            <div className="section-container">
                <label className="section-label">Address</label>
                <div className="section-contents">
                    <p>{address || "N/A"}</p>
                </div>
            </div>
            <div className="section-container">
                <label className="section-label">Languages</label>
                <div className="section-contents">
                    <div className="tags-container">
                        {languages.length !== 0
                            ? languages.map((language, index) => (
                                  <div className="tag" key={index}>
                                      {language.label}
                                  </div>
                              ))
                            : "N/A"}
                    </div>
                </div>
            </div>
            <div className="section-container">
                <label className="section-label">Nationalities</label>
                <div className="section-contents">
                    <div className="tags-container">
                        {nationalities.length !== 0
                            ? nationalities.map((nationality, index) => (
                                  <div className="tag" key={index}>
                                      {nationality.label}
                                  </div>
                              ))
                            : "N/A"}
                    </div>
                </div>
            </div>
            <div className="section-container">
                <label className="section-label">Education</label>
                <div className="section-contents">
                    <p>{education.label || "N/A"}</p>
                </div>
            </div>
            <div className="section-container">
                <label className="section-label">Join Date</label>
                <div className="section-contents">
                    <p>{joinDate || "N/A"}</p>
                </div>
            </div>
            <div className="section-container">
                <label className="section-label">Reason for Visit</label>
                <div className="section-contents">
                    <p>{reason || "N/A"}</p>
                </div>
            </div>
            <div className="section-container">
                <label className="section-label">Interests</label>
                <div className="section-contents">
                    <div className="tags-container">
                        {interests.length !== 0
                            ? interests.map((interest, index) => (
                                  <div className="tag" key={index}>
                                      {interest.label}
                                  </div>
                              ))
                            : "N/A"}
                    </div>
                </div>
            </div>
            <div className="section-container">
                <label className="section-label">Needs</label>
                <div className="section-contents">
                    <div className="tags-container">
                        {needs.length !== 0
                            ? needs.map((need, index) => (
                                  <div className="tag" key={index}>
                                      {need.label}
                                  </div>
                              ))
                            : "N/A"}
                    </div>
                </div>
            </div>
            <div className="section-container">
                <label className="section-label">
                    Partner Organization Referrals
                </label>
                <div className="section-contents">
                    <p>{referrals || "N/A"}</p>
                </div>
            </div>
            <div className="section-container">
                <label className="section-label">Sponsership Information</label>
                <div className="section-contents">
                    <p>{sponsorInfo || "N/A"}</p>
                </div>
            </div>
            <div className="section-container">
                <label className="section-label">Staff Notes</label>
                <div className="section-contents">
                    <p>{staffNotes || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;
