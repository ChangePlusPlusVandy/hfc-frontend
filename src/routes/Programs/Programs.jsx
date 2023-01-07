import React, { useEffect, useState } from 'react';
import SingleProgram from "./SingleProgram.jsx";
import './Programs.css';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <button
            type="button"
            style={{ backgroundColor: 'pink' }}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}


const DoubleClickToInput = props => {
    const [fullName, setFullName] = useState("Joe Abraham");
    const [showInputEle, setShowInputEle] = useState(false);
    return (
        <span>
            {
                // Use JavaScript's ternary operator to specify <span>'s inner content
                props.showInputEle ? (
                    <input
                        type="text"
                        value={props.value}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        autoFocus
                    />
                ) : (
                    <span
                        onDoubleClick={props.handleDoubleClick}
                    >
                        {props.value}
                    </span>
                )
            }
        </span>
    );
}



const Programs = () => {
    const [programs, setPrograms] = useState([]);
    const [sortBy, setSortBy] = useState("alphabetical");
    const [searchProgram, setSearchProgram] = useState("");


    const [fullName, setFullName] = useState("Joe Abraham");
    const [showInputEle, setShowInputEle] = useState(false);


    const [newProgram, setNewProgram] = useState({
        title: "",
        hosts: "",
        description: ""
    });

    const [updateProgramVar, setUpdateProgramVar] = useState({
        title: "",
        hosts: "",
        description: ""
    });

    useEffect(() => {

        getPrograms();
        console.log(programs);
    }, [])

    const programsFiltered = programs.filter(item => {
        return searchProgram !== "" ? item.title.includes(searchProgram) : item;
    });

    const sortPrograms = (arr) => {
        if (sortBy.localeCompare("alphabetical") == 0) {
            arr.sort((item1, item2) => {
                return item1.title.localeCompare(item2.title);
            });
            //DATEADDED ISNT A FIELD STORED IN DB, SO FOR NOW SORTED BY DESC INSTEAD
        } else if (sortBy.localeCompare("date") == 0) {
            arr.sort((item1, item2) => {
                return item1.description.localeCompare(item2.description);
            });
        }
        return arr;
    }

    const getPrograms = async () => {
        try {
            let data = await fetch('http://localhost:3000/programs');
            data = await data.json();
            console.log(data);
            setPrograms(sortPrograms(data));
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProgram)
        };
        await fetch('http://localhost:3000/programs', requestOptions);
        getPrograms();
    }

    const deleteProgram = async (e) => {
        try {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: e })
            };
            await fetch('http://localhost:3000/programs', requestOptions);
        } catch (err) {
            console.log(err);
        }
        getPrograms();
    }

    const updateProgram = async (e) => {
        // try {
        //     const requestOptions = {
        //         method: 'PUT',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ title: e.title },
        //             { description: e.description },
        //             { hosts: e.hosts })
        //     };
        //     await fetch('http://localhost:3000/programs', requestOptions);
        // } catch (err) {
        //     console.log(err);
        // }
        // getPrograms();
    }

    const handleSearchChange = e => {
        setSearchProgram(e.target.value);
        console.log(searchProgram);
    }


    const handleSortValChange = e => {
        setSortBy(e.target.value);
        sortPrograms(programs);
    }

    //Updates newProgram info
    const handleTitleChange = e => {
        setNewProgram(() => ({
            ...newProgram,
            title: e.target.value
        }))
    }
    const handleHostChange = e => {
        setNewProgram(() => ({
            ...newProgram,
            hosts: e.target.value
        }))
    }
    const handleDescChange = e => {
        setNewProgram(() => ({
            ...newProgram,
            description: e.target.value
        }))
    }

    const getFromProg = (e) => {
        //if (e.param.localeCompare("description") == 0)
        console.log(programs.find(({ tit }) => tit === e.item));
    }

    return (

        <div className="programs">
            <h1>Programs:</h1>
            <h3>(Click on a program to delete it)</h3>
            <div className="sortAndSearch">
                <div className="sortIndicator" onChange={e => handleSortValChange(e)}>
                    <h3>Sort By:</h3>
                    <input type="radio" value="date" name="sortVal" />Alphabetical
                    <input type="radio" value="alphabetical" name="sortVal" />Date
                </div>
                <div className="singleSearch">
                    <input
                        type="text"
                        name="search-bar"
                        placeholder="Search..."
                        onChange={e => handleSearchChange(e)}
                    />
                </div>
            </div>
            <div>

                <Accordion defaultActiveKey="0" className="programsListContainer">
                    {
                        programsFiltered.map((item, i) => (
                            <Card key={i} className="programCard">
                                <Card.Header>
                                    <CustomToggle eventKey={i}>
                                        <h4># {i}</h4>
                                        <h4>Title: {item.title}</h4>
                                    </CustomToggle>
                                </Card.Header>

                                <Accordion.Collapse eventKey={i}>
                                    <Card.Body>
                                        <h5>id: {item._id}</h5>
                                        <h5>hosts: {item.hosts}</h5>

                                        <h5>description:
                                            <DoubleClickToInput
                                                value={fullName}
                                                handleChange={(e) => setFullName(e.target.value)}
                                                handleDoubleClick={() => setShowInputEle(true)}
                                                handleBlur={() => setShowInputEle(false)}
                                                showInputEle={showInputEle}
                                            />
                                        </h5>

                                        <h5>description: {item.description}</h5>
                                        <h5>attendance: {item.attendance}</h5>
                                        <h5>Days Of Week: {item.daysOfWeek}</h5>
                                        <button onClick={() => deleteProgram(item.title)}>Delete Program</button>
                                        <button onClick={() => updateProgram({ item: title, description: item.description })}>Update Program</button>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))
                    }
                </Accordion>
            </div>
            <h1>Add A program</h1>
            <div>
                <form onSubmit={e => handleSubmit(e)}>
                    <label>
                        Title:
                        <input type="text" name="title" onChange={e => handleTitleChange(e)} />
                    </label>
                    <label>
                        Hosts:
                        <input type="text" name="hosts" onChange={e => handleHostChange(e)} />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" onChange={e => handleDescChange(e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <h1>Update a Program: (to do)</h1>
        </div >
    )
}

export default Programs;
