import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Programs.css";

const Programs = () => {
    const [programs, setPrograms] = useState([]);
    const [sortBy, setSortBy] = useState("alphabetical");
    const [archivedSort, setArchivedSort] = useState("all");
    const [searchProgram, setSearchProgram] = useState("");

    const [newProgram, setNewProgram] = useState({
        title: "",
        //hosts: "",
        description: "",
        archived: false,
    });

    useEffect(() => {
        getPrograms();
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
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProgram),
        };
        await fetch("http://localhost:3000/programs", requestOptions);
        getPrograms();
        setNewProgram({
            title: "",
            //hosts: "",
            description: "",
            archived: false,
        });
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

    //Updates newProgram info
    const handleTitleChange = (e) => {
        setNewProgram(() => ({
            ...newProgram,
            title: e.target.value,
        }));
    };
    const handleHostChange = (e) => {
        setNewProgram(() => ({
            ...newProgram,
            //hosts: e.target.value,
        }));
    };
    const handleArchivedChange = (e) => {
        if (e.target.value.localeCompare("true") == 0) {
            setNewProgram(() => ({
                ...newProgram,
                archived: true,
            }));
        } else {
            setNewProgram(() => ({
                ...newProgram,
                archived: false,
            }));
        }
    };
    const handleDescChange = (e) => {
        setNewProgram(() => ({
            ...newProgram,
            description: e.target.value,
        }));
    };

    return (
        <div className="programs-container">
            <h1>Programs: 6386ba96c71942148162a7b2</h1>
            <h1>63cc4f1d38c9a5e3ceb66e3d</h1>
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
                                to="singleview"
                                state={{
                                    id: item._id,
                                }}
                            >
                                View Program
                            </Link>

                            <h5>id: {item._id}</h5>
                            <h5>hosts: {item.hosts}</h5>

                            <h5>description: {item.description}</h5>
                            <h5>attendance: {item.attendance}</h5>
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
            <h1>Add A program</h1>
            <div>
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
            </div>
        </div>
    );
};

export default Programs;
