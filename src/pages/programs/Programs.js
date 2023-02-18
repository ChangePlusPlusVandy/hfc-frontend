import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Programs.css";
import CreateProgramPopup from "./CreateProgramPopup";

const Programs = () => {
    const [programs, setPrograms] = useState([]);

    const [users, setUsers] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [addUsers, setAddUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [sortBy, setSortBy] = useState("alphabetical");
    const [archivedSort, setArchivedSort] = useState("all");
    const [searchProgram, setSearchProgram] = useState("");

    const [newProgTitle, setNewProgTitle] = useState("");
    const [newProgDesc, setNewProgDesc] = useState("");

    useEffect(() => {
        getPrograms();
        getUsers();
    }, []);

    const programsFiltered = programs
        .filter((item) => {
            return searchProgram !== ""
                ? item.title.includes(searchProgram)
                : item;
        })
        .filter((item) => {
            if (archivedSort.localeCompare("all") == 0) return item;
            if (archivedSort.localeCompare("active") == 0)
                return item.archived === false;
            else return item.archived === true;
        });

    const sortPrograms = (arr) => {
        if (sortBy.localeCompare("alphabetical") == 0) {
            arr.sort((item1, item2) => {
                return item1.title.localeCompare(item2.title);
            });
        } else if (sortBy.localeCompare("dateAdded") == 0) {
            arr.sort((item1, item2) => {
                return item2.dateAdded.localeCompare(item1.dateAdded);
            });
        }
        return arr;
    };

    const getPrograms = async () => {
        try {
            let data = await fetch("http://localhost:3000/programs");
            data = await data.json();
            setPrograms(sortPrograms(data));
            console.log("programs: ");
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const getUsers = async () => {
        try {
            let data = await fetch("http://localhost:3000/users/users");
            data = await data.json();
            setUsers(data);
            let tmp = data.map((e) => ({
                value: e._id,
                label: e.firstName,
                color: "black",
            }));

            setUserOptions(tmp);
            console.log("users: ");
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //UPDATE
            body: JSON.stringify({
                title: newProgTitle,
                description: newProgDesc,
                hosts: addUsers,
            }),
        };
        await fetch("http://localhost:3000/programs", requestOptions);
        getPrograms();
    };

    const deleteProgram = async (e) => {
        try {
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: e }),
            };
            await fetch("http://localhost:3000/programs", requestOptions);
        } catch (err) {
            console.log(err);
        }
        getPrograms();
    };

    const handleSearchChange = (e) => {
        setSearchProgram(e.target.value);
        console.log(searchProgram);
    };

    const handleSortValChange = (e) => {
        setSortBy(e.target.value);
        sortPrograms(programs);
    };

    const handleSortArchivedChange = (e) => {
        setArchivedSort(e.target.value);
    };

    const handleAddUser = (e) => {
        let addUserFiltered = e.map((event, i) => event.value);
        setAddUsers(addUserFiltered);
    };

    const createProgramFromModal = (e) => {
        handleSubmit();
        setOpenModal(false);
        setNewProgTitle("");
        setNewProgDesc("");
    };

    // //Updates newProgram info
    // const handleTitleChange = (e) => {
    //     setNewProgram(() => ({
    //         ...newProgram,
    //         title: e.target.value,
    //     }));
    // };

    // const handleArchivedChange = (e) => {
    //     if (e.target.value.localeCompare("true") == 0) {
    //         setNewProgram(() => ({
    //             ...newProgram,
    //             archived: true,
    //         }));
    //     } else {
    //         setNewProgram(() => ({
    //             ...newProgram,
    //             archived: false,
    //         }));
    //     }
    // };
    // const handleDescChange = (e) => {
    //     setNewProgram(() => ({
    //         ...newProgram,
    //         description: e.target.value,
    //     }));
    // };
    const handleTitleChange = (e) => {
        setNewProgTitle(e);
    };
    const handleDescChange = (e) => {
        setNewProgDesc(e);
    };

    return (
        <div className="programs">
            <h1>Programs:</h1>
            <button onClick={() => setOpenModal(true)}>Create Program</button>

            <CreateProgramPopup
                openModal={openModal}
                title={newProgTitle}
                titleChange={handleTitleChange}
                description={newProgDesc}
                descChange={handleDescChange}
                userOptions={userOptions}
                onChange={handleAddUser}
                submit={createProgramFromModal}
            />

            <div className="sort-and-search">
                <div
                    className="sort-indicator"
                    onChange={(e) => handleSortValChange(e)}
                >
                    <h3>Sort By:</h3>
                    <input type="radio" value="dateAdded" name="sortVal" />
                    Alphabetical
                    <input type="radio" value="alphabetical" name="sortVal" />
                    Date
                </div>
                <div className="single-search">
                    <input
                        type="text"
                        name="search-bar"
                        placeholder="Search..."
                        onChange={(e) => handleSearchChange(e)}
                    />
                </div>
                <div
                    className="archived-sort"
                    onChange={(e) => handleSortArchivedChange(e)}
                >
                    <input type="radio" value="archived" name="sortVal" />
                    Archived
                    <input type="radio" value="active" name="sortVal" />
                    Active
                    <input type="radio" value="all" name="sortVal" />
                    All
                </div>
            </div>
            <div>
                <div className="programs-list-container">
                    {programsFiltered.map((item, i) => (
                        <div key={i} className="program-card">
                            <h4># {i}</h4>
                            <h4>Title: {item.title}</h4>
                            <Link
                                to="/dashboard/programs/singleview"
                                state={{
                                    id: item._id,
                                }}
                            >
                                View Program
                            </Link>
                            <h5>id: {item._id}</h5>
                            HOSTS:
                            {item.hosts.map((host, h) => (
                                <h5 key={host._id}>{host.firstName}</h5>
                            ))}
                            <h5>description: {item.description}</h5>
                            {/* <h5>attendance: {item.attendance}</h5> */}
                            <h5>Days Of Week: {item.daysOfWeek}</h5>
                            <h5>Date Added: {item.dateAdded}</h5>
                            <h5>
                                {item.archived ? <>ARCHIVED</> : <>ACTIVE</>}
                            </h5>
                            <button onClick={() => deleteProgram(item._id)}>
                                Delete Program
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div>
                <div>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={newProgram.title}
                            name="title"
                            onChange={handleTitleChange}
                        />
                    </label>
                     <label>
                        Hosts:
                        <input
                            type="text"
                            value={newProgram.hosts}
                            name="hosts"
                            onChange={handleHostChange}
                        />
                    </label> 
                    <label>
                        Archived:
                        <input
                            type="text"
                            value={newProgram.archived}
                            name="archived"
                            onChange={handleArchivedChange}
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={newProgram.description}
                            name="description"
                            onChange={handleDescChange}
                        />
                    </label>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div> */}
        </div>
    );
};

export default Programs;
