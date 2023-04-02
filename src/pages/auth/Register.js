import React, { useState } from "react";
import "./Register.css";
import { auth } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

const Register = () => {
    const navigate = useNavigate();

    const ERRORS = {
        "Firebase: Error (auth/email-already-in-use).":
            "This email is already in use",
        "Firebase: Error (auth/internal-error).":
            "Server error, please try again",
    };

    const checkInputs = () => {
        if (!isEmail(email)) {
            setError("Please enter a valid email");
            return false;
        }
        if (password != passwordConfirm) {
            setError("Passwords do not match.");
            return false;
        }
        if (!isStrongPassword(password)) {
            setError("Password must be at least 6 characters.");
            return false;
        }
        if (firstName.length == 0 || lastName.length == 0) {
            setError("Please enter valid name");
            return false;
        }
        return true;
    };

    function isEmail(email) {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    // function isStrongPassword(password) {
    //     const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(.{8,})$/;
    //     return passwordRegex.test(password);
    // }

    function isStrongPassword(password) {
        return password.length >= 6;
    }

    const addUserToMongo = async (
        firebaseUid,
        firstName,
        lastName,
        level = 0
    ) => {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firebaseUID: firebaseUid,
                firstName: firstName,
                lastName: lastName,
                level: parseInt(level),
                languages: languages.map((option) => option.value),
            }),
        });
        return response;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate Inputs
        if (!checkInputs()) {
            console.log("error");
            return;
        }
        try {
            // Create Firebase User
            const userCrediential = await fetch(
                "http://localhost:3000/users/firebase",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                }
            );
            const user = await userCrediential.json();
            // Create MongoDB User
            try {
                const res = await addUserToMongo(
                    user.uid,
                    firstName,
                    lastName,
                    level
                );
                console.log(res);
            } catch (err) {
                // If MongoDB user creation failed, delete Firebase user to keep consistency
                console.log(
                    "Error adding user to MongoBD, deleting from Firebase"
                );
                console.log(err);
                console.log(err.message);
                deleteUser(userCrediential.user).then(() =>
                    console.log("User deleted from Firebase")
                );
            }
        } catch (err) {
            // Show error message
            console.log(err);
            console.log(err.message);
            if (err.message in ERRORS) {
                setError(ERRORS[err.message]);
            }
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError("");
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        setError("");
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        setError("");
    };

    const handleLevelChange = (e) => {
        setLevel(e.target.value);
        setError("");
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError("");
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
        setError("");
    };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [level, setLevel] = useState(0);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [languages, setLanguages] = useState([]);

    const handleLanguageSelect = (data) => {
        setLanguages(data);
    };

    return (
        <div className="form_container">
            <h1>Register User</h1>
            {error && error.length ? <h1>{error}</h1> : ""}
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <input
                    onChange={handleFirstNameChange}
                    value={firstName}
                    type="text"
                    placeholder="First Name"
                />
                <input
                    onChange={handleLastNameChange}
                    value={lastName}
                    type="text"
                    placeholder="Last Name"
                />
                <input
                    onChange={handleEmailChange}
                    value={email}
                    type="text"
                    placeholder="Email"
                />
                Fluent Languages
                <CreatableSelect
                    options={languageOpts}
                    value={languages}
                    onChange={handleLanguageSelect}
                    // defaultValue={[languageOptions[0], languageOptions[1]]}
                    isMulti
                    name="languages"
                    className="creatable-multi-select"
                    classNamePrefix="select"
                />
                Level
                <input
                    onChange={handleLevelChange}
                    value={level}
                    type="number"
                    placeholder="Level"
                />
                <input
                    onChange={handlePasswordChange}
                    value={password}
                    type="password"
                    placeholder="Password"
                />
                <input
                    onChange={handlePasswordConfirmChange}
                    value={passwordConfirm}
                    type="password"
                    placeholder="Confirm Password"
                />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;

const languageOpts = [
    { value: "english", label: "English" },
    { value: "mandarin", label: "Mandarin" },
    { value: "french", label: "French" },
];
