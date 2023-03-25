import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./styles/Modal.css";

const CreateProgramPopup = (props) => {
    if (!props.openModal) return;

    return (
        <div className="modal-container">
            <div className="modal-body">
                <button className="cancel-button">X</button>

                <h1>Create New Program</h1>

                <h6>Basic Information</h6>

                <input
                    type="text"
                    value={props.title}
                    name="title"
                    placeholder="Title"
                    className="modal-input-text"
                    onChange={(e) => props.titleChange(e.target.value)}
                />

                <textarea
                    type="text"
                    value={props.description}
                    name="description"
                    placeholder="Description..."
                    className="modal-text-area"
                    onChange={(e) => props.descChange(e.target.value)}
                />

                <div className="start-end-date">
                    <input
                        type="text"
                        //value={props.description}
                        //name="description"
                        placeholder="Start (MM-DD-YYYY)"
                        className="modal-input-text"
                    //onChange={e => props.descChange(e.target.value)}
                    />

                    <input
                        type="text"
                        //value={props.description}
                        //name="description"
                        placeholder="End (MM-DD-YYYY)"
                        className="modal-input-text"
                    //onChange={e => props.descChange(e.target.value)}
                    />
                </div>
                <div className="add-hosts">
                    <h6>Hosts</h6>
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
                        placeholder="Add hosts"

                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 15,
                            border: "#d0d0d1",
                        })}
                    />
                </div>
                <div className="add-schedule">
                    <h6>Time/Schedule</h6>
                    <button>add schedule</button>
                </div>

                <button
                    className="modal-submit-button submit-button"
                    onClick={props.submit}
                >
                    Submit
                </button>
            </div>
        </div>

    );
};

export default CreateProgramPopup;
