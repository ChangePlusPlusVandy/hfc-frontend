import React, { useEffect, useState } from "react";
import "./Workshops.css";
import Select from "react-select";
import { Link } from "react-router-dom";

export const WorkshopsList = () => {
    const [workshops, setWorkshops] = useState([]);
    const [sortBy, setSortBy] = useState("alphabetical");
    const [filteredWorkshops, setFilteredWorkshops] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [hostOptions, setHostOptions]=useState([])
    // Fetch workshops
    const getWorkshops = () => {
        fetch("http://localhost:3000/workshops")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched workshops:");
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
                        console.log(tempOptions)
                    for(let i=0; i<data.length;i++){
                        for(let j=0; j<data[i].hosts.length;j++){
                            for(let k=0; k<tempOptions.length;k++){
                                if(data[i].hosts[j]==tempOptions[k].value){
                                    data[i].hosts[j]=tempOptions[k].label                                }
                            }
                        }
                    }
                    setHostOptions(tempOptions);
                    setWorkshops(data);
                    filterWorkshops(data, search, filter);
                });                
            });
    };

    useEffect(() => {
        getWorkshops();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        filterWorkshops(workshops, e.target.value, filter);
    };

    const handleSortValChange = (e) => {
        setSortBy(e.target.value);
        sortWorkshops(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilter(e.value);
        filterWorkshops(workshops, search, e.value);
    };

    const sortWorkshops = (sort) => {
        if (sort == "alphabetical") {
            workshops.sort((item1, item2) => {
                return item1.title.localeCompare(item2.title);
            });
        } else if (sort == "dateAdded") {
            workshops.sort((item1, item2) => {
                return item1._id.localeCompare(item2._id);
            });
        }
        filterWorkshops(workshops, search, filter);
    };

    const filterWorkshops = (ws, srch, fltr) => {
        
        let temp = ws.filter((item) => {
            if (fltr == "archived" && !item.archived) {
                return false;
            }
            if (fltr == "active" && item.archived) {
                return false;
            }
            return (
                (!srch)||
                item.title.toLowerCase().includes(srch.toLowerCase())
            );
        });
        setFilteredWorkshops(temp);
    };

    return (
        <div className="workshops-page-container">
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
            <div className="workshops-list-container">
                {filteredWorkshops.map((item, i) => (
                    <div key={i} className="workshops-card">
                        
                        <h3> {item.title} &emsp;</h3>
                        <h5>{item.archived ? <>ARCHIVED</> : <>ACTIVE</>} &emsp;</h5>
                        <h5> Description: {item.description}</h5>
                        <h5> {item.hosts.length>0 ? <>Hosts: {item.hosts.join(", ")}</> : <></>}</h5>

                        <Link className="button"
                                to="../singleview"
                                state={{
                                    id: item._id,
                                }}
                            >View Workshop</Link>
                    </div>

                ))}
            </div>
        </div>
    );
};
