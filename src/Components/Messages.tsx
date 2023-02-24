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
    <div  className={`message-container ${ message.from === user.displayName && "user"}`} ref={scroll} >
      <div className="right" >
        <div className="padding-text">
        <span></span>
        <div className={ message.from === user.displayName ? "user1" : "user2"}>
        <h1 className="message-text">
          {message.text}
        </h1>
        {message.photo && <img className="message-text" src={message.photo} alt="photos" />}
        <span className="span"></span>
        <small className="time-message">
          <Moment  fromNow>{message.time.toDate()}</Moment>
        </small>
        </div>
      </div>
      </div>
    </div>
  );
};
