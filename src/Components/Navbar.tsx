import React from 'react'
import { useContext } from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { User, userType } from '../Context/User';
import { auth, db } from '../FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const {docId} = useContext(User)  as userType

  let navigate = useNavigate();

  const handleLogout = async () => {
    updateDoc(doc(db, "users", docId), {
      isOnline: false
    })
    await signOut(auth).then(() => {
      navigate("/Login");
    });
  };
  return (
    <div>
        {docId ? 
      <>
      <Link to="/Profile">Profile</Link>
      <h1 onClick={handleLogout}>LogOut</h1>
      </>  :
      <>

      <Link to="/SignUp">Sign in</Link>
      <Link to="/Login">register</Link>
      </>
      }
    </div>
  )
}
