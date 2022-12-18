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
                <Link className="button" to="./delete">
                    Delete Workshops
                </Link>
            </div>
        </div>
    );
};

export const WorkshopForm = () => {
    let [message, setMessage] =useState("");
    let [_description, setDescription] = useState("")
    let [_title, setTitle] = useState("")
    let [_numAttendees, setNumAttendees] = useState(-1)
    let [_date, setDate]=useState()
    const titleChange = (event)=>{
        setTitle(event.target.value)
    }
    const descChange = (event)=>{
        setDescription(event.target.value)
    }
    const dateChange = (event)=>{
        setDate(event.target.value)
    }
    const numAttendeesChange = (event)=>{
        setNumAttendees(event.target.value)
    }
    const makeWorkshop = (event)=>{
        console.log("here")
        const y = { title: _title, hosts: [], description: _description, date: _date, numAttendees: _numAttendees, attendees:[]}
        console.log(y)
        if(_title&&_description&&_numAttendees>=0){
            console.log("here2")
            try{
                
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },

                    body: JSON.stringify(y)
                };
                fetch('http://localhost:3000/workshop', requestOptions).then(response=>{
                    response.json().then(data=>{if(data.title==_title){
                        setMessage("Post completed!")
                        console.log(message+"here4")
                    }
                    else{
                        setMessage("Post unsuccessful")
                        console.log(message+"here5")
                    }})
                })

            }
            catch(err){
                console.log(err)
            }
        }
        else{
            console.log("here3")
            message="Missing a field"
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
                onChange={numAttendeesChange}
            />
            <div>{message}</div>
            <div className="home"><button className="button" onClick={makeWorkshop}>Create</button></div>
        
        </div>)
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
export const DeleteWorkshops=()=>{
    let [x,setX]=useState({})
    let [id, setID]=useState()
    useEffect(()=>{    findWorkshops().then(result=>
        setX(result)
    )},[])
    const idChange = (event)=>{
        setID(event.target.value)
    }
    const delWorkshop = ()=>{
        if(id){
                console.log({workshopID: id})
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    
                    body: JSON.stringify({workshopID: id})
                };
                fetch('http://localhost:3000/workshop', requestOptions)
                window.location.reload(false)

        }
    }
    return(
    <div>
        {JSON.stringify(x)}
        
        <div className="home"><br></br><br></br>
    ID of Workshop to delete
            <input
                type="text"
                id="id"
                onChange={idChange}
                placeholder="id"
            />
            <br></br><button className="button" onClick={delWorkshop}>Delete</button></div>

    </div>
    )
}
