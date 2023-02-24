import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AllUsers, AllUsersType } from "../Context/AllUsers";
import { useState } from "react";
import Add from "../Images/no-image.png";
import { UsersType } from "../Type/UserType";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../FirebaseConfig";

export const UserInformation = () => {
  const [information, setInformation] = useState<UsersType>();
  const { users, setUsers } = useContext(AllUsers) as AllUsersType;

  const { id } = useParams();

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "not-in", [auth.currentUser?.uid]));
    const getUsers = onSnapshot(q, (snap) => {
      let array: any = [];
      snap.forEach((user) => {
        array.push(user.data());
      });
      setUsers(array);
    });
    return () => getUsers();
  }, []);

  useEffect(() => {
    const correct = users.find((x) => x.displayName === id);
    if (correct) {
      setInformation(correct);
    }
  }, [id, users]);

  return (
    <div className="addStatus-div">
      {information && (
        <>
          <div className="log-profile">
            <div className="changeProfile">
              <img
                className="profile-change"
                src={information?.avatarPath || Add}
                alt="profile"
              />
            </div>
          </div>
          <h1>Name: {information?.displayName}</h1>
          <h1>Email: {information?.email}</h1>
          <h1>ABOUT: {information?.about || "Busy"}</h1>
          <h1>Joined at:</h1>
        </>
      )}
    </div>
  );
};
