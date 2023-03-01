import React, { useContext } from "react";
import { UsersType } from "../Type/UserType";
import { UserData } from "../Context/UserData";
import { UserDataType } from "../Context/UserData";
import { User, UserType } from "../Context/User";
import { useNavigate } from "react-router-dom";

interface PostsProps {
  eachUser: UsersType;
}

export const EachUser = ({ eachUser }: PostsProps) => {
  const { startChat, setUserDetails } = useContext(UserData) as UserDataType;
  const { user } = useContext(User) as UserType;

  let navigate = useNavigate();

  const startChats = async (x: string | number) => {
    const from = user.uid;
    const to = x;
    if (from === to) return;
    navigate("/Chat");
    setUserDetails([]);
  };

  return (
    <div className="user-div" onClick={() => startChat(eachUser)}>
      <div onClick={() => startChats(eachUser.uid)}>
        <div className="handleSpace">
          <img className="profile" src={eachUser.avatarPath} alt="profile" />
          <h1 className="user-name">{eachUser.displayName}</h1>
          {eachUser.uid === user.uid && (
            <h1 className="messageYourself">(You)</h1>
          )}
        </div>
      </div>
    </div>
  );
};
