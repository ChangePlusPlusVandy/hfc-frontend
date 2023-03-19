import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import { onAuthStateChanged, updatePassword } from "firebase/auth";
import { IoIosArrowBack } from "react-icons/Io";
import DefaultUser from "../../../src/assets/images/default-user.png";
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
        phoneNum: '',
        _id: ""
    });
    const [isCurrentUser, setisCurrentUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [newPass, setnewPass] = useState("");
    const [editing, setEditing] = useState(false);
    const { fbId } = useParams();


    const handleUpdatePassword = async () => {
        const fbuser = auth.currentUser;
        updatePassword(fbuser, newPass)
            .then(() => {
                console.log("Update password successful", newPass);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const saveUser = async () => {
        try {
            console.log(user._id);
            const res = await fetch(`http://localhost:3000/users?id=${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    level: parseInt(user.level),
                    phoneNumber: user.phoneNum,
                    joinDate: user.joinDate,
                }),
            });
            return res.json();
        } catch (err) {
            console.log(err);
            console.log(err.message);
        }
    }

    const toggleEdit = async () => {
        if (editing) {
            const res = await saveUser();
            getMongoUser(fbId);
        }
        setEditing(!editing);
    }

    const checkAdminStatus = async (fbId) => {
        try {
            const res = await fetch(
                `http://localhost:3000/users?firebaseUID=${fbId}`
            );
            const mongoUser = await res.json();
            setIsAdmin(parseInt(mongoUser[0].level) == 3);
        } catch (err) {
            console.error(err);
            console.log(err.message);
        }
    };

    const getMongoUser = async (fbId) => {
        try {
            const res = await fetch(
                `http://localhost:3000/users?firebaseUID=${fbId}`
            );
            const mongoUser = await res.json();
            console.log(mongoUser);
            const { firstName, lastName, languages, joinDate, level, firebaseUID, _id, phoneNumber } = mongoUser[0];
            setUser({
                firstName: firstName,
                lastName: lastName,
                languages: languages,
                joinDate: joinDate,
                level: level,
                fbUid: firebaseUID,
                _id: _id,
                phoneNum: phoneNumber,
            });
        } catch (err) {
            console.error(err);
            console.log(err.message);
        }
    };

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            if (!isCurrentUser) {
                console.log(currentUser.uid, "g", user.fbUid);
                checkAdminStatus(currentUser.uid);
                setisCurrentUser(currentUser.uid == user.fbUid || isAdmin);
            }
        } else {
            navigate("../login");
        }
    });

    useEffect(() => {
        getMongoUser(fbId);
    }, []);
    return (
        <div className="container">
            <div onClick={(e) => navigate("../users")} className="go-back">
                <span className="go-back-text">
                    <IoIosArrowBack /> Back to Staff Directory
                </span>
            </div>
            <div className="staff-view">
                <div className="header"></div>
                <img className="pfp" src={DefaultUser}></img>
                <div className="staff-content">
                    <div className="staff-header">
                        <p className="staff-name">{user.firstName} {user.lastName}</p>
                        <p className="staff-role">{LEVELTITLES[user.level]}</p>
                    </div>
                    <div className="content-main">
                        <p className="content-row">
                            <span className="content-row-key">
                                Staff ID Number:
                            </span>
                            {editing ? <input className='user-edit' type='text' disabled value={user.fbUid}></input> : (
                                <span className="content-row-val">
                                    {user.fbUid}
                                </span>
                            )}
                            
                        </p>
                        <p className="content-row">
                            <span className="content-row-key">
                                Phone Number:
                            </span>
                            {editing ? <input onChange={(e) => setUser({...user,phoneNum:e.target.value})} className='user-edit' type='text' value={user.phoneNum}></input> : (
                                <span className="content-row-val">
                                    {user.phoneNum}
                                </span>
                            )}
                        </p>    
                        <p className="content-row">
                            <span className="content-row-key">Join Date:</span>
                            {editing ? <input disabled className='user-edit' type='text' value={user.joinDate.substring(0,10)}></input> : (
                                <span className="content-row-val">
                                    {user.joinDate.split('T')[0]}
                                </span>
                            )}
                        </p>
                        <p className="content-row">
                            <span className="content-row-key">
                                Level:
                            </span>
                            {editing ? <input onChange={e => setUser({...user,level:parseInt(e.target.value)})}className='user-edit' type='number' value={user.level} disabled={!isAdmin}></input> : (
                                <span className="content-row-val">
                                    {user.level}
                                </span>
                            )}
                        </p>
                        <p className="content-row">
                            <span className="content-row-key">
                                Fluent Languages:
                            </span>
                            {editing ? <input className='user-edit' readOnly type='text'></input> : (
                                <span className="content-row-val">
                                    {user.languages}
                                </span>
                            )}
                        </p>
                    </div>
                    {isCurrentUser ? (
                        <div className="btn-container">
                            <button onClick={toggleEdit} className="edit-btn">{editing ? "Save" : "Edit"}</button>
                            <button onClick={handleUpdatePassword} disabled className='edit-btn'>Update Password</button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleUser;

// {isCurrentUser ? (
//     <div>
//         <input
//             placeholder="New Password"
//             type="password"
//             value={newPass}
//             onChange={(e) => setnewPass(e.target.value)}
//         />
//         <button onClick={handleUpdatePassword}>
//             Change Password
//         </button>
//     </div>
// ) : (
//     "false"
// )}


const LEVELTITLES = {
    0: "HFC Volunteer",
    1: "HFC Worker",
    2: "HFC Manager",
    3: "HFC Admin"
}