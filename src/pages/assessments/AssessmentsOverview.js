import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SingleAssessment from "./components/SingleAssessment";

const AssesssmentsOverview = () => {
    const [assessments, setAssessments] = useState([]);
    const [search, setSearch] = useState("");

    const sortByName = () => {
        let data = [...assessments];
        data.sort((a, b) => a.firstName.localeCompare(b.firstName));
        setAssessments(data);
    };

    const sortByDate = () => {
        let data = [...assessments];
        data.sort(function (a, b) {
            const dateA = new Date(a.dateTaken);
            const dateB = new Date(b.dateTaken);
            return dateB - dateA;
        });
        setAssessments(data);
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

    return (
        <div className="assessments-page-container">
            <h1>Assessments Overview </h1>
            <input
                onChange={(e) => setSearch(e.target.value)}
                className="del-form"
                type="text"
                placeholder="Search..."
            />

            <Link to="assessment">
                <button>Launch Assessment</button>
            </Link>

            <br></br>

            <button onClick={sortByDate}>Sort by Date</button>
            <button onClick={sortByName}>Sort by Name</button>

            <ul
                role="list"
                className="assessment-list-stack"
                aria-labelledby="list-heading"
            >
                {assessments
                    // default sort from new to old
                    .sort(function (a, b) {
                        const dateA = new Date(a.dateTaken);
                        const dateB = new Date(b.dateTaken);
                        return dateB - dateA;
                    })
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
                            // mongoKey={item._id}
                            key={item._id}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default AssesssmentsOverview;
