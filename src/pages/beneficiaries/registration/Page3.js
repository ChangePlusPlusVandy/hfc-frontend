import React from "react";

import "./BeneficiaryRegistration.css";

const Page3 = ({
    referrals,
    setReferrals,
    sponsorInfo,
    setSponsorInfo,
    staffNotes,
    setStaffNotes,
}) => {
    const handleReferralChange = (event) => {
        setReferrals(event.target.value);
    };

    const handleSponsorInfoChange = (event) => {
        setSponsorInfo(event.target.value);
    };

    const handleStaffNotesChange = (event) => {
        setStaffNotes(event.target.value);
    };

    return (
        <div className="page-content">
            <div className="section-container">
                <label className="section-label">
                    Partner Organization Referrals
                </label>
                <textarea
                    value={referrals}
                    onChange={handleReferralChange}
                    placeholder="Start here..."
                />
            </div>
            <br />
            <div className="section-container">
                <label className="section-label">Sponsorship Information</label>
                <textarea
                    value={sponsorInfo}
                    onChange={handleSponsorInfoChange}
                    placeholder="Start here..."
                />
            </div>
            <br />
            <div className="section-container">
                <label className="section-label">Staff Notes</label>
                <textarea
                    value={staffNotes}
                    onChange={handleStaffNotesChange}
                    placeholder="Start here..."
                />
            </div>
        </div>
    );
};

export default Page3;
