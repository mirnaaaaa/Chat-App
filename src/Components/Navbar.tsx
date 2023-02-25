import React from "react";
import { useContext } from "react";
import { User, UserType } from "../Context/User";
import { Link } from "react-router-dom";
import Add from "../Images/no-image.png";
import { BsChatQuote } from "react-icons/bs";
import { GiAwareness } from "react-icons/gi";
interface ShowType {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ setShow }: ShowType) {
  const { docId, user } = useContext(User) as UserType;

  return (
    <div className="nav-bar">
      <div className="nav-fixed">
        {docId && (
          <div className="nav-container">
            <div className="space">
              <BsChatQuote
                className="BsChatQuote"
                onClick={() => setShow(false)}
              />
              <GiAwareness
                className="BsChatQuote"
                onClick={() => setShow(true)}
              />
            </div>
            <div className="margin">
              <Link to="/Profile">
                <img
                  className="profile-nav"
                  src={user?.avatarPath || Add}
                  alt="profile"
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
