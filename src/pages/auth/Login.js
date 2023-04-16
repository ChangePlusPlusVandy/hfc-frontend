import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import HFCDesign from "../../assets/images/hfc-design-1.png";

const ERRORS = {
    // use codes instead
    "Firebase: Error (auth/wrong-password).": "Incorrect username or password",
    "Firebase: Error (auth/user-not-found).": "Incorrect username or password",
    "Firebase: Error (auth/internal-error).": "Server error, please try again",
};

// TODO: npm uninstall react-icons
const Login = () => {
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

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError("");
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError("");
    };

    return (
        <div className="login-container">
            <div className="login-container-left">
                <img className="logo" src={HFCDesign} />
            </div>
            <div className="right">
                {error && error.length ? <h1>{error}</h1> : ""}
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="title">Logging you in 🫶🏽</div>
                    <input
                        onChange={handleEmailChange}
                        value={email}
                        type="text"
                        placeholder="Email"
                    />
                    <input
                        onChange={handlePasswordChange}
                        value={password}
                        type="password"
                        placeholder="Password"
                    />
                    <div
                        onClick={(e) => {
                            navigate("../forgot-password");
                        }}
                        className="forgot-password"
                    >
                        Forgot password?
                    </div>
                    {/* <div className="alt-login">Or log in with</div>
                    <hr className="divider" />
                    <div className="login-icons">
                        <RiGoogleLine />
                        <RiFacebookCircleLine />
                        <RiInstagramLine />
                        <RiAppleLine />
                    </div> */}
                    <input
                        className="submit-btn"
                        type="submit"
                        value="Log In"
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
