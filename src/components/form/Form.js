import React, { useState, useEffect } from "react";
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


        // Displays what Reasons were selected
        const [selectedReasons, setSelectedReasons] = useState();
  
    
        // Displays what Programs were selected 
        const [selectedPrograms, setSelectedPrograms] = useState(); 
     
    
        // Save and render programs collection data as state 
        const [programs, setPrograms] = useState([{}]);
        useEffect(() => {
            const endpoint = "http://localhost:3000/programs"; // edit to programs 
            fetch(endpoint)
                .then((res)=>res.json())
                .then((data)=> setPrograms(data));
        }, []);
    
        // Display what Referal Orgs were Selected 
        const [selectedReferrals, setSelectedReferrals] = useState(); 
        


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
                    <Page2 
                        formSelectedReasons={selectedReasons} setFormSelectedReasons={setSelectedReasons}
                        formSelectedPrograms={selectedPrograms} setFormSelectedPrograms={setSelectedPrograms}
                        formPrograms={programs} setFormPrograms = {setPrograms}
                    />
                </div>

                <div>
                    <Page3 
                        formSelectedReferrals={selectedReferrals}
                        setFormSelectedReferrals={setSelectedReferrals}
                    />
                </div>
            </div>
        </div>
    );
};

export default Form;
