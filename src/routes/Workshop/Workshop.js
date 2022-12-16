import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import './Workshop.css';

export const Workshop = ()=> {
    return(
        <div className="home">
            <h1>Choose an option</h1>
            <div>
            <Link className="button" to="./form">
                    Create Workshop
                </Link>
                <Link className="button" to="./get">
                    Get Workshops
                </Link>
            </div>
        </div>
    );
};

export const WorkshopForm = () => {
    let [description, setDescription] = useState("")
    let [title, setTitle] = useState("")
    let [numAttendees, setNumAttendees] = useState(-1)
    let [date, setDate]=useState()
    const titleChange = (event)=>{
        setTitle(event.target.value)
    }
    const descChange = (event)=>{
        setDescription(event.target.value)
    }
    const dateChange = (event)=>{
        setDate(event.target.value)
    }
    const makeWorkshop = (event)=>{
        if(description&&title&&numAttendees>=0&&date){

        }
    }
    return (
        <div className="form-container">
            <h3> Basic Info: Fill In</h3>
            <div>Workshop Title</div>
            <input
                type="text"
                id="Workshop Title"
                onChange={titleChange}
                placeholder="Title"
            />
            <br></br>
            <div>Workshop Description</div>
            <input
                type="text"
                id="description"
                onChange={descChange}
                placeholder="description"
            />
            <br></br>
            <div>Workshop Date</div>
            <input
                type="date"
                id="Date"
                onChange={dateChange}
            />
            <br></br>
            <div>Number of Attendees</div>
            <input
                type="number"
                id="numAttendees"
                onChange={setNumAttendees}
            />
            <div className="home"><button className="button" onClick={makeWorkshop}>Create</button></div>
        </div>    )
}

const findWorkshops = async() =>{
    let data = await fetch('http://localhost:3000/workshop');
    data=await data.json();
    return data
    
}
export const GetWorkshops = ()=>{
    let [x,setX]=useState({})
    useEffect(()=>{    findWorkshops().then(result=>
        setX(result)
    )},[])

    return(<div>{JSON.stringify(x)}</div>)
}
