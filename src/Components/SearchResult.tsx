import React, { useContext } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import { UserData, UserDataType } from "../Context/UserData";
import { UsersType } from "../Type/UserType";
interface PostsProps {
  userDetails: UsersType;
  startChats: () => void;
}
export const SearchResult = ({ userDetails, startChats }: PostsProps) => {
  const { startChat } = useContext(UserData) as UserDataType;

  return (
    <div className="result" onClick={() => startChat(userDetails)}>
      <div className="user-div" onClick={startChats}>
        <img className="profile" src={userDetails?.avatarPath} alt="profile" />
        <h1 className="user-name">{userDetails?.displayName}</h1>
        {userDetails.isOnline ? (
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
