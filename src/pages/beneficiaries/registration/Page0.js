import React from "react";

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
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleChangeBirthDate = (event) => {
        const value = event.target.value;

        // If the user clears the input, we need to set the age to an empty string
        if (value === "") {
            setAge("");
        } else {
            // Otherwise, we need to calculate the age
            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();
            if (
                month < 0 ||
                (month === 0 && today.getDate() < birthDate.getDate())
            ) {
                age -= 1;
            }
            setAge(age);
        }

        setBirthDate(value);
    };

    return (
        <div className="page-content">
            <br />
            <div className="section-container">
                <label className="section-label">Basic Information</label>
                <div className="basic-info-input-container">
                    <div className="name-input-container">
                        <input
                            type="text"
                            id="first-name"
                            onChange={handleFirstNameChange}
                            value={firstName}
                            placeholder="First Name *"
                        />
                        <input
                            type="text"
                            id="last-name"
                            onChange={handleLastNameChange}
                            value={lastName}
                            placeholder="Last Name *"
                        />
                    </div>
                    <div className="birthdate-input-container">
                        <label className="birthdate" htmlFor="birthdate">
                            Birthday:
                        </label>
                        <input
                            type="date"
                            id="birthdate"
                            onChange={handleChangeBirthDate}
                            value={birthDate}
                            placeholder="Birth Date *"
                        />
                        {age !== "" && (
                            <div className="age">({age} years old)</div>
                        )}
                    </div>
                    <div className="gender-input-container">
                        <label>
                            <input
                                type="checkbox"
                                id="female"
                                name="gender"
                                checked={gender === "female"}
                                value="female"
                                onChange={handleGenderChange}
                            />
                            Female
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="male"
                                name="gender"
                                checked={gender === "male"}
                                value="male"
                                onChange={handleGenderChange}
                            />
                            Male
                        </label>
                        <label>
                            Other:{" "}
                            <input
                                type="text"
                                id="other"
                                name="gender"
                                value={gender}
                                onChange={handleGenderChange}
                            />
                        </label>
                    </div>
                </div>
            </div>
            <br />
            <div className="section-container">
                <label className="section-label">Contact</label>
                <input
                    type="text"
                    onChange={handlePhoneNumberChange}
                    id="phone-number"
                    placeholder="Phone number"
                    value={phoneNumber}
                />
                <input
                    type="email"
                    onChange={handleEmailChange}
                    id="email-address"
                    placeholder="Email address"
                    value={email}
                />
            </div>
            <br />
            <div className="section-container">
                <label className="section-label">Address</label>
                <input
                    type="text"
                    onChange={handleAddressChange}
                    id="street-address"
                    placeholder="Street address"
                    value={address}
                />
            </div>
        </div>
    );
};

export default Page0;
