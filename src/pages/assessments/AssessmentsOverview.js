import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SingleAssessment from "./components/SingleAssessment";

const AssesssmentsOverview = () => {
    const [assessments, setAssessments] = useState([]);
    const [search, setSearch] = useState("");
    //const [beneficiary, setBeneficiary] = useState({});

    const getBeneficiaryById = async (mongoId) => {
        try {
            let data = await fetch(
                `http://localhost:3000/beneficiaries/?id=${mongoId}`
            );
            console.log("get bfc ID: ", mongoId);
            data = await data.json();
            //setBeneficiary(data);
        } catch (error) {
            console.error(error);
        }
    };

    const sortByFirstName = (isFirstName, isReversed) => {
        let data = [...assessments];
        if (data.length != 0) {
            // if (isFirstName) {
            //     sortNameBy(data, "firstName");
            // } else {
            //     sortNameBy(data, "lastName");
            // }
            // if (!isReversed) {
            //     setAssessments(data);
            // } else {
            //     setAssessments(data.reverse());
            // }
            // console.log(
            //     "bfc first name: ",
            //     getBeneficiary(data[0].beneficiary).firstName
            // );
            // getBeneficiaryByID(data[0].beneficiary);
            // console.log("first assessment bfc: ", beneficiary);
        }
    };

    const sortNameBy = (data, attr) => {
        return data.sort(function (a, b) {
            let nameA = getBeneficiaryById(a.beneficiary)[attr];
            let nameB = getBeneficiaryById(b.beneficiary)[attr];
            return nameA.localeCompare(nameB);
        });
    };

    const sortByDate = () => {
        let data = [...assessments];
        sortNewToOld(data);
        setAssessments(data);
    };

    const sortNewToOld = (data) => {
        return data.sort(function (a, b) {
            const dateA = new Date(a.dateTaken);
            const dateB = new Date(b.dateTaken);
            return dateB - dateA;
        });
    };

    useEffect(() => {
        getAssessments();
    }, []);

    const getAssessments = async () => {
        try {
            let data = await fetch("http://localhost:3000/assessments");
            data = await data.json();
            setAssessments(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="assessments-page-container">
            <h1>Assessments Overview </h1>
            <input
                onChange={handleSearchChange}
                className="del-form"
                type="text"
                placeholder="Search..."
            />

            <Link to="assessment">
                <button>Launch Assessment</button>
            </Link>

            <br></br>

            <button onClick={sortByDate}>Sort by Date</button>
            <button onClick={sortByFirstName(true, false)}>
                Sort by First Name
            </button>
            {/* <button onClick={sortByFirstName(false, false)}>
                Sort by Last Name
            </button> */}

            <ul className="assessment-list-stack">
                {sortNewToOld(assessments)
                    // .filter((value) => {
                    //     if (search == "") {
                    //         return value;
                    //     } else if (
                    //         value.firstName
                    //             .toLowerCase()
                    //             .includes(search.toLowerCase()) ||
                    //         value.lastName
                    //             .toLowerCase()
                    //             .includes(search.toLowerCase()) ||
                    //         value.id.toString().includes(search)
                    //     ) {
                    //         return value;
                    //     }
                    // })
                    .map((item) => (
                        <SingleAssessment
                            dateTaken={item.dateTaken}
                            mentalHealthQs={item.mentalHealthQs}
                            lifeSkillsQs={item.lifeSkillsQs}
                            socialSkillsQs={item.socialSkillsQs}
                            educationQs={item.educationQs}
                            vocationQs={item.vocationQs}
                            mentalHealthScore={item.mentalHealthScore}
                            lifeSkillsScore={item.lifeSkillsScore}
                            socialSkillsScore={item.socialSkillsScore}
                            educationScore={item.educationScore}
                            vocationScore={item.vocationScore}
                            totalScore={item.totalScore}
                            bfcMongoId={item.beneficiary}
                            key={item._id}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default AssesssmentsOverview;
