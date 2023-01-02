import React from "react";
import Select from "react-select";

import "./BeneficiaryRegistration.css";

const referrals = [
    { value: "reason1", label: "Reason 1" },
    { value: "reason2", label: "Reason 2" },
    { value: "reason3", label: "Reason 3" },
];

const Page3 = ({ formSelectedReferrals, setFormSelectedReferrals }) => {
    const handleReferralSelect = (data) => {
        setFormSelectedReferrals(data);
    };

    return (
        <div className="Page3">
            <h1> Basic info: Other </h1>
            <form>
                <div className="dropdown-container">
                    <label>
                        Referred by Partner Organization
                        <br />
                        <Select
                            options={referrals}
                            placeholder="Select Referrals"
                            value={formSelectedReferrals}
                            onChange={handleReferralSelect}
                            isSearchable={true}
                            isMulti
                        />
                    </label>
                </div>
                <br />
                <label>
                    Sponsorship information
                    <br />
                    <textarea rows="5" cols="80"></textarea>
                </label>
                <br />
                <label>
                    Staff notes
                    <br />
                    <textarea rows="5" cols="80"></textarea>
                </label>
            </form>
        </div>
    );
};

export default Page3;
