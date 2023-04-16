import React, { useEffect, useState } from "react";
import "./Workshops.css";
import Select from "react-select";
import { Link } from "react-router-dom";
import { WorkshopCreateForm } from "./CreateWorkshop";
export const WorkshopsList = () => {
    const [searchWorkshop, setSearchWorkshop] = useState("");
    const [archivedSort, setArchivedSort] = useState("All");


    const [showPopup, setShowPopup] = useState(false);
    const [workshops, setWorkshops] = useState([]);
    const [sortBy, setSortBy] = useState("alphabetical");
    const [filteredWorkshops, setFilteredWorkshops] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [hostOptions, setHostOptions] = useState([]);
    useEffect(() => {
        getWorkshops();
    }, []);


    const sortWorkshops = (arr) => {
        let sortByTmp = sortBy;
        console.log(sortByTmp);
        if (sortByTmp?.localeCompare("alphabetical") == 0) {
            arr.sort((item1, item2) => {
                return item1.title?.localeCompare(item2.title);
            });
        } else if (sortByTmp?.localeCompare("alphabeticalReverse") == 0) {
            arr.sort((item1, item2) => {
                return item2.title?.localeCompare(item1.title);
            });
        } else if (sortByTmp?.localeCompare("startDate") == 0) {
            arr.sort((item1, item2) => {
                return item1.date?.localeCompare(item2.date);
            });
        } else if (sortByTmp?.localeCompare("startDateReverse") == 0) {
            arr.sort((item1, item2) => {
                return item2.date?.localeCompare(item1.date);
            });
        }
        console.log(arr);
        return arr;
    };

    const FilteredWorkshops = sortWorkshops(
        workshops.filter((item) => {
            return searchWorkshop !== ""
                ? item.title.includes(searchWorkshop)
                : item;
        })
            .filter((item) => {
                if (archivedSort.localeCompare("All") == 0) return item;
                if (archivedSort.localeCompare("Active") == 0)
                    return item.archived === false;
                else return item.archived === true;
            })
    );


    const handleSearchChange = (e) => {
        setSearchWorkshop(e.target.value);
        console.log(searchProgram);
    };

    // Fetch workshops
    const handleCreate = () => {
        setShowPopup(true);
    };
    const handleClosePopup = () => {
        setShowPopup(false);
        getWorkshops();
    };
    const getWorkshops = () => {
        //TODO: Error handling
        fetch("http://localhost:3000/workshops")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched workshops:");
                //TODO: Use map, and do in backend. populate
                fetch("http://localhost:3000/users/users")
                    .then((response2) => response2.json())
                    .then((data2) => {
                        let tempOptions = data2
                            .filter((item) => item.firstName && item.lastName)
                            .map((item) => {
                                return {
                                    value: item._id,
                                    label: item.firstName + " " + item.lastName,
                                };
                            });
                        console.log(tempOptions);
                        for (let i = 0; i < data.length; i++) {
                            for (let j = 0; j < data[i].hosts.length; j++) {
                                for (let k = 0; k < tempOptions.length; k++) {
                                    if (
                                        data[i].hosts[j] == tempOptions[k].value
                                    ) {
                                        data[i].hosts[j] = tempOptions[k].label;
                                    }
                                }
                            }
                        }
                        setWorkshops(data);
                        setHostOptions(tempOptions);

                        // filterWorkshops(data, search, filter);
                    });
            });
    };




    const handleSortValChange = (e) => {
        setSortBy(e);
        //reset

    };


    const filterDropdown = () => {
        //resetSortDropdown();
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

    const handleSortArchivedChange = (e) => {
        setArchivedSort(e.target.value);
        statusOptionsDropdown();
        filterDropdown();
    };

    const sortDropdown = () => {
        //resetFilterDropdown();
        let click = document.getElementById("sort-dropdown");
        if (click) {
            if (click.style.display === "none") {
                click.style.display = "flex";
                click.style.width = "100%";
            } else {
                //resetSortDropdown();
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

    return (
        <div className="workshop-list-view-container">
            {showPopup && <WorkshopCreateForm onClose={handleClosePopup} />}
            <h1>Workshop Overview</h1>
            <div className="workshop-sort-options-container">
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

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-and-create">
                    <input
                        type="text"
                        name="search-bar"
                        placeholder="Search Workshop"
                        onChange={(e) => handleSearchChange(e)}
                    />
                    <button
                        onClick={() => setShowPopup(true)}
                        className="submit-button"
                    >
                        Create Workshop
                    </button>
                </div>
            </div>
            <div className="workshop-list-header">
                <h4 className="workshop-title">Program Title</h4>
                <h4 className="workshop-description">Description</h4>
                <h4 className="workshop-start-date">Date</h4>
                <h4 className="workshop-status">Status</h4>
            </div>
            <div className="workshop-list">
                {FilteredWorkshops.map((item, i) => (
                    <Link key={i} to={"./" + item._id}>
                        <div className="workshop-card">
                            <h4 className="workshop-title">{item.title}</h4>
                            <h4 className="workshop-description">
                                {item.description.slice(0, 80)}...
                            </h4>
                            <h4 className="workshop-start-date">
                                {item.date?.split("T")[0]}
                            </h4>

                            {item.archived ? (
                                <h4 className="workshop-status">Archived</h4>
                            ) : (
                                <h4 className="workshop-status">Active</h4>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div >
    );
};














// import React, { useEffect, useState } from "react";
// import "./Workshops.css";
// import Select from "react-select";
// import { Link } from "react-router-dom";
// import { WorkshopCreateForm } from "./CreateWorkshop";
// export const WorkshopsList = () => {
//     const [showPopup, setShowPopup] = useState(false);
//     const [workshops, setWorkshops] = useState([]);
//     const [sortBy, setSortBy] = useState("alphabetical");
//     const [filteredWorkshops, setFilteredWorkshops] = useState([]);
//     const [search, setSearch] = useState("");
//     const [filter, setFilter] = useState("all");
//     const [hostOptions, setHostOptions] = useState([]);
//     // Fetch workshops
//     const handleCreate = () => {
//         setShowPopup(true);
//     };
//     const handleClosePopup = () => {
//         setShowPopup(false);
//         getWorkshops();
//     };
//     const getWorkshops = () => {
//         //TODO: Error handling
//         fetch("http://localhost:3000/workshops")
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log("Fetched workshops:");
//                 //TODO: Use map, and do in backend. populate
//                 fetch("http://localhost:3000/users/users")
//                     .then((response2) => response2.json())
//                     .then((data2) => {
//                         let tempOptions = data2
//                             .filter((item) => item.firstName && item.lastName)
//                             .map((item) => {
//                                 return {
//                                     value: item._id,
//                                     label: item.firstName + " " + item.lastName,
//                                 };
//                             });
//                         console.log(tempOptions);
//                         for (let i = 0; i < data.length; i++) {
//                             for (let j = 0; j < data[i].hosts.length; j++) {
//                                 for (let k = 0; k < tempOptions.length; k++) {
//                                     if (
//                                         data[i].hosts[j] == tempOptions[k].value
//                                     ) {
//                                         data[i].hosts[j] = tempOptions[k].label;
//                                     }
//                                 }
//                             }
//                         }
//                         setWorkshops(data);
//                         setHostOptions(tempOptions);
//                         sortWorkshops("alphabetical", data);
//                         filterWorkshops(data, search, filter);
//                     });
//             });
//     };

//     useEffect(() => {
//         getWorkshops();
//     }, []);

//     const handleSearchChange = (e) => {
//         setSearch(e.target.value);
//         filterWorkshops(workshops, e.target.value, filter);
//     };

//     const handleSortValChange = (e) => {
//         setSortBy(e.value);
//         sortWorkshops(e.value, workshops);
//     };

//     const handleFilterChange = (e) => {
//         setFilter(e.value);
//         filterWorkshops(workshops, search, e.value);
//     };

//     const sortWorkshops = (sort, ws) => {
//         if (sort == "alphabetical") {
//             ws.sort((item1, item2) => {
//                 return item1.title.localeCompare(item2.title);
//             });
//         } else if (sort == "dateAdded") {
//             ws.sort((item1, item2) => {
//                 return item1._id.localeCompare(item2._id);
//             });
//         } else if (sort == "workDate") {
//             ws.sort((item1, item2) => {
//                 return item1.date.localeCompare(item2.date);
//             });
//         }
//         setWorkshops(ws);
//         filterWorkshops(ws, search, filter);
//     };

//     const filterWorkshops = (ws, srch, fltr) => {
//         console.log(ws, srch, fltr);
//         let temp = ws.filter((item) => {
//             if (fltr == "archived" && !item.archived) {
//                 return false;
//             }
//             if (fltr == "active" && item.archived) {
//                 return false;
//             }
//             return (
//                 !srch || item.title.toLowerCase().includes(srch.toLowerCase())
//             );
//         });
//         console.log(temp);
//         setFilteredWorkshops(temp);
//     };

//     return (
//         <div className="workshops-page-container">
//             <h1>Workshop Overview</h1>

//             {showPopup && <WorkshopCreateForm onClose={handleClosePopup} />}

//             <div className="sortAndSearch">
//                 <Select
//                     className="workshop-input"
//                     options={[
//                         { value: "alphabetical", label: "Alphabetical" },
//                         {
//                             value: "dateAdded",
//                             label: "Date Added (earliest first)",
//                         },
//                         { value: "workDate", label: "Workshop Date" },
//                     ]}
//                     placeholder="Sort"
//                     onChange={handleSortValChange}
//                     value={filter}
//                 />
//                 <div className="workshop-input">
//                     <Select
//                         options={[
//                             { value: "all", label: "all" },
//                             { value: "active", label: "active" },
//                             { value: "archived", label: "archived" },
//                         ]}
//                         placeholder="Filter"
//                         onChange={handleFilterChange}
//                         value={filter}
//                     />
//                 </div>
//                 <input
//                     type="text"
//                     className="workshop-input"
//                     placeholder="Search..."
//                     onChange={(e) => handleSearchChange(e)}
//                 />

//                 <div className="dropdown">
//                     <button onClick={handleCreate} className="submit-button">
//                         Create
//                     </button>
//                 </div>
//             </div>
//             <br></br>
//             <div className="workshops-list-container">
//                 <div className="workshops-card">
//                     <h3> TITLE</h3>

//                     <h3> DESCRIPTION</h3>
//                     <h3>DATE</h3>
//                     <h3>STATUS</h3>
//                 </div>
//             </div>
//             <div className="workshops-list-container">
//                 {filteredWorkshops.map((item, i) => (
//                     <div key={i}>
//                         <Link className="workshops-card" to={"./" + item._id}>
//                             <h4> {item.title}</h4>
//                             <h4>
//                                 {item.description?.length < 40
//                                     ? item.description
//                                     : item.description.substring(0, 40) + "..."}
//                             </h4>
//                             <h4>
//                                 {" "}
//                                 {
//                                     new Date(item.date)
//                                         .toString()
//                                         .substring(0, 10)
//                                     //todo: dates are off by one
//                                 }
//                             </h4>

//                             <h4>
//                                 {item.archived ? <>ARCHIVED</> : <>ACTIVE</>}{" "}
//                                 &emsp;
//                             </h4>
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//             <br></br>
//             <br></br>
//         </div>
//     );
// };
