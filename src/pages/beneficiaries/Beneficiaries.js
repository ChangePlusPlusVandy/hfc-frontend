import React, { useEffect, useState } from "react";
import SingleBenficiary from "./components/SingleBfc";
import FilterButton from "./components/FilterButton";
import { NavLink } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Select from "react-dropdown-select";

import "./Beneficiaries.css";

const FILTER_MAP = {
    All: () => true,
    Active: (item) => !item.archived,
    Archived: (item) => item.archived,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const Beneficiaries = () => {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Active");
    const [activeFilter, setActiveFilter] = useState(true);
    const [archivedFilter, setArchivedFilter] = useState(false);
    const [interestsFilter, setInterestsFilter] = useState([]);

    // function toggleBfcArchived(id) {
    //     const updateBfc = beneficiary.map((item) => {
    //         // if this bfc has the same ID as the edited
    //         if (id == item.id) {
    //             return { ...item, archived: !item.archived };
    //         }
    //         return item;
    //     });
    //     setBeneficiary(updateBfc);
    // }

    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    const deleteBfc = (id) => {
        console.log(id);
        fetch(`http://localhost:3000/beneficiaries?id=${id}`, {
            method: "DELETE",
        }).then(async () => {
            try {
                let data = await fetch("http://localhost:3000/beneficiaries");
                data = await data.json();
                setBeneficiaries(data);
                console.log(beneficiaries);
            } catch (error) {
                console.error(error);
            }
        });
    };

    const sortByFirstName = () => {
        let data = [...beneficiaries];
        data.sort((a, b) => a.firstName.localeCompare(b.firstName));
        console.log("hi");
        setBeneficiaries(data);
    };

    const sortByLastName = () => {
        let data = [...beneficiaries];
        data.sort((a, b) => a.lastName.localeCompare(b.lastName));
        console.log(data);
        setBeneficiaries(data);
    };

    const sortByDate = () => {
        let data = [...beneficiaries];
        data.sort(function (a, b) {
            const dateA = new Date(a.joinDate);
            const dateB = new Date(b.joinDate);
            return dateB - dateA;
        });
        // console.log(data);
        setBeneficiaries(data);
    };

    const handleChangeFilter = () => {
        set;
    };

    const handleChangeSort = (selectedOptions) => {
        switch (selectedOptions[0].value) {
            case 1:
                sortByFirstName();
                break;
            case 2:
                sortByLastName();
                break;
            case 3:
                sortByDate();
                break;
        }
    };

    const sortOptions = [
        {
            value: 1,
            label: "Sort By First Name",
        },
        {
            value: 2,
            label: "Sort By Last Name",
        },
        {
            value: 3,
            label: "Sort By Join Date",
        },
    ];

    const filterOptions = [
        { name: "All", id: 1 },
        { name: "Active", id: 2 },
        { name: "Archived", id: 3 },
        { name: "Interest1", id: 4 },
        { name: "Interest2", id: 5 },
        { name: "Need1", id: 6 },
        { name: "Need2", id: 7 },
    ];

    /*
    beneficiaries.filter((beneficiary) => (
        beneficiary.archived === archivedFilter
    ))

    if (activeFilter && !archivedFilter && !interestsFilter) {
        return true; 
    } 
    return (
        beneficiary.archived === archivedFilter || "" === !activeFilter
        set(beneficiary.interests).intersection(set(interestsF))
    )
    */

    useEffect(() => {
        const getBeneficiaries = async () => {
            try {
                let data = await fetch("http://localhost:3000/beneficiaries");
                data = await data.json();
                let dataCopy = [...data];
                dataCopy.sort((a, b) => a.firstName.localeCompare(b.firstName));
                setBeneficiaries(dataCopy);
                console.log(data);
                console.log(beneficiaries);
            } catch (error) {
                console.error(error);
            }
        };
        // eventualy we should only call this if user has correct auth/permissions
        getBeneficiaries();
    }, []);

    useEffect(() => {
        let beneficiariesCopy = [...beneficiaries];
        beneficiariesCopy.filter(
            (beneficiary) =>
                (!activeFilter && !archivedFilter && !interestsFilter) ||
                beneficiary.archived === archivedFilter ||
                beneficiary.archived !== activeFilter ||
                Set(beneficiary.interests).intersection(Set(interestsFilter))
        );
        setBeneficiaries(beneficiariesCopy);
    }, [activeFilter, archivedFilter, interestsFilter]);

    return (
        <div className="beneficiaries-page-container">
            <div className="beneficiaries-page-header">
                <div className="filter-dropdown">
                    <Multiselect
                        displayValue="name"
                        placeholder="Filter"
                        options={filterOptions}
                        showCheckbox
                        onChange={handleChangeFilter}
                    />
                </div>
                <div className="sort-dropdown">
                    <Select
                        placeholder="Sort"
                        options={sortOptions}
                        onChange={handleChangeSort} // FIX THIS PASSING THE NEW VAL AS PARAM
                    />
                </div>
                <div className="search-bar">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        className="del-form"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                {/* 
                <div className="sort-btn-group">
                    <div className="sort-by-first-name">
                        <button onClick={sortByFirstName}>
                            Sort by First Name
                        </button>
                    </div>
                    <div className="sort-by-last-name">
                        <button onClick={sortByLastName}>
                            {" "}
                            Sort by Last Name
                        </button>
                    </div>
                    <div className="sort-by-date">
                        <button onClick={sortByDate}>Sort by Date</button>
                    </div>
                </div>
                <div className="filter-btn">{filterList}</div>
                <div className="register-beneficiary-btn">
                    <NavLink to="../beneficiaries/register">
                        <button> Register a Beneficiary </button>
                    </NavLink>
                </div>
                */}
            </div>
            <div className="beneficiaries-container"></div>
            <h1>Beneficiaries Below: </h1>
            <ul
                role="list"
                className="bfc-list stack"
                aria-labelledby="list-heading"
            >
                {beneficiaries
                    .filter(FILTER_MAP[filter])
                    .filter((value) => {
                        if (search == "") {
                            return value;
                        } else if (
                            value.firstName
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            value.lastName
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            value.id.toString().includes(search)
                        ) {
                            return value;
                        }
                    })
                    .map((item) => (
                        <SingleBenficiary
                            id={item.id}
                            firstName={item.firstName}
                            lastName={item.lastName}
                            gender={item.gender}
                            phone={item.phone}
                            email={item.email}
                            bday={item.bday}
                            archived={item.archived}
                            key={item.id}
                            mongoKey={item._id}
                            deleteBfc={deleteBfc}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default Beneficiaries;
