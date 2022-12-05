import React, { useState, useEffect } from "react";
import Select from "react-select";
import {Referrals} from "./Referrals.js"
import "./Form.css";


const Page3 = () =>{

    // Display what Referal Orgs were Selected 
    const [selectedReferrals, setSelectedReferrals] = useState(); 
    const handleReferralSelect = (data) =>{
        setSelectedReferrals(data); 
    }


    return(
        <div className="Page3">
        <h1> Basic info: Other </h1>
            <form>
                <div className="dropdown-container">
                    <label>
                        Referred by Partner Organization
                        <br />
                        <Select
                            options={Referrals}
                            placeholder="Select Referrals"
                            value={selectedReferrals}
                            onChange={handleReferralSelect}
                            isSearchable={true}
                            isMulti
                        />
                     </label>
                </div>
                <br />
                <label>
                    Sponsorship information
                    <br />
                    <textarea rows="5" cols="80"></textarea>
                </label>
                <br />
                <label>
                    Staff notes 
                    <br />
                    <textarea rows="5" cols="80"></textarea>
                </label>

            </form>
        
        </div>
    ); 
}; 

export default Page3; 