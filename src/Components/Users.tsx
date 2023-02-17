import React, { useContext } from "react";
import { User, UserType } from "../Context/User";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "./../FirebaseConfig";
import { EachUser } from "./EachUser";
import Search from "./Search";
import { AllUsers, AllUsersType } from "../Context/AllUsers";

export default function Users() {
  const { docId } = useContext(User) as UserType;
  const { users, setUsers } = useContext(AllUsers) as AllUsersType;

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

  return (
    <div className="users-div">
      <Search />
      <div className="push-search">
        {!docId ? (
          <h1>Login first</h1>
        ) : (
          <div className="allUsers">
            {users.map((eachUser) => (
              <div key={eachUser.uid}>
                <EachUser eachUser={eachUser} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
