import React from "react";

import "./BeneficiaryRegistration.css";

const Page3 = ({
    referrals,
    setReferrals,
    sponsorInfo,
    setSponsorInfo,
    staffNotes, 
    setStaffNotes
}) => {
    const handleReferralSelect = (event) => {
        setReferrals(event.target.value);
    };

    const handleChangeSponsorInfo = (event) => {
        setSponsorInfo(event.target.value);
    };

    const handleChangeStaffNotes = (event) => {
        setStaffNotes(event.target.value);
    }

    return (
        <div className="Page3">
            <h3> Basic info: Other </h3>
            <form>
                <div className="dropdown-container">
                    <label>
                        Referred by Partner Organization
                        <br />
                        <textarea
                            rows="5"
                            cols="80"
                            onChange={handleReferralSelect}
                            value={referrals}
                        > </textarea>
                        {/* 
                        <Select
                            options={referrals}
                            placeholder="Select Referrals"
                            value={formSelectedReferrals}
                            onChange={handleReferralSelect}
                            isSearchable={true}
                            isMulti
                        />
                        */}

                    </label>
                </div>
                <br />
                <label>
                    Sponsorship information
                    <br />
                    <textarea
                        rows="5"
                        cols="80"
                        onChange={handleChangeSponsorInfo}
                        value={sponsorInfo}
                    /> 
                </label>
                <br />
                <label>
                    Staff notes
                    <br />
                    <textarea 
                        rows="5"
                        cols="80"
                        onChange={handleChangeStaffNotes}
                        value={staffNotes}
                    ></textarea>
                </label>
            </form>
        </div>
    );
};

export default Page3;
