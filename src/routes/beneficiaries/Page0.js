import React from "react";
import CreatableSelect from "react-select/creatable";

import "./BeneficiaryRegistration.css";

const Page0 = ({
    formFirstName,
    setFormFirstName,
    formLastName,
    setFormLastName,
    formSelectedGender,
    setFormSelectedGender,
    formPhoneNumber,
    setFormPhoneNumber,
    formEmail,
    setFormEmail,
    formAddress,
    setFormAddress,
    formCity,
    setFormCity,
    formState,
    setFormState,
    formZipcode,
    setFormZipcode,
    formAge,
    setFormAge,
    formBirthDate,
    setFormBirthDate,
}) => {
    const handleChangeFirstName = (event) => {
        setFormFirstName(event.target.value);
        console.log(formFirstName);
    };

    const handleChangeLastName = (event) => {
        setFormLastName(event.target.value);
    };

    const handleGenderSelect = (data) => {
        setFormSelectedGender(data);
    };

    const handleChangePhoneNumber = (event) => {
        setFormPhoneNumber(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setFormEmail(event.target.value);
    };

    const handleChangeAddress = (event) => {
        setFormAddress(event.target.value);
    };

    const handleChangeCity = (event) => {
        setFormCity(event.target.value);
    };

    const handleChangeState = (event) => {
        setFormState(event.target.value);
    };

    const handleChangeZipcode = (event) => {
        setFormZipcode(event.target.value);
    };

    const handleChangeBirthDate = (event) => {
        const birthDate = new Date(event.target.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (
            month < 0 ||
            (month === 0 && today.getDate() < birthDate.getDate())
        ) {
            age -= 1;
        }
        setFormBirthDate(event.target.value);
        setFormAge(age);
    };

    return (
        <div className="form-container">
            <h3> Basic Info: Fill In</h3>
            <p> Please Upload a Profile Photo of the User </p>

            {/* TO DO: must find out how to support this image type and how to best store it */}
            <input type="image" id="profile-photo" />
            <br></br>

            <br></br>
            <p> Basic Information </p>
            <input
                type="text"
                id="first-name"
                onChange={handleChangeFirstName}
                value={formFirstName}
                placeholder="First Name *"
            />
            <input
                type="text"
                id="last-name"
                onChange={handleChangeLastName}
                value={formLastName}
                placeholder="Last Name *"
            />
            <br></br>

            <br></br>
            <label>
                Gender *
                <CreatableSelect
                    options={genderOpts}
                    value={formSelectedGender}
                    onChange={handleGenderSelect}
                    name="gender"
                    className="creatable-single-select"
                    classNamePrefix="select"
                />
            </label>
            <br></br>

            <p>Birth Date *</p>
            <input
                type="date"
                id="birthdate"
                onChange={handleChangeBirthDate}
                value={formBirthDate}
            />

            <p> Age: {formAge} </p>
            <br></br>

            <p>Contact Information</p>
            <input
                type="number"
                onChange={handleChangePhoneNumber}
                id="phone-number"
                placeholder="Phone Number (XXXXXXXXX)"
                value={formPhoneNumber}
            />
            <input
                type="email"
                onChange={handleChangeEmail}
                id="email-address"
                placeholder="Email Address"
                value={formEmail}
            />
            <br></br>

            <br></br>
            <p>Address</p>
            <input
                type="text"
                onChange={handleChangeAddress}
                id="address"
                placeholder="Street Address"
                value={formAddress}
            />
            <br></br>
            <input
                type="text"
                onChange={handleChangeCity}
                id="city"
                placeholder="City"
                value={formCity}
            />
            <input
                type="text"
                onChange={handleChangeState}
                id="state"
                placeholder="State"
                value={formState}
            />
            <br></br>
            <input
                type="number"
                onChange={handleChangeZipcode}
                id="zip-code"
                placeholder="Zip Code"
                value={formZipcode}
            />
        </div>
    );
};

const genderOpts = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
];

export default Page0;