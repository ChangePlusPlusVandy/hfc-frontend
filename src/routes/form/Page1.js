import React from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

import "./Page1.css";

const Page1 = ({
    formLanguages,
    setFormLanguages,
    formNationalities,
    setFormNationalities,
    formEducation,
    setFormEducation,
}) => {
    const handleLanguageSelect = (data) => {
        setFormLanguages(data);
    };

    const handleNationalitySelect = (data) => {
        setFormNationalities(data);
    };

    const handleEducationSelect = (data) => {
        setFormEducation(data);
    };

    return (
        <div className="page1-container">
            <h3>Basic Info</h3>
            <div className="wrapper">
                <label>
                    Fluent Languages
                    <CreatableSelect
                        options={languageOpts}
                        value={formLanguages}
                        onChange={handleLanguageSelect}
                        // defaultValue={[languageOptions[0], languageOptions[1]]}
                        isMulti
                        name="languages"
                        className="creatable-multi-select"
                        classNamePrefix="select"
                    />
                </label>

                <label>
                    Nationality
                    <CreatableSelect
                        options={nationalityOpts}
                        value={formNationalities}
                        onChange={handleNationalitySelect}
                        isMulti
                        name="nationality"
                        className="creatable-multi-select"
                        classNamePrefix="select"
                    />
                </label>

                <label>
                    Education Level
                    <Select
                        options={eduOpts}
                        value={formEducation}
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
    { value: "middle", label: "Midddle School" },
    { value: "secondary", label: "Secondary School" },
    { value: "postSecondary", label: "Post Secondary" },
];

export default Page1;
