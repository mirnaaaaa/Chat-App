import React, { useContext } from "react";
import { UsersType } from "../Type/UserType";
import { UserData } from "../Context/UserData";
import { UserDataType } from "../Context/UserData";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { User, UserType } from "../Context/User";
import { useNavigate } from "react-router-dom";

interface PostsProps {
  eachUser: UsersType;
}

export const EachUser = ({ eachUser }: PostsProps) => {
  const { startChat, setUserDetails } = useContext(UserData) as UserDataType;
  const { user } = useContext(User) as UserType;

  let navigate = useNavigate();

  const startChats = async (x: any) => {
    const from = user.uid;
    const to = x;
    const id = from > to ? `${from + to}` : `${to + from}`;

    await getDoc(doc(db, "chats", id));
    if (from === to) return;
    navigate("/Chat");
    setUserDetails([]);
  };

  return (
    <div className="user-div" onClick={() => startChat(eachUser)}>
      <div onClick={() => startChats(eachUser.uid)}>
        {user.displayName !== eachUser.displayName && (
          <div className="handleSpace">
            <img className="profile" src={eachUser.avatarPath} alt="profile" />
            <h1 className="user-name">{eachUser.displayName}</h1>
          </div>
        )}
      </div>
    </div>
  );
};
