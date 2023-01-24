import React from "react";
import "./Popup.css";

const Popup = (props) => {
    return props.trigger &&
        <div className="popup">
            <div className="popup-inner">
                {!props.isEditingPopup &&  // show the close button only when we're not editing
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
    ;
}

export default Popup;
