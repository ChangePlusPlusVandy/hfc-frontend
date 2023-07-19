import React, { useState } from "react";
import "./Register.css";
import { deleteUser } from "firebase/auth";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";

const Register = () => {
    // TODO: use codes, add useEffect to reset errors dependent on all input states
    const API_URL = process.env.API_URL;
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
        const response = await fetch(API_URL + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
            },
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
            const userCrediential = await fetch(API_URL + "/users/firebase", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "auth"
                    )}`,
                },
                body: JSON.stringify({
                    email: email,
                    pass: password,
                }),
            });
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

    const cancelRegistration = () => {
        navigate("../");
    };
    return (
        <div className="register-user-container">
            <h1>Register a new user</h1>
            {error && error.length ? <p>{error}</p> : ""}
            <form className="form" onSubmit={handleSubmit}>
                <div>
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
                </div>
                <div>
                    <input
                        onChange={handleEmailChange}
                        value={email}
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label>Fluent Languages</label>
                    <CreatableSelect
                        options={languageOpts}
                        value={languages}
                        onChange={handleLanguageSelect}
                        // defaultValue={[languageOptions[0], languageOptions[1]]}
                        isMulti
                        className="creatable-multi-select"
                        classNamePrefix="select"
                    />
                </div>
                <div>
                    <label htmlFor="level">Access Level</label>
                    <input
                        onChange={handleLevelChange}
                        value={level}
                        type="number"
                        id="user-level"
                        placeholder="Level"
                    />
                </div>
                <div>
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
                </div>
                <button type="submit">Register</button>
                <button type="submit" onClick={cancelRegistration}>
                    Cancel
                </button>
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
