import React, { useEffect, useState } from 'react';
import './Programs.css';
const Programs = () => {
    const [programs, setPrograms] = useState([]);
    const [newProgram, setNewProgram] = useState({
        title: "aa",
        hosts: "",
        description: ""
    });

    useEffect(async => {
        getPrograms();
    }, [])

    const getPrograms = async () => {
        try {
            let data = await fetch('http://localhost:3000/programs');
            data = await data.json();
            setPrograms(data);
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



    //Updates newProgram info
    const handleTitleChange = e => {
        setNewProgram(curr => ({
            ...newProgram,
            title: e.target.value
        }))
    }
    const handleHostChange = e => {
        setNewProgram(curr => ({
            ...newProgram,
            hosts: e.target.value
        }))
    }
    const handleDescChange = e => {
        setNewProgram(curr => ({
            ...newProgram,
            description: e.target.value
        }))
    }

    return (
        <div>
            <h1>Programs:</h1>
            <h3>(Click on a program to delete it)</h3>
            <div className="programsListContainer">
                {
                    programs.map((item, i) => (
                        <div className="programCard" onClick={() => deleteProgram(item.title)} key={i}>
                            <h4>Title: {item.title}</h4>
                            <h5>id: {item._id}</h5>
                            <h5>Hosts: {item.hosts}</h5>
                            <h5>Description: {item.description}</h5>
                            <h5>Attendance: {item.attendance}</h5>
                            <h5>Days Of Week: {item.daysOfWeek}</h5>
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
