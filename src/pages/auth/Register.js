import React, { useState } from "react";
import "./Register.css";
import { auth } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
    const addUserToFb = async (uid, level = 0) => {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firebaseUID: uid,
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
            const res = await addUserToFb(userCrediential.user.uid);
            console.log(res);
        } catch (err) {
            console.log(err);
            console.log(err.message);
        }
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="form_container">
            <h1>Register</h1>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
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
