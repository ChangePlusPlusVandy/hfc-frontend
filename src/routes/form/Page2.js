import React from "react";
import Select from "react-select"; // For Dropdown Menu Functionality

import "./BeneficiaryRegistration.css";

// Render an exported array, not fetching from any endpoint
const reasons = [
    { value: "reason1", label: "Reason 1" },
    { value: "reason2", label: "Reason 2" },
    { value: "reason3", label: "Reason 3" },
];

const Page2 = ({
    formSelectedPrograms,
    formSelectedReasons,
    setFormSelectedPrograms,
    setFormSelectedReasons,
    formPrograms,
    setFormPrograms,
}) => {
    // TODO consider adding an option where you can create new options when typing out Reasons isntead of relying on hard-coded ones

    const programOptions = [];
    formPrograms.forEach((program) =>
        programOptions.push({ value: program.name, label: program.name })
    );

    const handleReasonSelect = (data) => {
        setFormSelectedReasons(data);
    };

    const handleProgramSelect = (data) => {
        setFormSelectedPrograms(data);
    };

    return (
        <div className="Page2">
            <h1> Basic info: Check and Fill</h1>
            <form>
                <label>
                    First date of visit
                    <br />
                    <input name="joinDate" type="date" />
                </label>

                <br />

                <div className="dropdown-container">
                    <label>
                        Reason for visit
                        <br />
                        <Select
                            options={reasons}
                            placeholder="Select reasons"
                            value={formSelectedReasons}
                            onChange={handleReasonSelect}
                            isSearchable={true}
                            isMulti
                        />
                    </label>
                </div>

                <div className="dropdown-container">
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
                </div>

                <label>
                    Other interests or needs
                    <br />
                    <textarea rows="5" cols="80"></textarea>
                </label>
            </form>
        </div>
    );
};

export default Page2;
