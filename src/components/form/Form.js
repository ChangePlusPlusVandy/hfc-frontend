import React, { useState } from "react";

import "./Form.css";
import Page0 from './Page0';

const NUM_PAGES = 5;

const Form = () => {
    
    const [pageNum, setpageNum] = useState(0);
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
                <Page0 
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
            </div>
        </div>
    );
};

export default Form;
