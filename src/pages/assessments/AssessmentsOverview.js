import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
            console.log(data);
            console.log(assessments);
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
                    .map(
                        (item) => (
                            <li> {item.dateTaken}</li>
                        )

                        // <SingleBenficiary
                        //     id={item.id}
                        //     firstName={item.firstName}
                        //     lastName={item.lastName}
                        //     gender={item.gender}
                        //     phone={item.phone}
                        //     email={item.email}
                        //     bday={item.bday}
                        //     archived={item.archived}
                        //     key={item.id}
                        //     mongoKey={item._id}
                        //     deleteBfc={deleteBfc}
                        // />
                    )}
            </ul>
        </div>
    );
};

export default AssesssmentsOverview;
