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
    const [archivedSort, setArchivedSort] = useState("All");
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
            if (archivedSort.localeCompare("All") == 0) return item;
            if (archivedSort.localeCompare("Active") == 0)
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
        console.log(addUsers);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //UPDATE
            body: JSON.stringify({
                title: newProgTitle,
                description: newProgDesc,
                hosts: addUsers,
            }
            ),
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
        statusOptionsDropdown();
        filterDropdown();
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

    const handleTitleChange = e => {
        setNewProgTitle(e);
    }
    const handleDescChange = e => {
        setNewProgDesc(e);
    }




    const sortDropdown = () => {
        let click = document.getElementById("sort-dropdown");
        if (click.style.display === "none") {
            click.style.display = "flex";
            click.style.width = "100%";
        } else {
            click.style.display = "none";
        }
    }
    const sortOptionsDropdown = () => {
        let click = document.getElementById("sort-options-dropdown");

        if (click.style.display === "none") {
            click.style.display = "flex";
            click.style.flexDirection = "column";

        } else {
            click.style.display = "none";
        }
    }

    const filterDropdown = () => {
        let click = document.getElementById("filter-dropdown");
        if (click.style.display === "none") {
            click.style.display = "flex";
            click.style.width = "100%";
        } else {
            click.style.display = "none";
        }
    }
    const statusOptionsDropdown = () => {
        let click = document.getElementById("status-options-dropdown");

        if (click.style.display === "none") {
            click.style.display = "flex";
            click.style.flexDirection = "column";

        } else {
            click.style.display = "none";
        }
    }

    return (
        <div className="program-list-view-container">
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
            <h1>Program Overview</h1>
            <div className="program-sort-options-container">
                <div className="sort-options">
                    <div className="dropdown">
                        <button onClick={filterDropdown} className="filter-options">
                            Filter
                        </button>
                        <div className="two-dropdown-container" onClick={statusOptionsDropdown}>
                            <div id="filter-dropdown">
                                <div className="status-options-container">
                                    <div className="status-options-sub">
                                        <h6>STATUS</h6>
                                        <div className="status-options-main">
                                            <h5>{archivedSort} Programs</h5>
                                            <h5>&gt;</h5>
                                        </div>
                                    </div>
                                    <div id="status-options-dropdown" onChange={(e) => handleSortArchivedChange(e)}>
                                        <input type="radio" value="Archived" name="sortVal" id="radio1" className="sort-radio-button" />
                                        <label for='radio1'>Archived</label>

                                        <input type="radio" value="Active" name="sortVal" id="radio2" className="sort-radio-button" />
                                        <label for='radio2'>Active</label>

                                        <input type="radio" value="All" name="sortVal" id="radio3" className="sort-radio-button" />
                                        <label for='radio3'>All</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* //                    <div
//             className="sort-indicator"
//             onChange={(e) => handleSortValChange(e)}
//         >
//             <h3>Sort By:</h3>
//             <input type="radio" value="dateAdded" name="sortVal" />
//             Alphabetical
//             <input type="radio" value="alphabetical" name="sortVal" />
//             Date
//         </div> */}

                    <div className="dropdown">
                        <button onClick={sortDropdown} className="sort-to-options">
                            Sort
                        </button>
                        <div className="sort-dropdown-container" onClick={sortOptionsDropdown}>
                            <div id="sort-dropdown">
                                <div className="sort-options-container" onChange={(e) => handleSortValChange(e)}>
                                    <input type="radio" value="dateAdded" id="sort1" name="sortVal" className="sort-radio-button" />
                                    <label for='sort1' className="sort-options-sub">
                                        <h6>FIRST NAME</h6>
                                        <div className="sort-options-main">
                                            <h5>A-Z</h5>
                                            <h5>&gt;</h5>
                                        </div>
                                    </label>

                                    <input type="radio" value="alphabetical" id="sort2" name="sortVal" className="sort-radio-button" />
                                    <label for='sort2' className="sort-options-sub" id="middle-sort-option">
                                        <h6>START DATE</h6>
                                        <div className="sort-options-main">
                                            <h5>Newest-Oldest</h5>
                                            <h5>&gt;</h5>
                                        </div>
                                    </label>

                                    <input type="radio" value="reverseDate" id="sort3" name="sortVal" className="sort-radio-button" />
                                    <label for='sort3' className="sort-options-sub" id="middle-sort-option">
                                        <div className="sort-options-sub">
                                            <h6>JOIN DATE</h6>
                                            <div className="sort-options-main">
                                                <h5>Newest-Oldest</h5>
                                                <h5>&gt;</h5>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-and-create">
                    <input
                        type="text"
                        name="search-bar"
                        placeholder="Search Program"
                        onChange={(e) => handleSearchChange(e)}
                    />
                    <button onClick={() => setOpenModal(true)} className="submit-button">Create Program</button>
                </div>
            </div>
            <div className="program-list-header">
                <h4 className="program-title">Program Title</h4>
                <h4 className="program-id">ID Number</h4>
                <h4 className="program-start-date">Start Date</h4>
                <h4 className="program-date-added">Date Added</h4>
                <h4 className="program-status">Status</h4>
            </div>
            <div className="program-list">
                {programsFiltered.map((item, i) => (
                    <div key={i} className="program-card">
                        <h4 className="program-title">
                            <Link
                                to="/dashboard/programs/singleview"
                                state={{
                                    id: item._id,
                                }}
                            >{item.title}
                            </Link>
                        </h4>
                        <h4 className="program-id">{item._id}</h4>
                        <h4 className="program-start-date">None</h4>
                        <h4 className="program-date-added">{item.dateAdded.split("T")[0]}</h4>
                        {item.archived ? (
                            <h4 className="program-status">Archived</h4>
                        ) : (
                            <h4 className="program-status">Active</h4>
                        )}

                    </div>
                ))}

            </div>
        </div >
    );
};

