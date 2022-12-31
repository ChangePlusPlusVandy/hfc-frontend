import React from "react";

//TO DO: add gender and interests

const Page4 = ({
    formFirstName,
    formLastName,
    formAge,
    formEmail,
    formPhoneNumber, 
    formAddress, 
    formCity, 
    formState, 
    formZipcode, 
    formLanguages,
    formNationalities,
    formEducation,
    formSelectedReasons,
    formSelectedPrograms,
    formSelectedReferrals
}) => {
    return (
        <div>
            <h1>Review</h1>
            {/* do we want it to say First Name: Isa Last Name: Dominguez or just Isa Dominguez*/}
            <h5> {formFirstName} {formLastName} </h5> 
            <h5> Age: {formAge} </h5>
            <h5> Gender: </h5> {/* TO DO: add gender when we have it*/}
            <h5> Contact: {formEmail} {formPhoneNumber} </h5>
            <h5> Address: {formAddress}, {formCity}, {formState} {formZipcode} </h5>
            <h5> Languages: {formLanguages} </h5>
            <h5> Nationalities: {formNationalities} </h5>
            <h5> Education: {formEducation} </h5>
            <h5> Reasons For Visit: {formSelectedReasons} </h5>
            <h5> Registrations: {formSelectedPrograms} </h5>
            <h5> Interests: </h5> {/* TO DO: add interests when we have it*/}
            <h5> Referrals: {formSelectedReferrals} </h5>
        </div>
    );
};

export default Page4;
