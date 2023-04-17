import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";

import "./Beneficiaries.css";

const FILTER_MAP = {
    All: () => true,
    Active: (item) => !item.archived,
    Archived: (item) => item.archived,
};

const interestOptions = [
    { name: "Computers", id: 1 },
    { name: "Spoken English", id: 2 },
    { name: "Literacy", id: 3 },
    { name: "Math", id: 4 },
    { name: "Bengali", id: 5 },
    { name: "Arts", id: 6 },
    { name: "Bakery/Cafe", id: 7 },
    { name: "Counseling/Life Skills", id: 8 },
];

const Beneficiary = ({ firstName, lastName, onClick }) => {
    return (
        <button className="beneficiary-container" onClick={onClick}>
            <div className="beneficiary-icon">
                <h2 className="initals">
                    {" "}
                    {firstName.substring(0, 1) + lastName.substring(0, 1)}{" "}
                </h2>
            </div>
            <div>
                <h4 className="user-name">
                    {firstName} {lastName}
                </h4>
            </div>
        </button>
    );
};

const Beneficiaries = () => {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [displayedBeneficiaries, setDisplayedBeneficiaries] = useState([]);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState(true);
    const [archivedFilter, setArchivedFilter] = useState(false);
    const [interestsFilter, setInterestsFilter] = useState(false);
    const [computers, setComputers] = useState(false);
    const [spokenEnglish, setSpokenEnglish] = useState(false);
    const [literacy, setLiteracy] = useState(false);
    const [math, setMath] = useState(false);
    const [bengali, setBengali] = useState(false);
    const [arts, setArts] = useState(false);
    const [bakery, setBakery] = useState(false);
    const [counseling, setCounseling] = useState(false);
    const [numInterests, setNumInterests] = useState(0);
    const navigate = useNavigate();
    // TODO: make these an array of states check if the interests intersect with the desired interests

    const deleteBfc = (id) => {
        console.log(id);
        fetch(`http://localhost:3000/beneficiaries?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
            },
        }).then(async () => {
            try {
                let data = await fetch("http://localhost:3000/beneficiaries");
                data = await data.json();
                setBeneficiaries(data);
                console.log("beneficiaries: " + beneficiaries);
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
        setBeneficiaries(data);
    };

    const sortBackwardsByLastName = () => {
        let data = [...beneficiaries];
        data.sort((a, b) => b.lastName.localeCompare(a.lastName));
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
    };

    const handleClickActive = () => {
        setActiveFilter((prev) => !prev);
    };

    // TODO: this will change with updated state
    const handleSelectInterest = (selectedValues, selectedItem) => {
        setNumInterests((prev) => prev + 1);
        setInterestsFilter(true);
        switch (selectedItem.id) {
            case 1:
                setComputers((prev) => !prev);
                break;
            case 2:
                setSpokenEnglish((prev) => !prev);
                break;
            case 3:
                setLiteracy((prev) => !prev);
                break;
            case 4:
                setMath((prev) => !prev);
                break;
            case 5:
                setBengali((prev) => !prev);
                break;
            case 6:
                setComputers((prev) => !prev);
                break;
            case 7:
                setArts((prev) => !prev);
                break;
            case 8:
                setCounseling((prev) => !prev);
                break;
        }
    };

    const handleRemoveInterest = (selectedValues, selectedItem) => {
        setNumInterests((prev) => prev - 1);
        console.log("numInterests in the handle: " + numInterests);
        if (numInterests === 0) {
            console.log("this is working yay!");
            setInterestsFilter(false);
        }
        switch (selectedItem.id) {
            case 1:
                setComputers((prev) => !prev);
                break;
            case 2:
                setSpokenEnglish((prev) => !prev);
                break;
            case 3:
                setLiteracy((prev) => !prev);
                break;
            case 4:
                setMath((prev) => !prev);
                break;
            case 5:
                setBengali((prev) => !prev);
                break;
            case 6:
                setComputers((prev) => !prev);
                break;
            case 7:
                setArts((prev) => !prev);
                break;
            case 8:
                setCounseling((prev) => !prev);
                break;
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

    const statusOptionsDropdown = () => {
        let click = document.getElementById("status-options-dropdown");
        if (click) {
            if (click.style.display === "none") {
                click.style.display = "flex";
                click.style.flexDirection = "column";
            } else {
                //click.style.display = "none";
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

    useEffect(() => {
        const getBeneficiaries = async () => {
            try {
                let data = await fetch("http://localhost:3000/beneficiaries", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "auth"
                        )}`,
                    },
                });
                data = await data.json();
                let dataCopy = [...data];
                dataCopy.sort((a, b) => a.firstName.localeCompare(b.firstName));
                console.log("data copy:", dataCopy);
                setBeneficiaries(dataCopy);
                setDisplayedBeneficiaries(dataCopy);
            } catch (error) {
                console.error(error);
            }
        };
        // eventualy we should only call this if user has correct auth/permissions
        getBeneficiaries();
    }, []);

    // TODO: change this with updated state
    useEffect(() => {
        console.log("interest filter: " + interestsFilter);
        console.log("numInterests" + numInterests);
        console.log("computers: " + computers);
        if (numInterests === 0) {
            setInterestsFilter(false);
        }
        let beneficiariesCopy = beneficiaries.filter(
            (beneficiary) =>
                (beneficiary.archived === archivedFilter ||
                    beneficiary.archived !== activeFilter) &&
                (!interestsFilter ||
                    (computers &&
                        beneficiary.interests.includes("Computers")) ||
                    (spokenEnglish &&
                        beneficiary.interests.includes("English")) ||
                    (arts && beneficiary.interests.includes("Arts")) ||
                    (literacy && beneficiary.interests.includes("Literacy")) ||
                    (bengali && beneficiary.interests.includes("Bengali")) ||
                    (bakery && beneficiary.interests.includes("Bakery")) ||
                    (counseling &&
                        beneficiary.interests.includes("Counseling")) ||
                    (literacy && beneficiary.interests.includes("Literacy")) ||
                    (math && beneficiary.interests.includes("Math")))
        );
        setDisplayedBeneficiaries(beneficiariesCopy);
        console.log(beneficiariesCopy);
    }, [
        beneficiaries,
        activeFilter,
        archivedFilter,
        numInterests,
        interestsFilter,
    ]);

    return (
        <div className="beneficiaries-page-container">
            <div className="program-list-view-container">
                <h1>Beneficiary List</h1>
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
                                                <h5> Beneficiary </h5>
                                                <h5>&gt;</h5>
                                            </div>
                                        </div>
                                        <div
                                            id="status-options-dropdown"
                                            style={{ display: "none" }}
                                        >
                                            <div className="checkbox-option">
                                                <input
                                                    type="checkbox"
                                                    onChange={handleClickActive}
                                                    defaultChecked
                                                />
                                                <label> Active </label>
                                            </div>

                                            <div className="checkbox-option">
                                                <input
                                                    type="checkbox"
                                                    onChange={
                                                        handleClickArchive
                                                    }
                                                />{" "}
                                                <label> Archived </label>
                                            </div>

                                            <div className="interest-multiselect">
                                                <Multiselect
                                                    displayValue="name"
                                                    placeholder="Select Interests"
                                                    options={interestOptions}
                                                    onSelect={
                                                        handleSelectInterest
                                                    }
                                                    onRemove={
                                                        handleRemoveInterest
                                                    }
                                                    showCheckbox
                                                />
                                            </div>
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
                                <div
                                    id="sort-dropdown"
                                    style={{ display: "none" }}
                                >
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
                                            <h6> FIRST NAME</h6>
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
                                                <button
                                                    onClick={sortByFirstName}
                                                >
                                                    <label
                                                        htmlFor="sort1"
                                                        className="sort-options-sub"
                                                    >
                                                        <h5>A-Z</h5>
                                                    </label>
                                                </button>
                                                <button
                                                    onClick={
                                                        sortBackwardsByFirstName
                                                    }
                                                >
                                                    <label
                                                        htmlFor="sort2"
                                                        className="sort-options-sub"
                                                    >
                                                        <h5>Z-A</h5>
                                                    </label>
                                                </button>
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
                                            <h6>LAST NAME</h6>
                                            <div className="sort-options-main">
                                                <h5>A-Z</h5>
                                                <h5>&gt;</h5>
                                            </div>
                                        </div>
                                        <div
                                            id="sort-option-start-date"
                                            style={{ display: "none" }}
                                        >
                                            <div className="sort-inner-options-container">
                                                <button>
                                                    <label
                                                        htmlFor="sort3"
                                                        className="sort-options-sub"
                                                        onClick={sortByLastName}
                                                    >
                                                        <h5>A-Z</h5>
                                                    </label>
                                                </button>
                                                <button>
                                                    <label
                                                        htmlFor="sort4"
                                                        className="sort-options-sub"
                                                        onClick={
                                                            sortBackwardsByLastName
                                                        }
                                                    >
                                                        <h5>Z-A</h5>
                                                    </label>
                                                </button>
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
                                                <button onClick={sortByDate}>
                                                    <label
                                                        htmlFor="sort5"
                                                        className="sort-options-sub"
                                                    >
                                                        <h5>Newest-Oldest</h5>
                                                    </label>
                                                </button>
                                                <button
                                                    onClick={
                                                        sortBackwardsByDate
                                                    }
                                                >
                                                    <label
                                                        htmlFor="sort6"
                                                        className="sort-options-sub"
                                                    >
                                                        <h5>Oldest-Newest</h5>
                                                    </label>
                                                </button>
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
                            placeholder="Search Beneficiaries "
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <NavLink to="../beneficiaries/register">
                            <button
                                onClick={() => setOpenModal(true)}
                                className="submit-button"
                            >
                                Create Beneficiary
                            </button>
                        </NavLink>
                    </div>
                </div>

                <div className="beneficiaries-container">
                    <div className="beneficiaries-mapped-container">
                        {displayedBeneficiaries

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
                                <Beneficiary
                                    onClick={(e) => navigate(`${item._id}`)}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Beneficiaries;