export default Programs;





// <div className="programs">
//     <h1>Programs:</h1>
//     <button onClick={() => setOpenModal(true)}>Create Program</button>




//     <div className="sort-and-search">
//         <div
//             className="sort-indicator"
//             onChange={(e) => handleSortValChange(e)}
//         >
//             <h3>Sort By:</h3>
//             <input type="radio" value="dateAdded" name="sortVal" />
//             Alphabetical
//             <input type="radio" value="alphabetical" name="sortVal" />
//             Date
//         </div>
//         <div className="single-search">
//             <input
//                 type="text"
//                 name="search-bar"
//                 placeholder="Search..."
//                 onChange={(e) => handleSearchChange(e)}
//             />
//         </div>
//         <div
//             className="archived-sort"
//             onChange={(e) => handleSortArchivedChange(e)}
//         >
//             <input type="radio" value="archived" name="sortVal" />
//             Archived
//             <input type="radio" value="active" name="sortVal" />
//             Active
//             <input type="radio" value="all" name="sortVal" />
//             All
//         </div>
//     </div>
//     <div>
//         <div className="programs-list-container">
//             {programsFiltered.map((item, i) => (
//                 <div key={i} className="program-card">
//                     <h4># {i}</h4>
//                     <h4>Title: {item.title}</h4>

//                     <Link
//                         to="/dashboard/programs/singleview"
//                         state={{
//                             id: item._id,
//                         }}
//                     >
//                         View Program
//                     </Link>

//                     <h5>id: {item._id}</h5>
//                     HOSTS:
//                     {item.hosts.map((host, h) => (
//                         <h5 key={host._id}>{host.firstName}</h5>
//                     ))}

//                     <h5>description: {item.description}</h5>
//                     {/* <h5>attendance: {item.attendance}</h5> */}
//                     <h5>Days Of Week: {item.daysOfWeek}</h5>
//                     <h5>Date Added: {item.dateAdded}</h5>
//                     <h5>
//                         {item.archived ? <>ARCHIVED</> : <>ACTIVE</>}
//                     </h5>
//                     <button onClick={() => deleteProgram(item._id)}>
//                         Delete Program
//                     </button>
//                 </div>
//             ))}
//         </div>
//     </div>
// </div>
