import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { ChangeEvent, useContext, useEffect } from "react";
import { useState } from "react";
import { User, userType } from "../Context/User";
import { db } from "../FirebaseConfig";

export const EditProfile = () => {
  const [ user, setUser]  = useState<any>()
  console.log(user)
  const [details, setDetails] = useState({
    name: "",
    email: ""
  });
  const [password, setPassword] = useState<number | string>()
  const [newPassword, setNewPassword] = useState<number | string>()

  const { docId } = useContext(User) as userType;

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const changeName = () => {
    if (details) {
      updateDoc(doc(db, "users", docId), {
        displayName: details.name,
        email: details.email
      });
    }
    setDetails({
      name: "",
      email: ""
    });
  };

  useEffect(() => {
  const res =   getDoc(doc(db, "users", docId)).then((snap) => {
      setUser(snap.data());
  });

  })

const changePassword = () => {
  
}

  return (
    <div>
      <input
        type="text"
        placeholder="change name"
        name="name"
        value={details.name}
        onChange={handleInput}
      />
      <input
        type="text"
        placeholder="change email"
        name="email"
        value={details.email}
        onChange={handleInput}
      />
            <button onClick={changeName}>Change</button>
            <br></br>
      <input
        type="password"
        placeholder="your old password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input 
       type="password"
       placeholder="New password"
       name="newPassword"
       value={newPassword}
       onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={changePassword}>Change</button>
    </div>
  );
};
