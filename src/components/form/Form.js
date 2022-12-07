import React, { useState, useEffect } from "react";
import "./Form.css";
import Page2 from "./Page2"; 
import Page3 from "./Page3";
import Page0 from './Page0';
import ProgressBar from "./ProgressBar";

const NUM_PAGES = 5;

const Form = () => {
    const [pageNum, setpageNum] = useState(0); // this is our state 

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [age, setAge] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
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
            <div>
                <ProgressBar bgcolor={"#2680AF"} completed={((pageNum)/5)*100}/>
            </div>
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
            <div>
                {(() => {
                    if (pageNum === 0) {
                        return <Page0 
                        formFirstName={firstName} setFormFirstName={setFirstName}
                        formLastName={lastName} setFormLastName={setLastName}
                        formPhoneNumber={phoneNumber} setFormPhoneNumber={setPhoneNumber}
                        formEmail={email} setFormEmail={setEmail}
                        formAddress={address} setFormAddress={setAddress}
                        formCity={city} setFormCity={setCity}
                        formState={state} setFormState={setState}
                        formZipcode={zipcode} setFormZipcode={setZipcode}
                        formAge={age} setFormAge={setAge}
                        formBirthDate={birthDate} setFormBirthDate={setBirthDate}
                        />
                    } 
                })()}
            </div>
        </div>
    );
};

export default Form;

/*
else if (pageNum === 1) {
    return <Page1/>
} else if (pageNum === 2) {
    return <Page2/>
} else if (pageNum === 3) {
    return <Page3/>
} else if (pageNum === 4) {
    return <Page4/>
}
*/
