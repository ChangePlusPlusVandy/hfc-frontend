import React, { useState } from "react";
import "./Register.css";
import { auth } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

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
        }
    };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="form_container">
            <h1>Register</h1>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    placeholder="First Name"
                />
                <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    placeholder="Last Name"
                />
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder="Email"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Password"
                />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;
