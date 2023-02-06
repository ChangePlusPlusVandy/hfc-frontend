import React, { useState } from "react";
import "./Register.css";
import { auth } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const ERRORS = {
        "Firebase: Error (auth/email-already-in-use).":
            "This email is already in use",
    };

    const checkInputs = () => {
        if (!isEmail(email)) {
            setError("Please enter a valid email");
            return false;
        }
        if (password != passwordConfirm) {
            setError("Passwords do not match.")
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
    //     const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    //     return strongPasswordRegex.test(password);
    // }
    function isStrongPassword(password) {
        return password.length >= 6;
    }

    const addUserToMongo = async (uid, fn, ln, level = 0) => {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firebaseUID: uid,
                firstName: fn,
                lastName: ln,
                level: parseInt(level),
            }),
        });
        return response;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkInputs()) {
            console.log("error");
            return;
        }
        console.log(email, password);
        try {
            const userCrediential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const res = await addUserToMongo(
                userCrediential.user.uid,
                firstName,
                lastName
            );
            console.log(res);
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
            console.log(err.message);
            if (err.message in ERRORS) {
                setError(ERRORS[err.message]);
            }
        }
    };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error,setError] = useState('')

    return (
        <div className="form_container">
            <h1>Register</h1>
            {error && error.length ? <h1>{error}</h1> : ""}
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <input
                    onChange={(e) => {
                        setFirstName(e.target.value);
                        setError("");
                    }}
                    value={firstName}
                    type="text"
                    placeholder="First Name"
                />
                <input
                    onChange={(e) => {
                        setLastName(e.target.value);
                        setError("");
                    }}
                    value={lastName}
                    type="text"
                    placeholder="Last Name"
                />
                <input
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                    value={email}
                    type="text"
                    placeholder="Email"
                />
                <input
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }}
                    value={password}
                    type="password"
                    placeholder="Password"
                />
                <input
                    onChange={(e) => {
                        setPasswordConfirm(e.target.value)
                        setError('')}}
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
