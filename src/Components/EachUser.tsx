import React, { useContext, useEffect, useState } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import { UsersType } from "../Type/UserType";
import { UserData } from "../Context/UserData";
import { UserDataType } from "../Context/UserData";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { User, UserType } from "../Context/User";
import Moment from "react-moment";

interface PostsProps {
  eachUser: UsersType;
}

export const EachUser = ({ eachUser }: PostsProps) => {
  const { startChat, chat } = useContext(UserData) as UserDataType;
  const { user } = useContext(User) as UserType;
  const [last, setLast] = useState<any>();

  const from = user.uid;
  const to = chat.map((x) => x.uid);
  const id = from > to ? `${from + to}` : `${to + from}`;


  useEffect(() => {
    const snap = onSnapshot(doc(db, `lastMessage/${id}`), (x) => {
      if (x.exists()) {
        setLast({ ...x.data() });
      }
    });
    return () => snap();
  }, [id, setLast]);

  return (
    <div className="user-div" onClick={() => startChat(eachUser)}>
      <div className={last?.from === eachUser.displayName ? "handle-lastMessage" : "handle-lastMessages" }>
        <div className="handleSpace">
        <img className="profile" src={eachUser.avatarPath} alt="profile" />
        <h1 className="user-name">{eachUser.displayName}</h1>
        <div className="online-div">
          <RiRadioButtonLine
            className={eachUser.isOnline ? "online" : "offline"}
          />
        </div>
        {last?.from === eachUser.displayName ? (
          <>
            <div className="lasTime">
            <small className="last-messageTime">
                <Moment fromNow>{last.time.toDate()}</Moment>
              </small>
              <h1 className="last-message"> {last.text}</h1>
             
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      </div>
    </div>
  );
};
