import React, { useState } from "react";

export default function SingleBfc(item) {
    const [newFirstName, setNewFirstName] = useState("");
    const [isEditing, setEditing] = useState(false);

    function handleChange(e) {
        setNewFirstName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        item.editBfc(item.id, newFirstName);
        setNewFirstName("");
        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="bfc-label" htmlFor={item.id}>
                    New first name for {item.firstName}
                </label>
                <input
                    id={item.id}
                    className="bfc-text"
                    type="text"
                    value={newFirstName}
                    onChange={handleChange}
                />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn bfc-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                </button>

                <button type="submit" className="btn btn__primary bfc-edit">
                    Save
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="bfc-checkbox">
                <input
                    id={item.id}
                    type="checkbox"
                    defaultChecked={item.archived}
                    onChange={() => item.toggleBfcArchived(item.id)}
                />
                <label className="bfc-label" htmlFor={item.id}>
                    {item.firstName}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                >
                    Edit{" "}
                    <span className="visually-hidden">{item.firstName}</span>
                </button>

                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => item.deleteTask(item.id)}
                >
                    Delete{" "}
                    <span className="visually-hidden">{item.firstName}</span>
                </button>
            </div>
        </div>
    );

    return (
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    );
}
