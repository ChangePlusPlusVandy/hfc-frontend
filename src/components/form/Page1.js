import React, {useState} from "react";
import CreatableSelect from 'react-select/creatable';
import Select from "react-select";

import "./Page1.css";

const Page1 = () => {
   
    const [selectedLanguages, setSelectedLanguages] = useState();
    const handleLanguageSelect = (data) =>{
        setSelectedLanguages(data);
    };

    const [selectedNationalities, setSelectedNationalities] = useState(); 
    const handleNationalitySelect = (data) =>{
        setSelectedNationalities(data); 
    }

    const [selectedEducation, setSelectedEducation] = useState(); 
    const handleEducationSelect = (data) =>{
        setSelectedEducation(data); 
    }
    
    return (
        <div className="page1-container">
            <h1>Basic Info</h1>
            <div className="wrapper">
                <label>Fluent Languages
                    <CreatableSelect 
                    options={languageOpts}
                    value={selectedLanguages}
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
                    value={selectedNationalities}
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
                    value={selectedEducation}
                    onChange={handleEducationSelect}
                    name="education"
                    className="creatable-multi-select"
                    classNamePrefix="select"
                    />
                </label>
            </div>
        </div>
    );
};

const languageOpts = [
    {value: 'english', label: 'English'},
    {value: 'mandarin', label: 'Mandarin'},
    {value: 'french', label: 'French'}

]

const nationalityOpts = [
    {value: 'canada', label: 'Canada'},
    {value: 'india', label: 'India'},
    {value: 'usa', label: 'United States'},
    {value: 'nepal', label: 'Nepal'}

]

const eduOpts = [
    {value: 'elementary', label: 'Elementary School'},
    {value: 'middle', label: 'Midddle School'},
    {value: 'secondary', label: 'Secondary School'},
    {value: 'postSecondary', label: 'Post Secondary'}

]

export default Page1;
