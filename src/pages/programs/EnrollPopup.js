import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./styles/Modal.css";

const EnrollPopup = (props) => {
    return (
        props.openModal && (
            <div className="modal-container">
                <div className="modal-body">
                    <button
                        className="cancel-button"
                        onClick={props.handleExitModal}
                    >
                        X
                    </button>
                    <h2>Enroll Beneficiary</h2>
                    <Select
                        isMulti
                        name="colors"
                        isClearable
                        isSearchable
                        menuPortalTarget={document.body}
                        options={props.options}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        onChange={props.onChange}
                    />
                    <button onClick={props.submit} className="submit-button">
                        Submit
                    </button>
                </div>
            </div>
        )
    );
};

export default EnrollPopup;
