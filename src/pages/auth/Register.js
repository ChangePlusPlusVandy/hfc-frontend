import React, { useState } from "react";
import "./Register.css";
import { auth } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        try {
            const userCrediential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(userCrediential.user);
        } catch (err) {
            console.log(err);
            console.log(err.message);
        }
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="form_container">
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

export default Register;
