import React from "react";
import "./Popup.css";

const Popup = ({ trigger, setTrigger, closeBtnName, content }) => {
    return (
        trigger && (
            <div className="popup-container">
                <div className="popup-content">
                    {
                        <button
                            className="close-btn"
                            onClick={() => setTrigger(false)}
                        >
                            {closeBtnName}
                        </button>
                    }
                    {content}
                </div>
            </div>
        )
    );
};

export default Popup;
