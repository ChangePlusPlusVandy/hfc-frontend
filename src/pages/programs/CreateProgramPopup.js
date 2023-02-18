import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./styles/Modal.css";

const CreateProgramPopup = (props) => {
    return (
        props.openModal && (
            <div className="modal-container">
                <div className="modal-body">
                    <div>
                        <div>
                            <label>
                                Title:
                                <input
                                    type="text"
                                    value={props.title}
                                    name="title"
                                    onChange={(e) =>
                                        props.titleChange(e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                Description:
                                <input
                                    type="text"
                                    value={props.description}
                                    name="description"
                                    onChange={(e) =>
                                        props.descChange(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                    </div>
                    <h3>Add Users</h3>
                    <Select
                        isMulti
                        name="colors"
                        isClearable
                        isSearchable
                        menuPortalTarget={document.body}
                        options={props.userOptions}
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

export default CreateProgramPopup;
