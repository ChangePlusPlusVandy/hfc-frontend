import React, { useState, useEffect } from "react";
import Select from "react-select"; // For Dropdown Menu Functionality 
import {reasons} from "./Reasons.js"  // Render an exported array, not fetching from any endpoint 
import "./Form.css";

const Page2 = () =>{

    // Displays what Reasons were selected
    const [selectedReasons, setSelectedReasons] = useState();
    const handleReasonSelect = (data) =>{
        setSelectedReasons(data);
    };

    // Displays what Programs were selected 
    const [selectedPrograms, setSelectedPrograms] = useState(); 
    const handleProgramSelect = (data) =>{
        setSelectedPrograms(data); 
    }

    // Save and render programs collection data as state 
    const [programs, setPrograms] = useState([{}]);
    useEffect(() => {
        const endpoint = "http://localhost:3000/programs"; // edit to programs 
        fetch(endpoint)
            .then((res)=>res.json())
            .then((data)=> setPrograms(data));
    }, []);


    const programOptions = [];
    programs.forEach(program=> programOptions.push({value: program.name, label: program.name})
    );


    // TODO consider adding an option where you can create new options when typing out Reasons isntead of relying on hard-coded ones 

    return (
        <div className="Page2">
        <h1> Basic info: Check and Fill</h1>
            <form> 
                <label>
                    First date of visit
                    <br />
                    <input
                        name="joinDate"
                        type="date"
                    />
                </label>

                <br />

                <div className="dropdown-container">
                    <label>
                        Reason for visit
                        <br />
                        <Select
                            options={reasons}
                            placeholder="Select reasons"
                            value={selectedReasons}
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
                            value={selectedPrograms}
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

