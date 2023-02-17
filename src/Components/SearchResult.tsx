import React, { useContext } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import { UserData, UserDataType } from "../Context/UserData";
import { UsersType } from "../Type/UserType";

interface PostsProps {
  user: UsersType;
}
export const SearchResult = ({ user }: PostsProps) => {
  const { startChat } = useContext(UserData) as UserDataType;

  return (
    <div className="result">
      <div className="user-div" onClick={() => startChat(user)}>
        <img className="profile" src={user.avatarPath} alt="profile" />
        <h1 className="user-name">{user.displayName}</h1>
        {user.isOnline ? (
          <div className="online-div">
            <RiRadioButtonLine className="online" />
          </div>
        ) : (
          <div className="online-div">
            <RiRadioButtonLine className="offline" />
          </div>
        )}
      </div>
      <div className="line"></div>
    </div>
  );
};
