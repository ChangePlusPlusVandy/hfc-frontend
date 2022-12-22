import React from "react";
import Select from "react-select";

import "./Form.css";

const referrals = [
    { value: "reason1", label: "Reason 1" },
    { value: "reason2", label: "Reason 2" },
    { value: "reason3", label: "Reason 3" },
];

const Page3 = ({
    formSelectedReferrals,
    setFormSelectedReferrals,
    formSponsorInfo,
    setFormSponsorInfo,
}) => {
    const handleReferralSelect = (data) => {
        setFormSelectedReferrals(data);
    };

    const handleChangeSponsorInfo = (event) => {
        setFormSponsorInfo(event.target.value);
    };

    return (
        <div className="Page3">
            <h3> Basic info: Other </h3>
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
                    <textarea
                        rows="5"
                        cols="80"
                        onChange={handleChangeSponsorInfo}
                    />
                </label>
                <br />
                <label>
                    Staff notes
                    <br />
                    <textarea // FIXME? not sure which field corresponds to this in backend
                        rows="5"
                        cols="80"
                    ></textarea>
                </label>
            </form>
        </div>
    );
};

export default Page3;
