import React, { useState } from "react";

import "./Form.css";
import Page1 from "./Page1";

const NUM_PAGES = 5;

const Form = () => {
    const [pageNum, setpageNum] = useState(0);
    const handlePageDecrement = () => {
        setpageNum((prev) => prev - 1);
    };

    const handlePageIncrement = () => {
        setpageNum((prev) => prev + 1);
    };

    const [languages, setLanguages] = useState();
    const [nationalities, setNationalites] = useState();
    const [education, setEducation] = useState();

    return (
        <div className="form-container">
            <h1>Form</h1>
            <h4>Page Number: {pageNum}</h4>
            <div>PAGE CONTENT</div>
            <div className="button-container">
                { pageNum > 0 && 
                    <button onClick={handlePageDecrement}>Previous</button>
                }
                { pageNum < NUM_PAGES - 1 &&
                    <button onClick={handlePageIncrement}>Next</button>
                }
            </div>

            <div>
                {(() => {
                    if (pageNum === 1) {
                        return <Page1
                        formLanguages={languages} setFormLanguages={setLanguages}
                        formNationalities={nationalities} setFormNationalities={setNationalites}
                        formEducation={education} setFormEducation={setEducation}
                        />
                    }})()}
            </div>
        </div>
    );
};

export default Form;
