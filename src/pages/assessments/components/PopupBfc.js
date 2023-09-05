import React, { useState, useEffect } from "react";
import "./Popup.css";

const PopupBfc = ({ setPopup, setBeneficiary, navigate, setIntakeOuttake, setIntake }) => {
    const API_URL = process.env.API_URL;
    const [idError, setIdError] = useState(false);
    const [showErrorText, setShowErrorText] = useState(false);
    const [allBfcIds, setAllBfcIds] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [toggleIntakeOuttake, setToggleIntakeOuttake] = useState(false);

    const handleBegin = () => {
        // whenever the user clicks on the button, reset the error
        setIdError(false);
        // check if the ID is valid
        if (allBfcIds.length > 0 && allBfcIds.includes(parseInt(userInput))) {
            // get the beneficiary corresponding to the valid ID
            getBeneficiary(userInput);
            setPopup(false);
        }
        // else, set error and not close popup
        else {
            setIdError(true);
            setShowErrorText(true);
        }
    };

    const getBeneficiary = async (inputId) => {
        try {
            let data = await fetch(
                `${API_URL}/beneficiaries/?idNum=${inputId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "auth"
                        )}`,
                    },
                }
            );
            //console.log("bfc ID: ", beneficiaryId);
            data = await data.json();
            setBeneficiary(data);
            console.log("bfc correspond to this id: ", data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeInput = (e) => {
        setUserInput(e.target.value);
    };

    const getAllBeneficiaries = async () => {
        try {
            let data = await fetch(`${API_URL}/beneficiaries`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "auth"
                    )}`,
                },
            });
            data = await data.json();
            // setBeneficiaries(data);
            setAllBfcIds(data.map((d) => d.id));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllBeneficiaries();
    }, []);

    const handleToggleInOut = () => {
        setIntakeOuttake(!toggleIntakeOuttake);
        setToggleIntakeOuttake((curr) => !curr);
    };

    const handleChangeInOutVal = (e) => {
        console.log(e.target.value)
        if (e.target.value == "in") {
            setIntake(true)
        } else if (e.target.value == "out") {
            setIntake(false)
        }
    }
    return (
        <div className="popup-container">
            <div className="popup-content">
                <button className="close-btn" onClick={() => navigate(-1)}>
                    Close
                </button>

                <div className="popup-content">
                    <h1>Assessment Requirement</h1>
                    <h4>Enter beneficiary ID number to enroll:</h4>
                    <div className="id-input">
                        <input
                            type="text"
                            onChange={handleChangeInput}
                            value={userInput}
                            placeholder="enter beneficiary ID"
                            className={`beneficiary-id-input ${idError ? "error" : ""
                                }`}
                        />
                        {showErrorText && (
                            <p className="beneficiary-id-alert">
                                Beneficiary ID not found.
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <button onClick={handleToggleInOut}>
                        {" "}
                        Click this if this is a Intake or Outtake Assessment{" "}
                    </button>
                    <form
                        style={{
                            visibility: toggleIntakeOuttake
                                ? "visible"
                                : "hidden",
                        }}
                        onChange={handleChangeInOutVal}
                    >
                        <input type="radio" name="radio" id="intake" value="in" />
                        <label>Intake</label>

                        <input type="radio" name="radio" id="outtake" value="out" />
                        <label>Outtake</label>
                    </form>
                </div>

                <button className="begin-btn" onClick={handleBegin}>
                    Begin
                </button>
            </div>
        </div>
    );
};

export default PopupBfc;
