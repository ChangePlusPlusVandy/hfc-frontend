import React, { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import "./Workshops.css";
import Select from "react-select";
export const WorkshopsList = () => {
    const [workshops, setWorkshops] = useState([]);
    const [sortBy, setSortBy]=useState("alphabetical")
    const [search, setSearch]=useState("")
    const [filter, setFilter]=useState("all")
    // Fetch workshops
    const getWorkshops=()=>{
        fetch("http://localhost:3000/workshops")
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched workshops:");
            console.log(data);
            setWorkshops(data);
        });

    }
    useEffect(() => {
        
        getWorkshops();
        setSearch("")
        

    }, []);
    const handleSearchChange=(e)=>{
        setSearch(e.target.value)
    }
    const handleSortValChange = (e) => {
        setSortBy(e.target.value);
        sortWorkshops();
    };
    const handleFilterChange=(e) =>{
        setFilter(e.value).then(filterWorkshops());
    }

    const sortWorkshops=()=>{
        if(sortBy==="alphabetical"){
            workshops.sort((item1, item2) => {
                return item1.title.localeCompare(item2.title);
            });
        }
        else if(sortBy==="dateAdded"){
            workshops.sort((item1, item2) => {
                return item1._id.localeCompare(item2._id);
            });
        }
    }
    let filteredWorkshops=workshops.filter((item)=>{
            if(filter=="archived"&&!item.archived){
                return false;
            }
            if(filter=="active"&&item.archived){
                return false;
            }
            return !search||(item.title).toLowerCase().includes(search.toLowerCase());
        })
    
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

                    {filteredWorkshops.map((item, i) => (
                        <div key={i} className="card">
                            <h1> {item.title}</h1>


                            <h3> {item.description}</h3>
                            <h5>
                                {item.archived ? <>ARCHIVED</> : <>ACTIVE</>}
                            </h5>
                            <Link className="button" to="../singleview" state={{id: item._id}}>
                    View  Workshop
                </Link>
                        </div>
                    ))}        

       </div>

    );
};
