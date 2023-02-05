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

export default Page1;
