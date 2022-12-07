import React, { } from "react";
import Select from "react-select";
import {referrals} from "./Referrals.js"
import "./Form.css";


const Page3 = ({formSelectedReferrals, setFormSelectedReferrals}) =>{


    const handleReferralSelect = (data) =>{
        setFormSelectedReferrals(data); 
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
                            options={referrals}
                            placeholder="Select Referrals"
                            value={formSelectedReferrals}
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