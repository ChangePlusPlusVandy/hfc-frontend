import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import { onAuthStateChanged, updatePassword } from "firebase/auth";

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
            const mongoUser = await res.json()
            setIsAdmin(parseInt(mongoUser[0].level) == 3)
        } catch (err) {
            console.error(err);
            console.log(err.message);
        } 
    }

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
                checkAdminStatus(fbuser.uid)
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
        <div>
            {isCurrentUser ? (
                <div>
                    <input
                        placeholder="New Password"
                        type="password"
                        value={newPass}
                        onChange={(e) => setnewPass(e.target.value)}
                    />
                    <button onClick={handleUpdatePassword}>
                        Change Password
                    </button>
                </div>
            ) : (
                "false"
            )}
        </div>
    );
};

export default SingleUser;
