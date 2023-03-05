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
                            close
                        </button>
                    }
                    {props.children}
                </div>
            </div>
        )
    );
};

export default Popup;
