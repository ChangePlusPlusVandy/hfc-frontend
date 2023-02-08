import React from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

import "./BeneficiaryRegistration.css";

const languageOpts = [
    { value: "english", label: "English" },
    { value: "mandarin", label: "Mandarin" },
    { value: "french", label: "French" },
];

const nationalityOpts = [
    { value: "canada", label: "Canada" },
    { value: "india", label: "India" },
    { value: "usa", label: "United States" },
    { value: "nepal", label: "Nepal" },
];

const eduOpts = [
    { value: "elementary", label: "Elementary School" },
    { value: "middle", label: "Middle School" },
    { value: "secondary", label: "Secondary School" },
    { value: "postSecondary", label: "Post Secondary" },
];

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

    return (
        <div className="page-content">
            <div className="section-container">
                <label className="section-label">Fluent Languages</label>
                <CreatableSelect
                    options={languageOpts}
                    value={languages}
                    onChange={handleLanguageSelect}
                    isMulti
                    name="languages"
                    className="creatable-multi-select"
                    classNamePrefix="select"
                />
            </div>
            <br />
            <div className="section-container">
                <label className="section-label">Nationality</label>
                <CreatableSelect
                    options={nationalityOpts}
                    value={nationalities}
                    onChange={handleNationalitySelect}
                    isMulti
                    name="nationality"
                    className="creatable-multi-select"
                    classNamePrefix="select"
                />
                <br />
            </div>
            <div className="section-container">
                <label className="section-label">Education Level</label>
                <Select
                    options={eduOpts}
                    value={education}
                    onChange={handleEducationSelect}
                    name="education"
                    className="single-select"
                    classNamePrefix="select"
                />
            </div>
        </div>
    );
};

export default Page1;
