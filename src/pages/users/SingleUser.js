import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import { onAuthStateChanged, updatePassword } from "firebase/auth";
import { IoIosArrowBack } from "react-icons/Io";
import DefaultUser from "../../../src/assets/images/default-user.png";
import ChangePasswordModal from "./ChangePasswordModal";
import "./SingleUser.css";
const SingleUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        languages: [],
        joinDate: "",
        level: 0,
        fbUid: "",
        phoneNum: "",
        _id: "",
    });
    const [isCurrentUser, setisCurrentUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [newPass, setnewPass] = useState("");
    const [editing, setEditing] = useState(false);
    const { fbId } = useParams(); // TODO: rename param to mongoId
    const [showModal, setShowModal] = useState(false);

    const handleUpdatePassword = async () => {
        setShowModal(true);
    };

    const saveUser = async () => {
        try {
            console.log(user.joinDate);
            const currUser = user._id;
            const res = await fetch(
                `http://localhost:3000/users?id=${currUser}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "auth"
                        )}`,
                    },
                    body: JSON.stringify({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        languages: user.languages,
                        joinDate: user.joinDate,
                        level: user.level,
                        fbUid: user.firebaseUID,
                        phoneNum: user.phoneNumber,
                        archived: user.archived,
                    }),
                }
            );
            return res.json();
        } catch (err) {
            console.log(err);
            console.log(err.message);
        }
    };

    const handleArchiveToggle = async () => {
        const currUser = user._id;
        const newArchived = !user.archived;
        console.log(currUser);
        fetch(`http://localhost:3000/users?id=${currUser}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem(
                    "auth"
                )}`,
            }, 
            body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                languages: user.languages,
                joinDate: user.joinDate,
                level: user.level,
                fbUid: user.firebaseUID,
                phoneNum: user.phoneNumber,
                archived: newArchived,
            }),
        });
    };

    const handleEdit = async () => {
        if (editing) {
            const res = await saveUser();
            console.log("Check user");
            getMongoUser(fbId);
        }
        setEditing(!editing);
    };

    const checkAdminStatus = async (fbId) => {
        try {
            const res = await fetch(
                `http://localhost:3000/users?firebaseUID=${fbId}`
            ,{headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem(
                    "auth"
                )}`,
            },});
            const mongoUser = await res.json();
            setIsAdmin(parseInt(mongoUser[0].level) == 3);
        } catch (err) {
            console.error(err);
            console.log(err.message);
        }
    };

    const getMongoUser = async (mongoId) => {
        try {
            const res = await fetch(
                `http://localhost:3000/users/user?userId=${mongoId}`
            ,{headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem(
                    "auth"
                )}`,
            },});
            const mongoUser = await res.json();
            console.log("mongoUser", mongoUser);
            const {
                firstName,
                lastName,
                languages,
                joinDate,
                level,
                firebaseUID,
                _id,
                phoneNumber,
                archived,
            } = mongoUser;
            setUser({
                firstName: firstName,
                lastName: lastName,
                languages: languages,
                joinDate: joinDate,
                level: level,
                fbUid: firebaseUID,
                _id: _id,
                phoneNum: phoneNumber,
                archived: archived,
            });
        } catch (err) {
            console.error(err);
            console.log(err.message);
        }
    };

    useEffect(() => {
        console.log("params", fbId);
        getMongoUser(fbId);
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                if (!isCurrentUser) {
                    console.log(currentUser.uid, "g", user.fbUid);
                    checkAdminStatus(currentUser.uid);
                    setisCurrentUser(currentUser.uid == user.fbUid); // || isAdmin
                }
            } else {
                navigate("../login");
            }
        });
    }, []);
    return (
        <div className="container">
            <div onClick={(e) => navigate("../../users")} className="go-back">
                <span className="go-back-text">
                    <IoIosArrowBack /> Back to Staff Directory
                </span>
            </div>
            <div className="staff-view">
                <div className="header"></div>
                <img className="pfp" src={DefaultUser}></img>
                <div className="staff-content">
                    <div className="staff-header">
                        <p className="staff-name">
                            {editing ? (
                                <input
                                    className="user-edit-2"
                                    type="text"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            firstName: e.target.value,
                                        })
                                    }
                                    value={user.firstName}
                                ></input>
                            ) : (
                                user.firstName
                            )}
                        </p>
                        <p className="staff-name">
                            {editing ? (
                                <input
                                    className="user-edit-2"
                                    type="text"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            lastName: e.target.value,
                                        })
                                    }
                                    value={user.lastName}
                                ></input>
                            ) : (
                                user.lastName
                            )}
                        </p>
                        <p className="staff-role">{LEVELTITLES[user.level]}</p>
                    </div>
                    <div className="content-main">
                        <p className="content-row">
                            <span className="content-row-key">
                                Staff ID Number:
                            </span>
                            {editing ? (
                                <input
                                    className="user-edit"
                                    type="text"
                                    disabled
                                    value={user.fbUid}
                                ></input>
                            ) : (
                                <span className="content-row-val">
                                    {user.fbUid}
                                </span>
                            )}
                        </p>
                        <p className="content-row">
                            <span className="content-row-key">
                                Phone Number:
                            </span>
                            {editing ? (
                                <input
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            phoneNum: e.target.value,
                                        })
                                    }
                                    className="user-edit"
                                    type="text"
                                    value={user.phoneNum}
                                ></input>
                            ) : (
                                <span className="content-row-val">
                                    {user.phoneNum}
                                </span>
                            )}
                        </p>
                        <p className="content-row">
                            <span className="content-row-key">Join Date:</span>
                            {editing ? (
                                <input
                                    className="user-edit"
                                    type="date"
                                    value={user.joinDate.substring(0, 10)}
                                    onChange={(e) => {
                                        setUser({
                                            ...user,
                                            joinDate: e.target.value,
                                        });
                                    }}
                                ></input>
                            ) : (
                                <span className="content-row-val">
                                    {user.joinDate.split("T")[0]}
                                </span>
                            )}
                        </p>
                        <p className="content-row">
                            <span className="content-row-key">Level:</span>
                            {editing ? (
                                <input
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            level: parseInt(e.target.value),
                                        })
                                    }
                                    className="user-edit"
                                    type="number"
                                    value={user.level}
                                    disabled={!isAdmin}
                                ></input>
                            ) : (
                                <span className="content-row-val">
                                    {user.level}
                                </span>
                            )}
                        </p>
                        <p className="content-row">
                            <span className="content-row-key">
                                Fluent Languages:
                            </span>
                            {editing ? (
                                <input
                                    className="user-edit"
                                    readOnly
                                    type="text"
                                ></input>
                            ) : (
                                <span className="content-row-val">
                                    {user.languages}
                                </span>
                            )}
                        </p>
                    </div>
                    {isCurrentUser || isAdmin ? (
                        <div className="btn-container">
                            <button onClick={handleEdit} className="edit-btn">
                                {editing ? "Save" : "Edit"}
                            </button>
                            <button
                                onClick={handleUpdatePassword}
                                className="edit-btn"
                                disabled={isCurrentUser == false}
                            >
                                Update Password
                            </button>
                            {isAdmin ? (
                                <button
                                    onClick={handleArchiveToggle}
                                    className="edit-btn"
                                >
                                    🤣🫱 boi ur fired
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            {showModal ? <ChangePasswordModal showModal={setShowModal} /> : ""}
        </div>
    );
};

export default SingleUser;

const LEVELTITLES = {
    0: "HFC Volunteer",
    1: "HFC Worker",
    2: "HFC Manager",
    3: "HFC Admin",
};
