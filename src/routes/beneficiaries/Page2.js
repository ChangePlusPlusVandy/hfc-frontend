import React from "react";
// import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import "./BeneficiaryRegistration.css";

const needOpts = [
    { value: "need1", label: "need 1" },
    { value: "need2", label: "need 2" },
];

const interestOpts = [
    { value: "interest1", label: "interest 1" },
    { value: "interest2", label: "interest 2" },
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
