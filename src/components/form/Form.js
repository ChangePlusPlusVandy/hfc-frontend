import React, { useState } from "react";

import "./Form.css";

const Form = () => {
    const [pageNum, setpageNum] = useState(0);

    const handlePageDecrement = () => {
        setpageNum((prev) => prev - 1);
    };

    const handlePageIncrement = () => {
        setpageNum((prev) => prev + 1);
    };

    return (
        <div className="form">
            <h1>Form</h1>
            
            <button onClick={handlePageDecrement}>Previous</button>

            <span>{pageNum}</span>
            <button onClick={handlePageIncrement}>Next</button>
        </div>
    );
};

export default Form;
