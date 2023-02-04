import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCreds = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(userCreds.user);
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
            console.log(err.message);
        }
    };
    return (
        <div className="form_container">
            <h1 className="title">Login</h1>
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
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;
