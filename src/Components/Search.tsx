import React, { useContext, useState } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { SearchResult } from "./SearchResult";
import { User, UserType } from "../Context/User";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

export default function Search() {
  const [userName, setUserName] = useState<string | number>();
  const { user, userDetails, setUserDetails, setCombined } = useContext(
    User
  ) as UserType;

  let navigate = useNavigate();

  const searchUser = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    const Q = await getDocs(q);
    Q.forEach((details) => {
      setUserDetails(details.data());
      setCombined(details.data());
    });
    setUserName("");
  };

  const from = user.uid;
  const to = userDetails?.uid;
  const id = from > to ? `${from + to}` : `${to + from}`;

  const startChats = async () => {
    const get = await getDoc(doc(db, "chats", id));
    if(from === to) return
    if (!get.exists()) {
      await setDoc(doc(db, "chat", id), {
        displayName: user?.displayName,
        avatarPath: user?.avatarPath,
        isOnline: user?.isOnline,
        userId: user.uid,
        uid: userDetails?.uid,
        displayname: userDetails?.displayName,
        avatarpath: userDetails?.avatarPath,
        isonline: userDetails?.isOnline,
        combined: id
      });
    }
    navigate("/Chat");
    setUserDetails("");
  };

  const enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && searchUser();
  };

  return (
    <div className="search-div">
      <div className="search">
        <h1 className="users">Chats</h1>
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
        {userDetails && (
          <div>
            <SearchResult userDetails={userDetails} startChats={startChats} />
          </div>
        )}
      </div>
    </div>
  );
}
