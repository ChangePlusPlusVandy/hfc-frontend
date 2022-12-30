import React, { useEffect, useState } from 'react';
import './Programs.css';


const Programs = () => {
    const [programs, setPrograms] = useState([]);
    const [sortBy, setSortBy] = useState("alphabetical");
    const [newProgram, setNewProgram] = useState({
        title: "",
        hosts: "",
        description: ""
    });

    useEffect(() => {
        getPrograms();
    }, [])

    const sortPrograms = (arr) => {
        if (sortBy.localeCompare("alphabetical") == 0) {
            console.log("alp");
            arr.sort((item1, item2) => {
                return item1.title.localeCompare(item2.title);
            });
            //DATEADDED ISNT A FIELD STORED IN DB, SO FOR NOW SORTED BY DESC INSTEAD
        } else if (sortBy.localeCompare("date") == 0) {
            console.log("date");
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
        console.log(e);
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

    return (
        <div className="programs">
            <h1>Programs:</h1>
            <h3>(Click on a program to delete it)</h3>
            <div className="sortIndicator" onChange={e => handleSortValChange(e)}>
                <h3>Sort By:</h3>
                <input type="radio" value="date" name="sortVal" />Alphabetical
                <input type="radio" value="alphabetical" name="sortVal" />Date
            </div>
            <div className="programsListContainer">
                {
                    programs.map((item, i) => (
                        <div className="programCard" onClick={() => deleteProgram(item.title)} key={i}>
                            <div>
                                <h4># {i}</h4>
                                <h4>Title: {item.title}</h4>
                                <h5>id: {item._id}</h5>
                                <h5>Hosts: {item.hosts}</h5>
                                <h5>Description: {item.description}</h5>
                                <h5>Attendance: {item.attendance}</h5>
                                <h5>Days Of Week: {item.daysOfWeek}</h5>
                            </div>
                        </div>
                    ))
                }
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
        </div>
    )
}

export default Programs;
