import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../utils/DropDown";
import AssessmentRow from "./components/AssessmentRow";
import "./AssessmentOverview.css";

const SORT_OPTIONS = [
    { value: "NewToOld", label: "Newest to Oldest" },
    { value: "OldToNew", label: "Oldest to Newest" },
];

const AssesssmentsOverview = () => {
    const [assessments, setAssessments] = useState([]);
    const [search, setSearch] = useState("");
    const [beneficiary, setBeneficiary] = useState();

    const getAssessments = async () => {
        try {
            let data = await fetch("http://localhost:3000/assessments");
            data = await data.json();
            setAssessments(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAssessments();
    }, []);

    const getBeneficiaryById = async (mongoId) => {
        try {
            let data = await fetch(
                `http://localhost:3000/beneficiaries/?id=${mongoId}`
            );
            console.log("get bfc ID: ", mongoId);
            data = await data.json();
            setBeneficiary(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Called by filterFromSearch
    const getBfcFromAssessment = (assessment) => {
        // useEffect(() => {
        if (assessments && assessment) {
            console.log("assessment's bfc: ", assessment.beneficiary);
            getBeneficiaryById(assessment.beneficiary);
            if (beneficiary) {
                console.log("bfc got: ", beneficiary);
                return beneficiary;
            }
        }
        // }, assessments);
    };

    // TODO: make this change displayedAssessments
    const sortByDate = (oldToNew = false) => {
        let data = [...assessments];
        data.sort((a, b) => {
            const dateA = new Date(a.dateTaken);
            const dateB = new Date(b.dateTaken);
            return oldToNew ? dateA - dateB : dateB - dateA;
        });
        setAssessments(data);
    };

    // TODO: make this change displayedAssessments
    const filterFromSearch = () => {
        // assessments exist and we typed something in search
        if (assessments && search) {
            return assessments.filter((obj) => {
                let searchStr = search.toLowerCase();
                let bfc = getBfcFromAssessment(obj);
                return (
                    bfc.firstName.toLowerCase().includes(searchStr) ||
                    bfc.lastName.toLowerCase().includes(searchStr) ||
                    bfc.id.toString().includes(searchStr)
                );
            });
            // assessments exist, typed nothing
        } else if (assessments) {
            return assessments;
        } else {
            console.log("assessments undefined");
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSortChange = (e) => {
        if (e.value === "NewToOld") {
            sortByDate(); // default
        } else {
            sortByDate(true); // oldest to newest
        }
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
                {assessments &&
                    filterFromSearch().map((item, i) => (
                        <AssessmentRow
                            key={i}
                            dateTaken={item.dateTaken}
                            eduVocQs={item.educationVocationQs}
                            mentalHealthQs={item.mentalHealthQs}
                            lifeSkillsQs={item.lifeSkillsQs}
                            socialSkillsQs={item.socialSkillsQs}
                            eduVocScore={item.educationVocationScore}
                            mentalHealthScore={item.mentalHealthScore}
                            lifeSkillsScore={item.lifeSkillsScore}
                            socialSkillsScore={item.socialSkillsScore}
                            totalScore={item.totalScore}
                            bfcMongoId={item.beneficiary}
                            assessmentId={item._id}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default AssesssmentsOverview;
