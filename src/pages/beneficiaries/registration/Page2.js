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
        setJoinDate(new Date(event.target.value));
    };

    return (
        <div className="Page2">
            <h3> Basic info: Check and Fill</h3>
            <form>
                <label>
                    First date of visit *
                    <input
                        type="date"
                        id="joinDate"
                        onChange={handleChangeJoinDate}
                    />
                </label>
                <br />
                <br />

                <label>
                    Reason for this visit
                    <br />
                    <textarea
                        rows="5"
                        cols="80"
                        onChange={handleChangeReason}
                        value={reason}
                    />
                </label>
                <br />

                <label>
                    Needs
                    <CreatableSelect
                        options={needOpts}
                        value={needs}
                        onChange={handleNeedSelect}
                        isMulti
                        name="needs"
                        className="creatable-multi-select"
                        classNamePrefix="select"
                    />
                </label>
                <br />

                <label>
                    Interests
                    <CreatableSelect
                        options={interestOpts}
                        value={interests}
                        onChange={handleInterestSelect}
                        isMulti
                        name="interests"
                        className="creatable-multi-select"
                        classNamePrefix="select"
                    />
                </label>
            </form>
        </div>
    );
};

export default Page2;
