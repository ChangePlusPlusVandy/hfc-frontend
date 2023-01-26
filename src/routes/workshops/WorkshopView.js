import React, { useEffect, useState } from "react";
import "./Workshops.css";
import Select from "react-select";
export const WorkshopsList = () => {
    const [workshops, setWorkshops] = useState([]);
    const [sortBy, setSortBy] = useState("alphabetical");
    const [filteredWorkshops, setFilteredWorkshops] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    // Fetch workshops
    const getWorkshops = () => {
        fetch("http://localhost:3000/workshops")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched workshops:");
                console.log(data);
                setWorkshops(data);
                filterWorkshops();
            });
    };
    
    useEffect(() => {
        getWorkshops();
        setSearch("");
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        filterWorkshops();
    };

    const handleSortValChange = (e) => {
        setSortBy(e.target.value);
        sortWorkshops();
    };

    const handleFilterChange = (e) => {
        setFilter(e.value);
        filterWorkshops();
    };

    const sortWorkshops = () => {
        if (sortBy === "alphabetical") {
            workshops.sort((item1, item2) => {
                return item1.title.localeCompare(item2.title);
            });
        } else if (sortBy === "dateAdded") {
            workshops.sort((item1, item2) => {
                return item1._id.localeCompare(item2._id);
            });
        }
        filterWorkshops();
    };

    const filterWorkshops = () => {
        let temp = workshops.filter((item) => {
            if (filter == "archived" && !item.archived) {
                return false;
            }
            if (filter == "active" && item.archived) {
                return false;
            }
            return (
                search &&
                item.title.toLowerCase().includes(search.toLowerCase())
            );
        });
        setFilteredWorkshops(temp);
    };

    return (
        <div className="workshops">
            <h1>Workshops:</h1>
            <div className="sortAndSearch">
                <div
                    className="sortIndicator"
                    onChange={(e) => handleSortValChange(e)}
                >
                    <h3>Sort By:</h3>
                    <input type="radio" value="dateAdded" name="sortVal" />
                    Date Added
                    <input type="radio" value="alphabetical" name="sortVal" />
                    Alphabetical
                </div>
                <div className="singleSearch">
                    <input
                        type="text"
                        name="search-bar"
                        placeholder="Search..."
                        onChange={(e) => handleSearchChange(e)}
                    />
                </div>
                <div className="dropdown">
                    <Select
                        options={[
                            { value: "all", label: "all" },
                            { value: "active", label: "active" },
                            { value: "archived", label: "archived" },
                        ]}
                        placeholder="Choose Filter"
                        onChange={handleFilterChange}
                        value={filter}
                    />
                </div>
            </div>
            <div>
                {filteredWorkshops.map((item, i) => (
                    <div>
                        <h2> {item.title}</h2>
                        <h3> {item.description}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};
