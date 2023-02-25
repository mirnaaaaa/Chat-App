import React, { useContext } from "react";
import { UserData, UserDataType } from "../Context/UserData";
import { UsersType } from "./../Type/UserType";
interface PostsProps {
  details: UsersType;
  startChats: (x: string | number) => void;
}
export const SearchResult = ({ details, startChats }: PostsProps) => {
  const { startChat } = useContext(UserData) as UserDataType;

  return (
    <div className="result" onClick={() => startChat(details)}>
      <div className="user-div" onClick={() => startChats(details.uid)}>
        <img className="profile" src={details?.avatarPath} alt="profile" />
        <h1 className="user-name">{details?.displayName}</h1>
      </div>
    </div>
  );
};
