import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Dropdown from "../../utils/Dropdown";
import { auth } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./Users.css";
import DefaultUser from "../../../src/assets/images/default-user.png";

const SORT_OPTIONS = [
    { value: "FNAZ", label: "First Name A-Z" },
    { value: "FNZA", label: "First Name Z-A" },
    { value: "LNAZ", label: "Last Name A-Z" },
    { value: "LNZA", label: "Last Name Z-A" },
    { value: "DATE", label: "Date" },
];

const FILTER_OPTIONS = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 5, label: "Archived" },
    { value: 6, label: "Active" },
];

const User = ({
    fname,
    lname,
    uid,
    langs,
    _id,
    level,
    joinDate,
    pictureUrl = "",
    onClick,
}) => {
    return (
        <div onClick={onClick} className="user-container">
            <img className="user-pfp" src={DefaultUser}></img>
            <p className="user-name">
                {fname} {lname}
            </p>
        </div>
    );
};

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [fbId, setfbId] = useState("");
    const navigate = useNavigate();
    const handleOnboarding = () => {
        if (isAdmin) {
            navigate("../onboard");
        }
    };

    const parseValueAndSetFilter = (value) => {
        let res = [];
        value.forEach((item) => {
            res.push(item.value);
        });
        return res;
    };

    const sortByName = (first, isReversed) => {
        let data = [...users];
        if (first) {
            data.sort((a, b) => a.firstName.localeCompare(b.firstName));
        } else {
            data.sort((a, b) => a.lastName.localeCompare(b.lastName));
        }
        if (isReversed) {
            setUsers(data);
        } else {
            setUsers(data.reverse());
        }
    };

    const sortByDate = () => {
        let data = [...users];
        console.log(data);
        data.sort(function (a, b) {
            const dateA = new Date(a.joinDate);
            const dateB = new Date(b.joinDate);
            return dateB - dateA;
        });
        setUsers(data);
    };

    const handleSortChange = (e) => {
        if (e == [] || e.length == 0) {
            return;
        } else if (e[0].value == "FNAZ") {
            sortByName(true, true);
        } else if (e[0].value == "LNAZ") {
            sortByName(false, true);
        } else if (e[0].value == "FNZA") {
            sortByName(true, false);
        } else if (e[0].value == "LNZA") {
            sortByName(false, false);
        } else if (e[0].value == "DATE") {
            sortByDate();
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                let data = await fetch("http://localhost:3000/users/users");
                data = await data.json();
                setUsers(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };
        getUsers();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const res = await fetch(
                    `http://localhost:3000/users?firebaseUID=${user.uid}`
                );
                const mongoUser = await res.json();
                setIsAdmin(parseInt(mongoUser[0].level) == 3);
            }
        });
    }, []);

    return (
        <div className="user-page-container">
            <h1 className="title">Staff Directory</h1>
            <div className="query-container">
                <input
                    className="search"
                    placeholder="Search user"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Dropdown
                    placeHolder="Sort Order"
                    isMulti
                    options={SORT_OPTIONS}
                    onChange={(value) => handleSortChange(value)}
                />
                <Dropdown
                    placeHolder="Filter Level/Archived"
                    options={FILTER_OPTIONS}
                    isMulti
                    onChange={(value) => {
                        setFilter(parseValueAndSetFilter(value));
                        console.log(filter);
                    }}
                />
                <input
                    onClick={handleOnboarding}
                    className="onboarding-btn"
                    value="Onboarding"
                    disabled={!isAdmin}
                    type="button"
                />
            </div>
            <div className="users-container">
                {users
                    .filter((value) => {
                        if (!search) {
                            return value;
                        } else if (
                            value.firstName
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            value.lastName
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        ) {
                            return value;
                        }
                    })
                    .filter((value) => {
                        if (filter == "") {
                            return value;
                        } else if (filter.includes(parseInt(value.level))) {
                            return value;
                        } else if (filter == 5) {
                            if (value.archived) {
                                return value;
                            }
                        } else if (filter == 6) {
                            if (!value.archived) {
                                return value;
                            }
                        }
                    })
                    .map((item) => (
                        <User
                            onClick={(e) => navigate(`${item._id}`)}
                            key={item.firebaseUID}
                            uid={item.firebaseUID}
                            fname={item.firstName}
                            lname={item.lastName}
                            langs={item.languages}
                            level={item.level}
                            joinDate={item.joinDate}
                            _id={item._id}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Users;
