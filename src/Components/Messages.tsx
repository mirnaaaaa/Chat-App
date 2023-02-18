import React, { useContext, useEffect, useRef } from "react";
import { User, UserType } from "../Context/User";
import Moment from "react-moment";

export const Messages = ({ message }: any) => {
  const { user } = useContext(User) as UserType;

  const scroll = useRef<null | HTMLDivElement>(null); 

  useEffect(() => {
scroll.current?.scrollIntoView({behavior: "smooth"})
  },[])

  return (
    <div className="message-container" ref={scroll} >
      <div className="right">
        <h1 className={ message.from === user.displayName ? "user1" : "user2"}>
          {message.text}
        </h1>
        <small className="time-message">
          <Moment  fromNow>{message.time.toDate()}</Moment>
        </small>
        {message.photo && <img src={message.photo} alt="photos" />}
      </div>
    </div>
  );
};
