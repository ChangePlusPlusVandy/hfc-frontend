import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const ERRORS = {
        "Firebase: Error (auth/wrong-password).":
            "Incorrect username or password",
        "Firebase: Error (auth/user-not-found).":
            "Incorrect username or password",
        "Firebase: Error (auth/internal-error).":
            "Server error, please try again",
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
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
            if (err.message in ERRORS) {
                setError(ERRORS[err.message]);
            }
        }
    };
    return (
        <div className="form_container">
            <h1 className="title">Login</h1>
            {error && error.length ? <h1>{error}</h1> : ""}
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
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
                <input type="submit" value="Login" />
            </form>
            <h4 onClick={(e) => navigate("/register")}>
                Don't have an account? Create one here!
            </h4>
        </div>
    );
};

export default Login;
