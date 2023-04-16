import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../utils/Dropdown";
import AssessmentRow from "./components/AssessmentRow";
import "./AssessmentOverview.css";

const SORT_OPTIONS = [
    { value: "NewToOld", label: "Newest to Oldest" },
    { value: "OldToNew", label: "Oldest to Newest" },
];

const AssesssmentsOverview = () => {
    const [assessments, setAssessments] = useState([]);
    const [displayedAssessments, setDisplayedAssessments] = useState([]);
    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("");

    const getAssessments = async () => {
        try {
            let data = await fetch("http://localhost:3000/assessments",{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "auth"
                    )}`,
                },
            });
            data = await data.json();
            setAssessments(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAssessments();
    }, []);

    useEffect(() => {
        sortByDate(assessments, sortOption); // assessment sorted
        let filteredAssessments = filterFromSearch(
            assessments,
            search.toLowerCase()
        );
        setDisplayedAssessments(filteredAssessments);
    }, [assessments, search, sortOption]);

    const sortByDate = (data, sortOrder = "NewToOld") => {
        data.sort((a, b) => {
            const dateA = new Date(a.dateTaken);
            const dateB = new Date(b.dateTaken);
            return sortOrder === "NewToOld" ? dateA - dateB : dateB - dateA;
        });
    };

    const filterFromSearch = (data, searchStr) => {
        // data exist and we typed something in search
        if (data && searchStr) {
            return data.filter((obj) => {
                let bfc = obj.beneficiary;
                return (
                    bfc.firstName.toLowerCase().includes(searchStr) ||
                    bfc.lastName.toLowerCase().includes(searchStr) ||
                    bfc.id.toString().includes(searchStr)
                );
            });
        } else if (data) {
            // data exist, typed nothing in search
            return data;
        } else {
            console.log("data to be filtered is undefined");
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.value);
    };

    return (
        <div className="assessments-page-container">
            <h1>Assessments Overview </h1>
            <div className="query-container">
                <Dropdown
                    placeHolder="Sort"
                    options={SORT_OPTIONS}
                    onChange={handleSortChange}
                />
                <input
                    onChange={handleSearchChange}
                    className="search"
                    type="text"
                    placeholder="Search beneficiary"
                />
                <Link to="assessment">
                    <button className="launch-btn">Launch Assessment</button>
                </Link>
            </div>
            <div className="assessment-list-header">
                <h4 className="bfc-name">Beneficiary Name</h4>
                <h4 className="bfc-id">ID Number</h4>
                <h4 className="assessment-date">Date Administered</h4>
            </div>

            <ul className="assessment-list-stack">
                {displayedAssessments &&
                    displayedAssessments.map((item, i) => (
                        <AssessmentRow
                            key={i}
                            dateTaken={item.dateTaken}
                            beneficiary={item.beneficiary}
                            assessmentId={item._id}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default AssesssmentsOverview;
