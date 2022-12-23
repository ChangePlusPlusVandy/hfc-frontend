import React from "react";
// import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import "./Form.css";

const Page2 = ({
    formJoinDate,
    setFormJoinDate,
    // formSelectedPrograms,
    // setFormSelectedPrograms,
    formReason,
    setFormReason,
    // formPrograms,
    // setFormPrograms,
    formSelectedNeeds,
    setFormSelectedNeeds,
    formSelectedInterests,
    setFormSelectedInterest,
}) => {
    // const programOptions = [];
    // formPrograms.forEach((program) =>
    //     programOptions.push({ value: program.name, label: program.name })
    // );

    const handleChangeReason = (event) => {
        setFormReason(event.target.value);
    };

    // const handleProgramSelect = (data) => {
    //     setFormSelectedPrograms(data);
    // };

    const handleNeedSelect = (data) => {
        setFormSelectedNeeds(data);
    };

    const handleInterestSelect = (data) => {
        setFormSelectedInterest(data);
    };

    const handleChangeJoinDate = (event) => {
        setFormJoinDate(new Date(event.target.value));
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
                    />
                </label>
                <br />

                {/* <div className="dropdown-container">
                    <label>
                        Registrations
                        <br />
                        <Select
                            options={programOptions}
                            placeholder="Select registrations"
                            value={formSelectedPrograms}
                            onChange={handleProgramSelect}
                            isSearchable={true}
                            isMulti
                        />
                    </label>
                </div> */}
                <br />

                <label>
                    Needs
                    <CreatableSelect
                        options={needOpts}
                        value={formSelectedNeeds}
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
                        value={formSelectedInterests}
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

const needOpts = [
    { value: "need1", label: "need 1" },
    { value: "need2", label: "need 2" },
];

const interestOpts = [
    { value: "interest1", label: "interest 1" },
    { value: "interest2", label: "interest 2" },
];

export default Page2;
