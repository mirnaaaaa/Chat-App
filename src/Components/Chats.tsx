import { collection, query, onSnapshot, doc, getDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { useEffect } from "react";
import { db } from "../FirebaseConfig";
import { useState } from "react";
import { AllChats } from "./AllChats";
import Search from "./Search";
import { User, UserType } from "../Context/User";

export const Chats = () => {
  const [chats, setChats] = useState<any>([]);

  useEffect(() => {
    // const fetch = async() => {
    //  const get = await getDoc(doc(db, "chats", id));
    //if (!get.exist()) return
    const usersRef = collection(db, "chat");
    const q = query(usersRef);
    const getUsers = onSnapshot(q, (snap) => {
      let array: any = [];
      snap.forEach((user) => {
        array.push(user.data());
      });
      setChats(array);
    });
    // }
    return () => getUsers();
  }, []);

  return (
    <div className="users-div">
      <Search />
      <div className="push-search">
        {chats.length === 0 && <h1 className="findFriends">No chats yet</h1>}
        {chats &&
          chats.map((USER: any) => (
            <div key={USER.combined}>
              <AllChats USER={USER} />
            </div>
          ))}
      </div>
    </div>
  );
};
