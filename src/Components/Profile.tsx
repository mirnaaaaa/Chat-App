import React, { useContext, useState } from "react";
import { User, userType } from "../Context/User";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./../FirebaseConfig";
import { Link } from "react-router-dom";

type User = {
  createdAt: string[];
  email: string | number;
  displayName:  string | number;
  isOnline: boolean;
  password:  string | number;
  uid:  string | number;
}

export const Profile = () => {
  const [user, setUser] = useState<any>();
  const { docId } = useContext(User) as userType;

  useEffect(() => {
    getDoc(doc(db, "users", docId)).then((snap) => {
      if(snap.exists()) {
        setUser(snap.data());
      }
    });
  }, [docId]);

  return (
    <div>
      <Link to="/EditProfile">
        <button>Edit Profile</button>
      </Link>
      {user && <>
        <h1>Name: {user?.displayName}</h1>
      <img src={user?.avatarPath} alt="profile" />
      <h1>Email: {user?.email}</h1>
      <h1>Created at: {user?.createdAt.toDate().toDateString()}</h1>
      </>}
     
    </div>
  );
};
