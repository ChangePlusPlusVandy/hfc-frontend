import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EnrollPopup from "./EnrollPopup";
import "./styles/SingleProgram.css";

const SingleProgram = (props) => {
    const { programID } = useParams();
    const navigate = useNavigate();

    const [program, setProgram] = useState({});
    const [roster, setRoster] = useState([]);
    const [allBeneficiaries, setAllBeneficiaries] = useState([]);
    const [benOptions, setBenOptions] = useState([]);
    const [addBeneficiary, setAddBeneficiary] = useState([]);

    const [updateProgTitle, setUpdateProgTitle] = useState("");
    const [updateProgDesc, setUpdateProgDesc] = useState("");

    const [editMode, setEditMode] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [overviewOrEnroll, setOverviewOrEnroll] = useState(false);
    const [editRoster, setEditRoster] = useState(false);
    const [editBeneficiaries, setEditBeneficiaries] = useState(false);

    useEffect(() => {
        getProgramFromID();
        getBeneficiaries();

        document.getElementById("overview-button").style.backgroundColor =
            "#888b8f";
        document.getElementById("enrollment-button").style.backgroundColor =
            "#e8e9eb";
    }, []);

    useEffect(() => {
        setRoster(program.roster);
    }, [program]);

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
                label: e.id,
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
        updateProgramRoster();
        editBenMode();
        setOpenModal(false);
        let benCards = document.getElementsByClassName("beneficiary-card");
        console.log(benCards);
        for (let i = 0; i < benCards.length; i++) {
            benCards[i].style.backgroundColor = "#d0d0d1";
        }

        setEditRoster(false);
    };

    const updateProgramRoster = async (e) => {
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
                    roster: combinedBenificiers,
                },
            }),
        };

        await fetch("http://localhost:3000/programs", requestOptions);
        getProgramFromID();
        resetNewProgram();
    };

    const updateProgram = async (e) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                _id: { programID },
                content: {
                    description: updateProgDesc,
                    title: updateProgTitle,
                },
            }),
        };
        await fetch("http://localhost:3000/programs", requestOptions);
        getProgramFromID();
        resetNewProgram();
    };

    const archiveProgram = async (id) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                _id: { programID },
                content: {
                    archived: true,
                },
            }),
        };
        await fetch("http://localhost:3000/programs", requestOptions);
        navigate("../../");
    };

    const deleteProgram = async (e) => {
        try {
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: e }),
            };
            await fetch("http://localhost:3000/programs", requestOptions);
            navigate("/dashboard/programs");
        } catch (err) {
            console.log(err);
        }
    };

    const resetNewProgram = () => {
        setUpdateProgTitle(program.title);
        setUpdateProgDesc(program.description);
        setAddBeneficiary([]);
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

    const handleAddBen = (e) => {
        let addBenFiltered = e.map((event, i) => event.value);
        setAddBeneficiary(addBenFiltered);
    };

    const removeBen = (ben, e) => {
        if (!program.roster.find((obj) => obj._id === ben)) {
            program.roster.push(roster.find((obj) => obj._id === ben));
            console.log("adding back ben");
            let parent = e.target.parentElement.parentElement;
            parent.style.backgroundColor = "#d0d0d1";

            if (program.roster.length === roster.length) setEditRoster(false);
        } else {
            program.roster = program.roster.filter((item) => {
                return item._id !== ben;
            });
            setEditRoster(true);
            let parent = e.target.parentElement.parentElement;
            parent.style.backgroundColor = "red";
        }
    };

    const editOverviewOrEnroll = (bool) => {
        setOverviewOrEnroll(bool);
        if (bool) {
            document.getElementById("overview-button").style.backgroundColor =
                "#e8e9eb";
            document.getElementById("enrollment-button").style.backgroundColor =
                "#888b8f";
        } else {
            document.getElementById("overview-button").style.backgroundColor =
                "#888b8f";
            document.getElementById("enrollment-button").style.backgroundColor =
                "#e8e9eb";
        }
    };

    return (
        <div className="single-program-container">
            <Link to="/dashboard/programs">&lt; back to program list</Link>
            <div className="single-program">
                <div className="single-program-heading">
                    {editMode ? (
                        <h6>
                            {" "}
                            <input
                                type="text"
                                value={updateProgTitle}
                                name="title"
                                onChange={(e) =>
                                    setUpdateProgTitle(e.target.value)
                                }
                            />
                        </h6>
                    ) : (
                        <h1>{program.title}</h1>
                    )}
                    <div className="heading-buttons">
                        <button
                            onClick={() => editOverviewOrEnroll(false)}
                            id="overview-button"
                            className="tab"
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => editOverviewOrEnroll(true)}
                            id="enrollment-button"
                            className="tab"
                        >
                            Enrollment
                        </button>
                    </div>
                </div>
                {overviewOrEnroll ? (
                    <div className="program-enroll-container">
                        <div className="program-enroll-subheading">
                            <h3>Enrolled Beneficiaries</h3>
                            <div className="program-enroll-options">
                                <input
                                    type="text"
                                    name="search-bar"
                                    className="ben-search-bar"
                                    placeholder="Search Beneficiary"
                                />
                                <EnrollPopup
                                    openModal={openModal}
                                    options={benOptions}
                                    onChange={handleAddBen}
                                    submit={updateProgramFromEnrollment}
                                />
                                <button
                                    onClick={() => setOpenModal(true)}
                                    className="submit-button program-enroll-ben"
                                >
                                    Add Beneficiaries
                                </button>
                            </div>
                        </div>
                        <div className="program-enroll-beneficiaries-container">
                            <div className="program-enroll-beneficiaries">
                                {roster?.map((ben, i) => (
                                    <div key={i} className="beneficiary-card">
                                        <div></div>
                                        <div className="card-info">
                                            <div className="tmp-photo"></div>
                                            <h5>
                                                {ben.firstName} {ben.lastName}
                                            </h5>
                                        </div>
                                        <div className="delete-button-container">
                                            <button
                                                onClick={(e) =>
                                                    removeBen(ben._id, e)
                                                }
                                                className="delete-ben-button"
                                            >
                                                X
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {editRoster ? (
                                <div className="submit-edit-roster">
                                    <button
                                        onClick={updateProgramFromEnrollment}
                                        className="submit-button"
                                    >
                                        Submit
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="mark-attendance-button-container">
                            <button className="submit-button program-enroll-ben">
                                <Link
                                    to={`/dashboard/programs/singleview/attendance/${programID}`}
                                >
                                    Mark Attendance
                                </Link>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="program-info-container">
                        <div className="program-info">
                            <h3>Description</h3>
                            {editMode ? (
                                <h6>
                                    {" "}
                                    <textarea
                                        rows="5"
                                        cols="75"
                                        type="text"
                                        value={updateProgDesc}
                                        name="description"
                                        onChange={(e) =>
                                            setUpdateProgDesc(e.target.value)
                                        }
                                    />
                                </h6>
                            ) : (
                                <h6>{program.description}</h6>
                            )}
                        </div>
                        <div className="program-info">
                            <h3>Start Date</h3>
                            <h6>{program.startDate?.split("T")[0]}</h6>
                        </div>
                        <div className="program-info">
                            <h3>End Date</h3>
                            <h6>{program.endDate?.split("T")[0]}</h6>
                        </div>

                        <div className="program-info">
                            <h3>Hosts</h3>
                            <div className="program-hosts">
                                {program.hosts?.map((host, h) => (
                                    <h6 key={host._id}>{host.firstName} </h6>
                                ))}
                            </div>
                        </div>
                        <div className="program-info">
                            <h3>Status</h3>
                            {program.archived ? (
                                <h6>Archived</h6>
                            ) : (
                                <h6>Active</h6>
                            )}
                        </div>
                        <div className="program-info">
                            <h3>Schedule</h3>
                            <h6>TODO</h6>
                        </div>
                        <div className="program-info-buttons-container">
                            {editMode ? (
                                <div className="program-buttons-inner">
                                    <button
                                        onClick={updateProgramFromOverview}
                                        className="submit-button"
                                    >
                                        Submit
                                    </button>
                                    <div className="program-archive-delete">
                                        <button
                                            onClick={() =>
                                                archiveProgram(program._id)
                                            }
                                        >
                                            Archive
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteProgram(program._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="program-buttons-inner">
                                    <button
                                        onClick={editUpdateMode}
                                        className="submit-button"
                                    >
                                        {" "}
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleProgram;
