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
    const [interestsFilter, setInterestsFilter] = useState(false);

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
        setBeneficiaries(data);
    };

    const sortBackwardsByFirstName = () => {
        let data = [...beneficiaries];
        data.sort((a, b) => b.firstName.localeCompare(a.firstName));
        setBeneficiaries(data);
    };

    const sortByLastName = () => {
        let data = [...beneficiaries];
        data.sort((a, b) => a.lastName.localeCompare(b.lastName));
        console.log(data);
        setBeneficiaries(data);
    };

    const sortBackwardsByLastName = () => {
        let data = [...beneficiaries];
        data.sort((a, b) => b.lastName.localeCompare(a.lastName));
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
        setBeneficiaries(data);
    };

    const sortBackwardsByDate = () => {
        let data = [...beneficiaries];
        data.sort(function (a, b) {
            const dateA = new Date(a.joinDate);
            const dateB = new Date(b.joinDate);
            return dateA - dateB;
        });
        setBeneficiaries(data);
    };

    const handleClickArchive = () => {
        setArchivedFilter((prev) => !prev);
        console.log("archived = " + archivedFilter);
    };

    const handleClickActive = () => {
        setActiveFilter((prev) => !prev);
        console.log("active = " + activeFilter); // this maybe is outputting the wrong value??
    };

    const handleChangeInterests = () => {
        console.log("test");
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
            case 4:
                sortBackwardsByFirstName();
                break;
            case 5:
                sortBackwardsByLastName();
                break;
            case 6:
                sortBackwardsByDate();
                break;
        }
    };

    const sortOptions = [
        {
            value: 1,
            label: "Sort By First Name (A-Z)",
        },
        {
            value: 2,
            label: "Sort By Last Name (A-Z)",
        },
        {
            value: 3,
            label: "Sort By Join Date (New to Old)",
        },
        {
            value: 4,
            label: "Sort By First Name (Z-A)",
        },
        {
            value: 5,
            label: "Sort By Last Name (Z-A)",
        },
        {
            value: 6,
            label: "Sort By Date (Old to New)",
        },
    ];

    const interestOptions = [
        { name: "Interest1", id: 1 },
        { name: "Interest2", id: 2 },
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
                !beneficiary.archived === activeFilter ||
                !interestsFilter // ||
            // beneficiary.interests.filter((interest) =>
            // interestsFilter.includes(interest)
            // )
        );
        setBeneficiaries(beneficiariesCopy);
        console.log("finished use effect");
    }, [activeFilter, archivedFilter, interestsFilter]);

    return (
        <div className="beneficiaries-page-container">
            <div className="beneficiaries-page-title">
                <h1> List of Beneficiaries </h1>
            </div>
            <div className="beneficiaries-page-header">
                <div className="filter-dropdown">
                    <div className="active-checkbox">
                        <input
                            type="checkbox"
                            onChange={handleClickActive}
                            defaultChecked
                        />
                        <label for="Active"> Active </label>
                    </div>
                    <div className="archived-checkbox">
                        <input type="checkbox" onChange={handleClickArchive} />
                        <label for="Archived"> Archived </label>
                    </div>
                    <div className="interest-multiselect">
                        <Multiselect
                            displayValue="name"
                            placeholder="Interests"
                            options={interestOptions}
                            onChange={handleChangeInterests}
                            showCheckbox
                        />
                    </div>
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
                {/*}
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
                */}
                <div className="register-beneficiary-btn">
                    <NavLink to="../beneficiaries/register">
                        <button> New </button>
                    </NavLink>
                </div>
            </div>
            <div className="beneficiaries-container"></div>
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
