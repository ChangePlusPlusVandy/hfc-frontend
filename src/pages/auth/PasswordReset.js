import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import "./PasswordReset.css";
const PasswordReset = () => {
    const [email, setEmail] = useState("");

    const handlePasswordReset = async (e) => {
        console.log("email being sent to", email);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Password reset email sent");
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
                console.log(errorCode, errorMessage);
            });
    };

    return (
        <div className="passreset-container">
            <h2 className="passreset-title">Forgot your password?</h2>
            <h4>
                Enter your email address and we'll send you a link to change
                your password.
            </h4>
            <form onSubmit={(e) => handlePasswordReset(e)}>
                <div className="passreset-form-container">
                    <input
                        className="passreset-input"
                        type="text"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <input
                        className="passreset-submit-btn"
                        type="submit"
                        value="Send Password Reset Email"
                    />
                </div>
            </form>
        </div>
    );
};

export default PasswordReset;
