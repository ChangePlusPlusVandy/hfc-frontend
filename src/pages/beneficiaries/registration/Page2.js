import React from "react";
// import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import "./BeneficiaryRegistration.css";

const needOpts = [
    { value: "Need 1", label: "Need 1" },
    { value: "Need 2", label: "Need 2" },
];

const interestOpts = [
    { value: "Computers", label: "Computers" },
    { value: "English", label: "Spoken English" },
    { value: "Literacy", label: "Literacy" },
    { value: "Math", label: "Math" },
    { value: "Bengali", label: "Bengali" },
    { value: "Arts", label: "Arts" },
    { value: "Bakery", label: "Bakery/Cafe" },
    { value: "Counseling", label: "Counseling" },
    // TODO: change counseling label to whatever they asked
];

const Page2 = ({
    joinDate,
    setJoinDate,
    reason,
    setReason,
    needs,
    setNeeds,
    interests,
    setInterests,
}) => {
    const handleChangeReason = (event) => {
        setReason(event.target.value);
    };

    const handleNeedSelect = (data) => {
        setNeeds(data);
    };

    const handleInterestSelect = (data) => {
        setInterests(data);
    };

    const handleChangeJoinDate = (event) => {
        setJoinDate(event.target.value);
    };

    return (
        <div className="page-content">
            <div className="section-container">
                <label className="section-label">Join Date *</label>
                <input
                    type="date"
                    id="join-date"
                    value={joinDate}
                    onChange={handleChangeJoinDate}
                />
            </div>
            <br />
            <div className="section-container">
                <label className="section-label">Reason for Visit</label>
                <textarea
                    onChange={handleChangeReason}
                    value={reason}
                    placeholder="Start here..."
                />
            </div>
            <br />
            <div className="section-container">
                <label className="section-label">Needs</label>
                <CreatableSelect
                    options={needOpts}
                    value={needs}
                    onChange={handleNeedSelect}
                    isMulti
                    name="needs"
                    className="creatable-multi-select"
                    classNamePrefix="select"
                />
                <br />
            </div>
            <div className="section-container">
                <label className="section-label">Interests</label>
                <CreatableSelect
                    options={interestOpts}
                    value={interests}
                    onChange={handleInterestSelect}
                    isMulti
                    name="interests"
                    className="creatable-multi-select"
                    classNamePrefix="select"
                />
            </div>
        </div>
    );
};

export default Page2;
