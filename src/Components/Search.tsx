import React, { useContext, useState } from "react";
import {
  query,
  collection,
  where,
  doc,
  getDoc,
  onSnapshot
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { SearchResult } from "./SearchResult";
import { User, UserType } from "../Context/User";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { GiThreeFriends } from "react-icons/gi";
import { UserData, UserDataType } from "../Context/UserData";
import { UsersType } from "./../Type/UserType";

export default function Search() {
  const [userName, setUserName] = useState<string | number>();
  const { user } = useContext(User) as UserType;
  const { userDetails, setUserDetails } = useContext(UserData) as UserDataType;

  let navigate = useNavigate();

  const searchUser = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", userName));
    onSnapshot(q, (snap) => {
      let array: any = [];
      snap.forEach((user) => {
        array.push(user.data());
      });
      setUserDetails(array);
    });
    setUserName("");
  };

  const startChats = async (x: string | number) => {
    const from = user.uid;
    const to = x;
    const id = from > to ? `${from + to}` : `${to + from}`;
    console.log(id);
    const get = await getDoc(doc(db, "chats", id));
    if (from === to) return;
    if (!get.exists()) {
      navigate("/Chat");
      setUserDetails([]);
    }
  };

  const enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && searchUser();
  };

  return (
    <div className="search-div">
      <div className="search">
        <div className="allFriend">
          <h1 className="users">Chats</h1>
          <Link className="link" to="/Users">
            <GiThreeFriends className="GiThreeFriends" />
          </Link>
        </div>
        <div className="input">
          <input
            className="search-USERS"
            type="text"
            placeholder="Search or start a new chat "
            name="userName"
            value={userName}
            onKeyDown={enter}
            onChange={(e) => setUserName(e.target.value)}
          />
          <BsSearch className="search-icon" />
        </div>
      </div>
      <div className="search-result">
        {userDetails &&
          userDetails.map((details: UsersType) => (
            <div>
              <SearchResult details={details} startChats={startChats} />
            </div>
          ))}
        <div className="line"></div>
      </div>
    </div>
  );
}
