import React, { useContext } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import { UserData, UserDataType } from "../Context/UserData";
import { UsersType } from "../Type/UserType";
interface PostsProps {
  details: any;
  startChats: (x:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
export const SearchResult = ({ details, startChats }: PostsProps) => {
  const { startChat } = useContext(UserData) as UserDataType;

  return (
    <div className="result" onClick={() => startChat(details)}>
      <div className="user-div" onClick={() => startChats(details.uid)}>
        <img className="profile" src={details?.avatarPath} alt="profile" />
        <h1 className="user-name">{details?.displayName}</h1>
        {details.isOnline ? (
          <div className="online-div">
            <RiRadioButtonLine className="online" />
          </div>
        ) : (
          <div className="online-div">
            <RiRadioButtonLine className="offline" />
          </div>
        )}
      </div>
    </div>
  );
};
