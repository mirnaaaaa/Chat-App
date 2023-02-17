import React, { useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { UsersType } from "../Type/UserType";
import { SearchResult } from "./SearchResult";

export default function Search() {
  const [userName, setUserName] = useState<string | number>();
  const [userDetails, setUserDetails] = useState<UsersType[]>([]);

  const searchUser = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    const Q = await getDocs(q);
    let array: any = [];
    Q.forEach((details) => {
      array.push(details.data());
    });
    setUserDetails(array);
    setUserName("");
  };

  return (
    <div className="search-div">
      <div className="search">
        <h1 className="users">Users</h1>
        <div className="input">
          <input
            className="search-USERS"
            type="text"
            placeholder="Search or start a new chat "
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="search-btn" onClick={searchUser}>
            Search
          </button>
        </div>
      </div>
      <div className="search-result">
        {userDetails &&
          userDetails.map((user) => (
            <div key={user.uid}>
              <SearchResult user={user} />
            </div>
          ))}
      </div>
    </div>
  );
}
