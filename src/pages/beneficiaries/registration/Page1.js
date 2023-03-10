import React from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

import "./BeneficiaryRegistration.css";

const Page1 = ({
    languages,
    setLanguages,
    nationalities,
    setNationalities,
    education,
    setEducation,
}) => {
    const handleLanguageSelect = (data) => {
        setLanguages(data);
    };

    const handleNationalitySelect = (data) => {
        setNationalities(data);
    };

    const handleEducationSelect = (data) => {
        setEducation(data);
    };

    console.log(languages);
    return (
        <div className="page1-container">
            <h3>Basic Info</h3>
            <div className="wrapper">
                <label>
                    Fluent Languages
                    <CreatableSelect
                        options={languageOpts}
                        value={languages}
                        onChange={handleLanguageSelect}
                        // defaultValue={[languageOptions[0], languageOptions[1]]}
                        isMulti
                        name="languages"
                        className="creatable-multi-select"
                        classNamePrefix="select"
                    />
                </label>
                <br />

                <label>
                    Nationality
                    <CreatableSelect
                        options={nationalityOpts}
                        value={nationalities}
                        onChange={handleNationalitySelect}
                        isMulti
                        name="nationality"
                        className="creatable-multi-select"
                        classNamePrefix="select"
                    />
                </label>
                <br />

                <label>
                    Education Level
                    <Select
                        options={eduOpts}
                        value={education}
                        onChange={handleEducationSelect}
                        name="education"
                        className="single-select"
                        classNamePrefix="select"
                    />
                </label>
            </div>
        </div>
    );
};

const languageOpts = [
    { value: "English", label: "English" },
    { value: "Mandarin", label: "Mandarin" },
    { value: "French", label: "French" },
];

const nationalityOpts = [
    { value: "Canada", label: "Canada" },
    { value: "India", label: "India" },
    { value: "United States", label: "United States" },
    { value: "Nepal", label: "Nepal" },
];

const eduOpts = [
    { value: "Elementary", label: "Elementary School" },
    { value: "Middle", label: "Middle School" },
    { value: "Secondary", label: "Secondary School" },
    { value: "Post Secondary", label: "Post Secondary" },
];

export default Page1;
