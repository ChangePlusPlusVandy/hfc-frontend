import React,{useState} from 'react'
import { updatePassword,signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import './ChangePassModal.css';


const ChangePasswordModal = ({showModal}) => {

  const [oldPass,setOldPass] = useState("");
  const [newPassConfirm,setNewPassConfirm] = useState("");
  const [newPass,setNewPass] = useState("");
  const [error, setError] = useState("");

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      console.log('got here')
      showModal(false);
    }
  }

  const handlePasswordChange = async () => {
    const fbuser = auth.currentUser;
    if (newPass != newPassConfirm) {
      console.log("Password's don't match")
    } else {
      // Check if oldPassword is correct
      try {
        const userCreds = await signInWithEmailAndPassword(auth,fbuser.email,oldPass);
        if (userCreds) {
          updatePassword(fbuser,newPass).then(() => {
            console.log("Password updates successfully")
          }).catch((err) => {
            console.log(err);
          }) 
        }
      } catch (err) {
          console.log(err);
          console.log(err.message);
          if (err.message in ERRORS) {
              setError(ERRORS[err.message]);
          }
      }
      
    }
  }



  return (
    <div className='changepass-overlay' onClick={handleOverlayClick}>
      <div className='changepass-content'>
        <h2 className='changepass-title'>Change your password.</h2>
        <div>
        <label className="changepass-label">Old Password</label>
        <input onChange={(e) => setOldPass(e.target.value)} value={oldPass} className="changepass-input" type='password'></input>
        <label className="changepass-label">New Password</label>
        <input onChange={(e) => setNewPass(e.target.value)} value={newPass} className="changepass-input" type='password'></input> 
        <label className="changepass-label">Confirm New Password</label>
        <input onChange={(e) => setNewPassConfirm(e.target.value)} value={newPassConfirm} className="changepass-input" type='password'></input>
        </div>
        <button className='changepass-btn' onClick={handlePasswordChange}>Submit</button>
      </div>
    </div>
  )
}

export default ChangePasswordModal



const ERRORS = {
  "Firebase: Error (auth/wrong-password).":
      "Incorrect username or password",
  "Firebase: Error (auth/user-not-found).":
      "Incorrect username or password",
  "Firebase: Error (auth/internal-error).":
      "Server error, please try again",
};