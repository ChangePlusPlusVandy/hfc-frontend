import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Programs.css";
import CreateProgramPopup from "./CreateProgramPopup";

const Programs = () => {
    const [programs, setPrograms] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [sortBy, setSortBy] = useState("alphabetical");
    const [archivedSort, setArchivedSort] = useState("All");
    const [searchProgram, setSearchProgram] = useState("");

    useEffect(() => {
        getPrograms();
    }, []);

    const sortPrograms = (arr) => {
        let arrTmp = arr;
        let sortByTmp = sortBy;
        console.log(sortByTmp);
        if (sortByTmp.localeCompare("alphabetical") == 0) {
            arr.sort((item1, item2) => {
                return item1.title.localeCompare(item2.title);
            });
        } else if (sortByTmp.localeCompare("alphabeticalReverse") == 0) {
            arr.sort((item1, item2) => {
                return item2.title.localeCompare(item1.title);
            });
        } else if (sortByTmp.localeCompare("startDate") == 0) {
            arr.sort((item1, item2) => {
                return item1.startDate?.localeCompare(item2.startDate);
            });
        } else if (sortByTmp.localeCompare("startDateReverse") == 0) {
            arr.sort((item1, item2) => {
                return item2.startDate?.localeCompare(item1.startDate);
            });
        } else if (sortByTmp.localeCompare("dateAdded") == 0) {
            arr.sort((item1, item2) => {
                return item1.dateAdded?.localeCompare(item2.dateAdded);
            });
        } else if (sortByTmp.localeCompare("dateAddedReverse") == 0) {
            arr.sort((item1, item2) => {
                return item2.dateAdded?.localeCompare(item1.dateAdded);
            });
        }
        console.log(arr);
        return arr;
    };

    // TODO: Use useEffects for filtering and sorting

    const programsFiltered = sortPrograms(
        programs
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
            })
    );

    const getPrograms = async () => {
        try {
            let data = await fetch("http://localhost:3000/programs");
            data = await data.json();
            setPrograms(sortPrograms(data));
        } catch (err) {
            console.log(err);
        }
    };

    const handleSortValChange = (e) => {
        setSortBy(e);
        resetSortDropdown();
    };

    // TODO: Instead of .style, use conditional classes (there should be no .getElementById or .style in React)

    const resetSortDropdown = () => {
        if (document.getElementById("sort-dropdown"))
            document.getElementById("sort-dropdown").style.display = "none";
        if (document.getElementById("sort-option-AtoZ"))
            document.getElementById("sort-option-AtoZ").style.display = "none";
        if (document.getElementById("sort-option-start-date"))
            document.getElementById("sort-option-start-date").style.display =
                "none";
        if (document.getElementById("sort-option-date-added"))
            document.getElementById("sort-option-date-added").style.display =
                "none";
    };

    const resetFilterDropdown = () => {
        if (document.getElementById("filter-dropdown"))
            document.getElementById("filter-dropdown").style.display = "none";
        if (document.getElementById("status-options-dropdown"))
            document.getElementById("status-options-dropdown").style.display =
                "none";
    };

    const handleSearchChange = (e) => {
        setSearchProgram(e.target.value);
        console.log(searchProgram);
    };

    const handleSortArchivedChange = (e) => {
        setArchivedSort(e.target.value);
        statusOptionsDropdown();
        filterDropdown();
    };

    const sortDropdown = () => {
        resetFilterDropdown();
        let click = document.getElementById("sort-dropdown");
        if (click) {
            if (click.style.display === "none") {
                click.style.display = "flex";
                click.style.width = "100%";
            } else {
                resetSortDropdown();
                click.style.display = "none";
            }
        }
    };
    const sortOptionsDropdown = () => {
        let click = document.getElementById("sort-options-dropdown");
        if (click) {
            if (click.style.display === "none") {
                click.style.display = "flex";
                click.style.flexDirection = "column";
            } else {
                click.style.display = "none";
            }
        }
    };

    const sortOptionAToZ = () => {
        let click = document.getElementById("sort-option-AtoZ");
        if (document.getElementById("sort-option-start-date"))
            document.getElementById("sort-option-start-date").style.display =
                "none";
        if (document.getElementById("sort-option-date-added"))
            document.getElementById("sort-option-date-added").style.display =
                "none";

        if (click) {
            if (click.style.display === "none") {
                click.style.display = "flex";
                click.style.width = "100%";
            } else {
                click.style.display = "none";
            }
        }
    };
    const sortOptionStartDate = () => {
        let click = document.getElementById("sort-option-start-date");
        if (document.getElementById("sort-option-AtoZ"))
            document.getElementById("sort-option-AtoZ").style.display = "none";
        if (document.getElementById("sort-option-date-added"))
            document.getElementById("sort-option-date-added").style.display =
                "none";

        if (click) {
            if (click.style.display === "none") {
                click.style.display = "flex";
                click.style.width = "100%";
            } else {
                click.style.display = "none";
            }
        }
    };
    const sortOptionDateAdded = () => {
        let click = document.getElementById("sort-option-date-added");

        if (document.getElementById("sort-option-AtoZ"))
            document.getElementById("sort-option-AtoZ").style.display = "none";
        if (document.getElementById("sort-option-start-date"))
            document.getElementById("sort-option-start-date").style.display =
                "none";

        if (click) {
            if (click.style.display === "none") {
                click.style.display = "flex";
                click.style.width = "100%";
            } else {
                click.style.display = "none";
            }
        }
    };

    const filterDropdown = () => {
        resetSortDropdown();
        let click = document.getElementById("filter-dropdown");
        if (click) {
            if (click.style.display === "none") {
                click.style.display = "flex";
                click.style.width = "100%";
            } else {
                click.style.display = "none";
            }
        }
    };

    const statusOptionsDropdown = () => {
        let click = document.getElementById("status-options-dropdown");
        if (click) {
            if (click.style.display === "none") {
                click.style.display = "flex";
                click.style.flexDirection = "column";
            } else {
                click.style.display = "none";
            }
        }
    };

    return (
        <div className="program-list-view-container">
            <CreateProgramPopup
                closeModal={() => setOpenModal(false)}
                openModal={openModal}
                reloadList={getPrograms}
            />
            <h1>Program Overview</h1>
            <div className="program-sort-options-container">
                <div className="sort-options">
                    <div className="dropdown">
                        <button
                            onClick={filterDropdown}
                            className="filter-options"
                        >
                            Filter
                        </button>
                        <div
                            className="two-dropdown-container"
                            onClick={statusOptionsDropdown}
                        >
                            <div
                                id="filter-dropdown"
                                style={{ display: "none" }}
                            >
                                <div className="status-options-container">
                                    <div className="status-options-sub">
                                        <h6>STATUS</h6>
                                        <div className="status-options-main">
                                            <h5>{archivedSort} Programs</h5>
                                            <h5>&gt;</h5>
                                        </div>
                                    </div>
                                    <div
                                        id="status-options-dropdown"
                                        style={{ display: "none" }}
                                        onChange={handleSortArchivedChange}
                                    >
                                        <input
                                            type="radio"
                                            value="Archived"
                                            name="sortVal"
                                            id="radio1"
                                            className="sort-radio-button"
                                        />
                                        <label htmlFor="radio1">Archived</label>

                                        <input
                                            type="radio"
                                            value="Active"
                                            name="sortVal"
                                            id="radio2"
                                            className="sort-radio-button"
                                        />
                                        <label htmlFor="radio2">Active</label>

                                        <input
                                            type="radio"
                                            value="All"
                                            name="sortVal"
                                            id="radio3"
                                            className="sort-radio-button"
                                        />
                                        <label htmlFor="radio3">All</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dropdown">
                        <button
                            onClick={sortDropdown}
                            className="sort-to-options"
                        >
                            Sort
                        </button>
                        <div
                            className="sort-dropdown-container"
                            onClick={sortOptionsDropdown}
                        >
                            <div id="sort-dropdown" style={{ display: "none" }}>
                                <div
                                    className="sort-options-container"
                                    onChange={(e) =>
                                        handleSortValChange(e.target.value)
                                    }
                                >
                                    <input
                                        type="radio"
                                        value="alphabetical"
                                        id="sort1"
                                        name="sortVal"
                                        className="sort-radio-button"
                                    />
                                    <input
                                        type="radio"
                                        value="alphabeticalReverse"
                                        id="sort2"
                                        name="sortVal"
                                        className="sort-radio-button"
                                    />
                                    <div
                                        className="outer-label"
                                        onClick={sortOptionAToZ}
                                    >
                                        <h6>NAME</h6>
                                        <div className="sort-options-main">
                                            <h5>A-Z</h5>
                                            <h5>&gt;</h5>
                                        </div>
                                    </div>

                                    <div
                                        id="sort-option-AtoZ"
                                        style={{ display: "none" }}
                                    >
                                        <div className="sort-inner-options-container">
                                            <label
                                                htmlFor="sort1"
                                                className="sort-options-sub"
                                            >
                                                <h5>A-Z</h5>
                                            </label>
                                            <label
                                                htmlFor="sort2"
                                                className="sort-options-sub"
                                            >
                                                <h5>Z-A</h5>
                                            </label>
                                        </div>
                                    </div>

                                    <input
                                        type="radio"
                                        value="startDate"
                                        id="sort3"
                                        name="sortVal"
                                        className="sort-radio-button"
                                    />
                                    <input
                                        type="radio"
                                        value="startDateReverse"
                                        id="sort4"
                                        name="sortVal"
                                        className="sort-radio-button"
                                    />
                                    <div
                                        className="outer-label"
                                        onClick={sortOptionStartDate}
                                    >
                                        <h6>START DATE</h6>
                                        <div className="sort-options-main">
                                            <h5>Newest-Oldest</h5>
                                            <h5>&gt;</h5>
                                        </div>
                                    </div>
                                    <div
                                        id="sort-option-start-date"
                                        style={{ display: "none" }}
                                    >
                                        <div className="sort-inner-options-container">
                                            <label
                                                htmlFor="sort3"
                                                className="sort-options-sub"
                                                id="middle-sort-option"
                                                onClick={sortOptionStartDate}
                                            >
                                                <h5>Newest-Oldest</h5>
                                            </label>
                                            <label
                                                htmlFor="sort4"
                                                className="sort-options-sub"
                                                id="middle-sort-option"
                                                onClick={sortOptionStartDate}
                                            >
                                                <h5>Oldest-Newest</h5>
                                            </label>
                                        </div>
                                    </div>

                                    <input
                                        type="radio"
                                        value="dateAdded"
                                        id="sort5"
                                        name="sortVal"
                                        className="sort-radio-button"
                                    />
                                    <input
                                        type="radio"
                                        value="dateAddedReverse"
                                        id="sort6"
                                        name="sortVal"
                                        className="sort-radio-button"
                                    />
                                    <div
                                        className="outer-label"
                                        onClick={sortOptionDateAdded}
                                    >
                                        <div className="sort-options-sub">
                                            <h6>DATE ADDED</h6>
                                            <div className="sort-options-main">
                                                <h5>Newest-Oldest</h5>
                                                <h5>&gt;</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        id="sort-option-date-added"
                                        style={{ display: "none" }}
                                    >
                                        <div className="sort-inner-options-container">
                                            <label
                                                htmlFor="sort5"
                                                className="sort-options-sub"
                                                id="middle-sort-option"
                                            >
                                                <h5>Newest-Oldest</h5>
                                            </label>
                                            <label
                                                htmlFor="sort6"
                                                className="sort-options-sub"
                                                id="middle-sort-option"
                                            >
                                                <h5>Oldest-Newest</h5>
                                            </label>
                                        </div>
                                    </div>
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
                    <button
                        onClick={() => setOpenModal(true)}
                        className="submit-button"
                    >
                        Create Program
                    </button>
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
                                to={`/dashboard/programs/singleview/${item._id}`}
                            >
                                {item.title}
                            </Link>
                        </h4>
                        <h4 className="program-id">{item._id}</h4>
                        <h4 className="program-start-date">
                            {item.startDate?.split("T")[0]}
                        </h4>
                        <h4 className="program-date-added">
                            {item.dateAdded.split("T")[0]}
                        </h4>
                        {item.archived ? (
                            <h4 className="program-status">Archived</h4>
                        ) : (
                            <h4 className="program-status">Active</h4>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Programs;
