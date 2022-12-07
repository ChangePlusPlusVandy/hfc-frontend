import React, { useState } from "react";
import "./Form.css";
import Page2 from "./Page2"; 
import Page3 from "./Page3";

const NUM_PAGES = 5;

const Form = () => {
    const [pageNum, setpageNum] = useState(0); // this is our state 

    const handlePageDecrement = () => {
        setpageNum((prev) => prev - 1);
    };

    const handlePageIncrement = () => {
        setpageNum((prev) => prev + 1);
    };

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

                <div>
                    <Page2 />
                </div>

                {/* <div>
                    <Page3 />
                </div> */}
            </div>
        </div>
    );
};

export default Form;
