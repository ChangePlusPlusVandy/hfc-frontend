import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BeneficiarySelect from "./BenificiarySelect";
import Select from "react-select";
import "./Programs.css";

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
            let tmp = data.map((e) => ({ value: e._id, label: e.firstName }));
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

    const updateProgram = async (e) => {
        const combinedBenificiers = uniq(
            program.roster.map((event, i) => event._id).concat(addBeneficiary)
        );
        setAddBeneficiary(combinedBenificiers);

        console.log(combinedBenificiers);

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
        editUpdateMode();
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
        <div>
            {editMode ? (
                <div>
                    <div>
                        <label>
                            <h1>
                                Title:
                                <input
                                    type="text"
                                    value={updateProgTitle}
                                    name="title"
                                    onChange={(e) =>
                                        setUpdateProgTitle(e.target.value)
                                    }
                                />
                            </h1>
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
                                        setUpdateProgDesc(e.target.value)
                                    }
                                />
                            </label>
                        </h3>
                    </div>
                    <h3>id: {program._id}</h3>
                    <div>
                        <h3>
                            <label>
                                Hosts:
                                <input
                                    type="text"
                                    value={updateProgHosts}
                                    name="description"
                                    onChange={(e) =>
                                        setUpdateProgHosts(e.target.value)
                                    }
                                />
                            </label>
                        </h3>
                    </div>
                    <Select
                        isMulti
                        name="colors"
                        options={benOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleAddBen}
                    />
                    <div>
                        <h3>
                            Current Beneficiaries:{" "}
                            {program.roster?.map((ben, i) => (
                                <div key={i}>
                                    <h5 id="beneficiaryName">
                                        {i + 1}: {ben.firstName} {ben.lastName}
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
                        </h3>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Title: {program.title}</h1>
                    <h3>Description: {program.description}</h3>
                    <h3>id: {program._id}</h3>
                    <h3>Hosts: {program.hosts}</h3>
                    <h3>
                        Status: {program.archived ? <>archived</> : <>active</>}
                    </h3>
                    <h3>
                        Beneficiaries:{" "}
                        {program.roster?.map((benn, i) => (
                            <div key={i}>
                                <h5>
                                    {i + 1}: {benn.firstName} {benn.lastName}
                                </h5>
                            </div>
                        ))}
                    </h3>
                </div>
            )}

            {editMode ? (
                <button onClick={updateProgram}>Submit</button>
            ) : (
                <button onClick={editUpdateMode}> Edit Program</button>
            )}
        </div>
    );
};

export default SingleProgram;
