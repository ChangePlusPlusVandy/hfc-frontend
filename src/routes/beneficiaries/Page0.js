import React from "react";
import CreatableSelect from "react-select/creatable";

import "./BeneficiaryRegistration.css";

const Page0 = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    gender,
    setGender,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    address,
    setAddress,
    age,
    setAge,
    birthDate,
    setBirthDate,
}) => {
    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
        console.log(firstName);
    };

    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    };

    const handleGenderSelect = (data) => {
        setGender(data);
    };

    const handleChangePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
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
        setBirthDate(event.target.value);
        setAge(age);
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
                value={firstName}
                placeholder="First Name *"
            />
            <input
                type="text"
                id="last-name"
                onChange={handleChangeLastName}
                value={lastName}
                placeholder="Last Name *"
            />
            <br></br>

            <br></br>
            <label>
                Gender *
                <CreatableSelect
                    options={genderOpts}
                    value={gender}
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
                value={birthDate}
            />

            <p> Age: {age} </p>
            <br></br>

            <p>Contact Information</p>
            <input
                type="number"
                onChange={handleChangePhoneNumber}
                id="phone-number"
                placeholder="Phone Number"
                value={phoneNumber}
            />
            <input
                type="email"
                onChange={handleChangeEmail}
                id="email-address"
                placeholder="Email Address"
                value={email}
            />
            <br></br>

            <br></br>
            <p>Address</p>
            <input
                type="text"
                onChange={handleChangeAddress}
                id="address"
                placeholder="Address"
                value={address}
            />
            <br></br>
        </div>
    );
};

const genderOpts = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
];

export default Page0;
