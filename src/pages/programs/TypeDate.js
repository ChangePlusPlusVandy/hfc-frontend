import React, { useState } from 'react';
import "./styles/Modal.css";

const DateInput = (props) => {
    const [value, setValue] = useState('');

    const keyPressFunc = (e) => {
        if (e.which === 8) {
            let val = value;
            if (val.length === 3 || val.length === 6) {
                val = val.slice(0, val.length - 1);
                setValue(val);
            }
        }
    };

    const handleChange = (e) => {
        let val = e.target.value;
        if (val.length === 2 || val.length === 5) {
            val += '-';
        }
        if (val.length <= 10) {

            setValue(val);
            props.onChange(val)
        }
        else {
            checkdate(val);
        }
    };

    const checkDate = (val) => {

    }

    return (
        <input
            className="modal-input-text"
            type="text"
            value={value}
            placeholder={props.placeholder}
            onChange={(e) => handleChange(e)}
            onKeyDown={keyPressFunc}
        />
    );
}

export default DateInput;
