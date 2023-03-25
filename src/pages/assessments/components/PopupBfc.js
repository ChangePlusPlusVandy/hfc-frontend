import React from "react";
import "./Popup.css";

const PopupBfc = ({
    trigger,
    setTrigger,
    getBeneficiary,
    navigate,
    content,
}) => {
    const handleBegin = () => {
        getBeneficiary();
        setTrigger(false);
    };

    return (
        trigger && (
            <div className="popup-container">
                <div className="popup-content">
                    <button className="close-btn" onClick={() => navigate(-1)}>
                        Close
                    </button>
                    {content}
                    <button className="begin-btn" onClick={handleBegin}>
                        Begin
                    </button>
                </div>
            </div>
        )
    );
};

export default PopupBfc;
