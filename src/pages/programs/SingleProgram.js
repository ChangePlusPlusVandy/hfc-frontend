import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import EnrollPopup from "./EnrollPopup";
import "./styles/Programs.css";
//TODO fix bug where you delete ben then add and it automatically updates

const SingleProgram = (props) => {
    const programID = useLocation().state.id;
    const [program, setProgram] = useState({});
    const [allBeneficiaries, setAllBeneficiaries] = useState([]);
    const [benOptions, setBenOptions] = useState([]);
    const [addBeneficiary, setAddBeneficiary] = useState([]);

    const [updateProgTitle, setUpdateProgTitle] = useState("");
    const [updateProgDesc, setUpdateProgDesc] = useState("");

    const [updateProgStart, setUpdateProgStart] = useState("");
    const [updateProgEnd, setUpdateProgEnd] = useState("");
    const [updateProgHosts, setUpdateProgHosts] = useState("");
    const [updateProgStatus, setUpdateProgStatus] = useState("");
    const [updateProgSchedule, setUpdateProgSchedule] = useState("");

    const [editMode, setEditMode] = useState(false);
    const [editBeneficiaries, setEditBeneficiaries] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [overviewOrEnroll, setOverviewOrEnroll] = useState(false);

    useEffect(() => {
        getProgramFromID();
        getBeneficiaries();
    }, []);

    const getProgramFromID = async (e) => {
        try {
            let data = await fetch(
                `http://localhost:3000/programs?id=${programID}`
            );
            data = await data.json();
            console.log(data[0]);
            setProgram(data[0]);
        } catch (err) {
            console.log(err);
        }
    };

    const getBeneficiaries = async () => {
        try {
            let data = await fetch("http://localhost:3000/beneficiaries");
            data = await data.json();
            setAllBeneficiaries(data);
            let tmp = data.map((e) => ({
                value: e._id,
                label: e.id + " - " + e.firstName,
                color: "black",
            }));

            setBenOptions(tmp);
        } catch (err) {
            console.log(err);
        }
    };

    const uniq = (a) => {
        var prims = { boolean: {}, number: {}, string: {} },
            objs = [];
        return a.filter(function (item) {
            var type = typeof item;
            if (type in prims)
                return prims[type].hasOwnProperty(item)
                    ? false
                    : (prims[type][item] = true);
            else return objs.indexOf(item) >= 0 ? false : objs.push(item);
        });
    };

    const updateProgramFromOverview = (e) => {
        updateProgram();
        editUpdateMode();
    };
    const updateProgramFromEnrollment = (e) => {
        updateProgram();
        editBenMode();
        setOpenModal(false);
    };

    const updateProgram = async (e) => {
        const combinedBenificiers = uniq(
            program.roster.map((event, i) => event._id).concat(addBeneficiary)
        );
        setAddBeneficiary(combinedBenificiers);

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                _id: { programID },
                content: {
                    description: updateProgDesc,
                    title: updateProgTitle,
                    roster: combinedBenificiers,
                    //TODO: add rest of fields
                },
            }),
        };
        await fetch("http://localhost:3000/programs", requestOptions);
        getProgramFromID();
        resetNewProgram();
    };

    const resetNewProgram = () => {
        setUpdateProgTitle(program.title);
        setUpdateProgDesc(program.description);
        setAddBeneficiary([]);
        // setUpdateProgStart("");
        // setUpdateProgEnd("");
        //setUpdateProgHosts("");
        // setUpdateProgStatus("");
        // setUpdateProgSchedule("");
    };

    const editUpdateMode = () => {
        if (editUpdateMode) {
            getProgramFromID();
            resetNewProgram();
        }
        setEditMode((current) => !current);
    };

    const editBenMode = () => {
        if (editBenMode) {
            resetNewProgram();
        }
        setEditBeneficiaries((current) => !current);
    };

    const customStyles = {
        content: {
            width: "40%",
            height: "20%",
            margin: "auto",
            top: "20%",
            bottom: "auto",
        },
        overlay: {
            backgroundColor: "transparent",
        },
    };

    const handleAddBen = (e) => {
        let addBenFiltered = e.map((event, i) => event.value);
        setAddBeneficiary(addBenFiltered);
    };

    const removeBen = (ben, e) => {
        program.roster = program.roster.filter((item) => {
            return item._id !== ben;
        });
        let parent = e.target.parentElement;
        parent.style.color = "red";
    };

    return (
        <div className="single-program-container">
            <button onClick={() => setOverviewOrEnroll(false)}>Overview</button>
            <button onClick={() => setOverviewOrEnroll(true)}>
                Enrollment
            </button>
            {overviewOrEnroll ? (
                <div>
                    {editBeneficiaries ? (
                        <div>
                            <EnrollPopup
                                openModal={openModal}
                                options={benOptions}
                                onChange={handleAddBen}
                                submit={updateProgramFromEnrollment}
                            />
                            <div>
                                <div className="enrolled-ben-title">
                                    <h3>Current Beneficiaries:</h3>
                                    <button
                                        onClick={() => setOpenModal(true)}
                                        className="submit-button"
                                    >
                                        Add Beneficiaries
                                    </button>
                                </div>
                                {program.roster?.map((ben, i) => (
                                    <div key={i}>
                                        <h5 id="beneficiary-name">
                                            {i + 1}: {ben.firstName}{" "}
                                            {ben.lastName}
                                            <button
                                                onClick={(e) =>
                                                    removeBen(ben._id, e)
                                                }
                                            >
                                                X
                                            </button>
                                        </h5>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={updateProgramFromEnrollment}
                                className="submit-button"
                            >
                                Submit
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="enrolled-ben-title">
                                <h3>Enrolled Beneficiaries: </h3>
                                <button
                                    onClick={editBenMode}
                                    className="submit-button"
                                >
                                    {" "}
                                    Edit Enrollment
                                </button>
                            </div>
                            {program.roster?.map((benn, i) => (
                                <div key={i}>
                                    <h4>
                                        {i + 1}: {benn.firstName}{" "}
                                        {benn.lastName}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    )}
                    <Link
                        to="/dashboard/programs/singleview/markattendance"
                        state={{
                            id: programID,
                        }}
                    >
                        Mark Attendance
                    </Link>
                </div>
            ) : (
                <div>
                    <h1>Title: {program.title}</h1>
                    {editMode ? (
                        <div>
                            <div>
                                <label>
                                    <h3>
                                        Title:
                                        <input
                                            type="text"
                                            value={updateProgTitle}
                                            name="title"
                                            onChange={(e) =>
                                                setUpdateProgTitle(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </h3>
                                </label>
                            </div>
                            <div>
                                <h3>
                                    <label>
                                        Description:
                                        <input
                                            type="text"
                                            value={updateProgDesc}
                                            name="description"
                                            onChange={(e) =>
                                                setUpdateProgDesc(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </label>
                                </h3>
                            </div>
                            <h3>id: {program._id}</h3>
                            <h3>Start Date: {program.startDate}</h3>
                            <h3>End Date: {program.endDate}</h3>
                            <h3>Date Created: {program.dateAdded}</h3>
                            <div>
                                <h3>
                                    <label>
                                        Hosts:
                                        <input
                                            type="text"
                                            value={updateProgHosts}
                                            name="description"
                                            onChange={(e) =>
                                                setUpdateProgHosts(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </label>
                                </h3>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3>Description: {program.description}</h3>
                            <h3>id: {program._id}</h3>
                            <h3>Start Date: {program.startDate}</h3>
                            <h3>End Date: {program.endDate}</h3>
                            <h3>Date Created: {program.dateAdded}</h3>
                            <h3>Hosts: {program.hosts}</h3>
                            <h3>
                                Status:{" "}
                                {program.archived ? <>archived</> : <>active</>}
                            </h3>
                        </div>
                    )}

                    {editMode ? (
                        <button
                            onClick={updateProgramFromOverview}
                            className="submit-button"
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            onClick={editUpdateMode}
                            className="submit-button"
                        >
                            {" "}
                            Edit Program
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SingleProgram;
