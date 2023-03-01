import React, { useContext } from "react";
import { User, UserType } from "../Context/User";
import { UserData, UserDataType } from "../Context/UserData";
import { UsersType } from "./../Type/UserType";
interface PostsProps {
  details: UsersType;
  startChats: (x: string | number) => void;
}
export const SearchResult = ({ details, startChats }: PostsProps) => {
  const { startChat } = useContext(UserData) as UserDataType;
  const { user } = useContext(User) as UserType;

  return (
    <div className="result" onClick={() => startChat(details)}>
      {user.uid !== details.uid && (
        <div className="user-div" onClick={() => startChats(details.uid)}>
          <img className="profile" src={details?.avatarPath} alt="profile" />
          <h1 className="user-name">{details?.displayName}</h1>
        </div>
      )}
    </div>
  );
};
