import React, { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import "./styles/MarkAttendance.css";

// TODO:
const MarkAttendance = (props) => {
    const { programID } = useParams();
    const [program, setProgram] = useState({});
    const [date, setDate] = useState("");
    const [arePresent, setArePresent] = useState([]);
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [markedPres, setMarkedPres] = useState([]);

    useEffect(() => {
        getProgramFromID();
    }, []);

    useEffect(() => {
        handleChooseDate();
    }, [program]);

    useEffect(() => {
        setArePresent([]);
        handleChooseDate();
        setBeneficiaries([...beneficiaries]);
    }, [date]);

    const getProgramFromID = async (e) => {
        try {
            let data = await fetch(
                `http://localhost:3000/programs?id=${programID}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "auth"
                        )}`,
                    },
                }
            );
            data = await data.json();

            setProgram(data[0]);
            setBeneficiaries(
                data[0].roster.map((obj) => ({ ...obj, present: false }))
            );
        } catch (err) {
            console.log(err);
        }
    };

    const getDatesWithAttendance = () => {};

    const updateProgram = async (e) => {
        //  if (program.attendance.find((obj) => (obj.date === date))) {
        let tmp = program.attendance.filter((obj) => {
            return obj.date?.split("T")[0] !== date;
        });
        let c = tmp;
        c.push({ date: date, attendees: arePresent });
        // console.log(tmp);
        setProgram({
            ...program,
            attendance: c,
        });

        console.log("ll");
        // console.log(program);

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
            },
            body: JSON.stringify({
                _id: { programID },
                content: {
                    attendance: c,
                },
            }),
        };

        beneficiaries.forEach((element) => {
            element.highlightGreen = false;
            element.highlightRed = false;
        });
        await fetch("http://localhost:3000/programs", requestOptions);
        setArePresent([...arePresent]);
    };

    //const highlightGreen = arePresent.filter((el) => !markedPresent?.includes(el));

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
            }
            let tmpArray = [];
            for (let i = 0; i < beneficiaries.length; i++) {
                if (beneficiaries[i].present)
                    tmpArray.push(beneficiaries[i]._id);
            }
            setArePresent(tmpArray);
            setMarkedPres(tmpArray);
        }
    };

    const markPresent = (id, e) => {
        if (!arePresent.includes(id)) {
            setArePresent([...arePresent, id]);
            // beneficiaries.find((obj) => obj._id === id).highlightGreen = true;
        }
        beneficiaries.find((obj) => obj._id === id).highlightGreen = true;
        beneficiaries.find((obj) => obj._id === id).highlightRed = false;
        // if (beneficiaries.find((obj) => obj._id === id).present == false) {
        //     beneficiaries.find((obj) => obj._id === id).highlightGreen = true;
        // }
        // if (beneficiaries.find((obj) => obj._id === id).highlightRed == true) {
        //     beneficiaries.find((obj) => obj._id === id).highlightRed = false;
        //     beneficiaries.find((obj) => obj._id === id).highlightGreen = false;
        // }
    };

    const markAbsent = (id, e) => {
        let tmpPresent = arePresent.filter((element) => {
            return element !== id;
        });
        beneficiaries.find((obj) => obj._id === id).highlightRed = true;
        beneficiaries.find((obj) => obj._id === id).highlightGreen = false;
        // if (beneficiaries.find((obj) => obj._id === id).present != false) {
        //     beneficiaries.find((obj) => obj._id === id).highlightRed = true;
        // }
        // if (
        //     beneficiaries.find((obj) => obj._id === id).highlightGreen == true
        // ) {
        //     beneficiaries.find((obj) => obj._id === id).highlightGreen = false;
        // }
        setArePresent(tmpPresent);
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
                        // FIXME:
                        ref={(input) => {
                            if (input && input.shadowRoot) {
                                // check if input and its shadowRoot are defined
                                const calendar =
                                    input.shadowRoot.querySelector("table");
                                if (calendar) {
                                    const targetTds =
                                        calendar.querySelectorAll(
                                            'td[data-date="15"]'
                                        );
                                    targetTds.forEach((td) =>
                                        td.classList.add("highlight")
                                    );
                                }
                            }
                        }}
                    />
                </div>
                <div className="mark-attendance-description">
                    <h4>
                        <i>
                            Choose a date from the calendar to either view the
                            attendance from that date, or to mark its attendance
                        </i>
                    </h4>
                </div>

                <div className="mark-attendance-beneficiaries">
                    {beneficiaries?.map((item, i) => (
                        <div
                            key={i}
                            className={
                                item.highlightGreen ||
                                (item.present && !item.highlightRed)
                                    ? "ben-card is-present"
                                    : "ben-card is-absent"
                            }
                        >
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
