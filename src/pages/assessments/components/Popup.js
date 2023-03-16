import React from "react";
import "./Popup.css";

const Popup = (props) => {
    return (
        props.trigger && (
            <div className="popup-container">
                <div className="popup-content">
                    {
                        <button
                            className="close-btn"
                            onClick={() => props.setTrigger(false)}
                        >
                            {props.closeBtnName}
                        </button>
                    }
                    {props.children}
                </div>
            </div>
        )
    );
};

export default Popup;
