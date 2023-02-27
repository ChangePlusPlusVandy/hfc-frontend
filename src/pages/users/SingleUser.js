import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    });
    const [isCurrentUser, setisCurrentUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [newPass, setnewPass] = useState("");
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
            setUser({
                firstName: mongoUser[0].firstName,
                lastName: mongoUser[0].lastName,
                languages: mongoUser[0].languages,
                joinDate: mongoUser[0].joinDate,
                level: mongoUser[0].level,
                fbUid: mongoUser[0].firebaseUID,
            });
        } catch (err) {
            console.error(err);
            console.log(err.message);
        }
    };

    onAuthStateChanged(auth, (fbuser) => {
        if (fbuser) {
            if (!isCurrentUser) {
                console.log(fbuser.uid, "g", user.fbUid);
                checkAdminStatus(fbuser.uid);
                setisCurrentUser(fbuser.uid == user.fbUid || isAdmin);
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
                        <p className="staff-name">Raj Chopra</p>
                        <p className="staff-role">Organization Position</p>
                    </div>
                    <div className="content-main">
                        <p className="content-row">
                            <span className="content-row-key">
                                Staff ID Number:
                            </span>
                            <span className="content-row-val">
                                XXXXXXXXXXXX
                            </span>
                        </p>
                        <p className="content-row">
                            <span className="content-row-key">
                                Phone Number:
                            </span>
                            <span className="content-row-val">
                                XXXXXXXXXXXX
                            </span>
                        </p>
                        <p className="content-row">
                            <span className="content-row-key">Email:</span>
                            <span className="content-row-val">
                                XXXXXXXXXXXX
                            </span>
                        </p>
                        <p className="content-row">
                            <span className="content-row-key">Join Date:</span>
                            <span className="content-row-val">
                                XXXXXXXXXXXX
                            </span>
                        </p>
                        <p className="content-row">
                            <span className="content-row-key">
                                Fluent Languages:
                            </span>
                        </p>
                    </div>
                    {isCurrentUser ? (
                        <div className="btn-container">
                            <button className="edit-btn">Edit</button>
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
