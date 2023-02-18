import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const MarkAttendance = (props) => {
    const programID = useLocation().state.id;
    const [program, setProgram] = useState({});
    const [date, setDate] = useState("");
    const [toggleAttendance, setToggleAttendance] = useState(true);
    const [arePresent, setArePresent] = useState([]);

    const [attendance, setAttendance] = useState({});

    useEffect(() => {
        getProgramFromID();
    }, []);

    const getProgramFromID = async (e) => {
        try {
            let data = await fetch(
                `http://localhost:3000/programs?id=${programID}`
            );
            data = await data.json();
            // setAttendance(data[0].roster.map((event) => event._id));

            setProgram(data[0]);
        } catch (err) {
            console.log(err);
        }
    };

    const updateProgram = async (e) => {
        console.log(
            "Attendance before PUT request: " + JSON.stringify(attendance)
        );

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                _id: { programID },
                content: {
                    attendance: attendance,
                },
            }),
        };

        await fetch("http://localhost:3000/programs", requestOptions);
        getProgramFromID();
    };

    const handleChooseDate = (e) => {
        //Later: move to else block
        console.log("Attendance after date Chosen: " + date);
        if (!date) setToggleAttendance(false);
        else {
            //TODO check if date is already set
            setToggleAttendance(true);
        }
    };

    const handleSubmit = (e) => {
        setAttendance([
            ...program.attendance,
            {
                date: date,
                attendees: arePresent,
            },
        ]);
        updateProgram();
    };

    const markPresent = (id, e) => {
        if (!arePresent.includes(id)) setArePresent([...arePresent, id]);

        console.log("Present Beneficiaries (arePresent): " + arePresent);
    };

    const markAbsent = (e) => {
        console.log(attendance);
    };

    return (
        <div>
            <h1>Beneficiaries:</h1>
            <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
            />
            <button onClick={handleChooseDate}>Choose This Date</button>
            <div>{date ?? <h1>Mark Attendance for: {date}</h1>}</div>
            {toggleAttendance
                ? program.roster?.map((item, i) => (
                      <div key={i}>
                          <h1>
                              {i + 1}: {item.firstName}
                              <button onClick={(e) => markPresent(item._id, e)}>
                                  P
                              </button>
                              <button onClick={(e) => markAbsent(item._id, e)}>
                                  A
                              </button>
                          </h1>
                      </div>
                  ))
                : program.roster?.map((item, i) => (
                      <div key={i}>
                          <h1>
                              {i + 1}: {item.firstName}
                          </h1>
                      </div>
                  ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default MarkAttendance;
