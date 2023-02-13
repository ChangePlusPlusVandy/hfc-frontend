import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import {auth} from '../../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const SingleUser = () => {
    const [user,setUser] = useState({
        firstName: '',
        lastName: '',
        languages: [],
        joinDate: '',
        level: 0,
        fbUid: ''
    })
    const [isCurrentUser,setisCurrentUser] = useState(false);
    const {fbId} = useParams()


    
    const getMongoUser = async (fbId) => {
        try {
            const res = await fetch(
                `http://localhost:3000/users?firebaseUID=${fbId}`
            );
            const mongoUser = await res.json();
            console.log(mongoUser);
            setUser({
                firstName: mongoUser[0].firstName,
                lastName: mongoUser[0].lastName,
                languages: mongoUser[0].languages,
                joinDate: mongoUser[0].joinDate,
                level: mongoUser[0].level,
                fbUid: mongoUser[0].firebaseUID
            });
        } catch (err) {
            console.error(err)
            console.log(err.message)
        }
        
    }

    onAuthStateChanged(auth, async (fbuser) => {
        if (fbuser) {
            console.log(fbuser.uid,'g',user.fbUid)
            setisCurrentUser(fbuser.uid == user.fbUid);
        } else {
            navigate("../login");
        }
    });


    useEffect(() => {
        getMongoUser(fbId)
    },[])
  return (
    <div>{isCurrentUser ? "true" : "false"} </div>

  )
}

export default SingleUser