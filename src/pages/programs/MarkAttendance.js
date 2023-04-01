import React, { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import "./styles/MarkAttendance.css";

const MarkAttendance = (props) => {
    const { programID } = useParams();
    const [program, setProgram] = useState({});
    const [date, setDate] = useState("");
    const [toggleAttendance, setToggleAttendance] = useState(true);
    const [arePresent, setArePresent] = useState([]);
    const [datesWithAttendance, setDatesWithAttendance] = useState([]);

    const [attendance, setAttendance] = useState({});
    const [beneficiaries, setBeneficiaries] = useState([]);

    useEffect(() => {
        getProgramFromID();
    }, []);

    useEffect(() => {
        handleChooseDate();
        setBeneficiaries([...beneficiaries]);
    }, [date]);

    const getProgramFromID = async (e) => {
        try {
            let data = await fetch(
                `http://localhost:3000/programs?id=${programID}`
            );
            data = await data.json();
            // setAttendance(data[0].roster.map((event) => event._id));

            setProgram(data[0]);
            console.log(data[0]);
            setBeneficiaries(
                data[0].roster.map((obj) => ({ ...obj, present: false }))
            );
        } catch (err) {
            console.log(err);
        }
    };

    const getDatesWithAttendance = () => {

    }

    const updateProgram = async (e) => {
        setAttendance([
            ...program.attendance,
            {
                date: date,
                attendees: arePresent,
            },
        ]);

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                _id: { programID },
                content: {
                    attendance: [
                        ...program.attendance,
                        {
                            date: date,
                            attendees: arePresent,
                        },
                    ],
                },
            }),
        };

        await fetch("http://localhost:3000/programs", requestOptions);
        getProgramFromID();
        setArePresent([]);
    };

    const handleChooseDate = (e) => {
        if (date) {
            beneficiaries.forEach((element) => (element.present = false));
            let cpy = program.attendance?.find(
                (obj) => obj.date?.split("T")[0] === date
            );
            if (cpy) {
                cpy.attendees.forEach((element) => {
                    if (beneficiaries.find((obj) => obj._id === element)) {
                        beneficiaries.find(
                            (obj) => obj._id === element
                        ).present = true;
                    }
                });
                console.log("KSJDK");
                console.log(beneficiaries);
            }
        }
    };

    const markPresent = (id, e) => {
        if (!arePresent.includes(id)) setArePresent([...arePresent, id]);
        // console.log("Present Beneficiaries (arePresent): " + arePresent);
    };

    const markAbsent = (e) => {
        //console.log(attendance)
    };

    return (
        <div className="mark-attendance-container">
            <Link to={`/dashboard/programs/singleview/${programID}`}>
                &lt; back to program
            </Link>
            <div className="mark-attendance">
                <div className="attendance-header">
                    <h1>Mark Program Attendance</h1>
                    <input
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        className="calendar"
                        ref={(input) => {
                            if (input && input.shadowRoot) { // check if input and its shadowRoot are defined
                                const calendar = input.shadowRoot.querySelector("table");
                                if (calendar) {
                                    const targetTds = calendar.querySelectorAll('td[data-date="15"]');
                                    targetTds.forEach((td) => td.classList.add("highlight"));
                                }
                            }
                        }}
                    />
                </div>
                <div className="mark-attendance-beneficiaries">
                    {beneficiaries?.map((item, i) => (
                        <div key={i} className="ben-card">
                            <div className="tmp-photo"></div>
                            <h3>{item.firstName}</h3>
                            {item.present ? <h3>Present</h3> : <h3>Absent</h3>}
                            <div className="present-absent-container">
                                <button
                                    onClick={(e) => markPresent(item._id, e)}
                                >
                                    P
                                </button>
                                <button
                                    onClick={(e) => markAbsent(item._id, e)}
                                >
                                    A
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="submit-button-container">
                    <button onClick={updateProgram} className="submit-button">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarkAttendance;
