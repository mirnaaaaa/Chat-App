import { onSnapshot, doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import { User, UserType } from "../Context/User";
import { UserData, UserDataType } from "../Context/UserData";
import { db } from "../FirebaseConfig";
import { ChatsType } from "../Type/ChatsType";
import { UsersType } from "../Type/UserType";

interface ChatType {
  USER: UsersType;
}

export const AllChats = ({ USER }: ChatType) => {
  const [last, setLast] = useState<ChatsType>();
  const { startChat } = useContext(UserData) as UserDataType;
  const { user } = useContext(User) as UserType;

  const from = user.uid;
  const to: any = user.uid === USER.userId ? USER.uid : USER.userId;
  const id = from > to ? `${from + to}` : `${to + from}`;

  useEffect(() => {
    const snap = onSnapshot(doc(db, `lastMessage/${id}`), (x) => {
      if (x.exists()) {
        const L: any = { ...x.data() };
        setLast(L);
      }
    });
    return () => snap();
  }, [id, last]);

  return (
    <div>
      <div className="user-div" onClick={() => startChat(USER)}>
        <div className="handleSpace" key={USER.uid}>
          {USER.uid !== user.uid && USER.userId !== user.uid ? (
            <></>
          ) : (
            <>
              {user.uid === USER.userId ? (
                <>
                  <img
                    className="profile"
                    src={USER.avatarpath}
                    alt="profile"
                  />
                  <div className="lasTime">
                    <div className="flex-grow">
                      <h1 className="user-name">{USER.displayname}</h1>
                      {last?.to === USER.displayname ? (
                        <>
                          <h1 className="last-message"> {last?.text}</h1>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  {last?.to === USER.displayname ? (
                    <>
                      <small className="last-messageTime">
                        <Moment fromNow>{last?.time.toDate()}</Moment>
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <img
                    className="profile"
                    src={USER.avatarPath}
                    alt="profile"
                  />
                  <div className="lasTime">
                    <div className="flex-grow">
                      <h1 className="user-name">{USER.displayName}</h1>
                      {last?.to === USER.displayname ? (
                        <>
                          <h1 className="last-message"> {last?.text}</h1>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  {last?.to === USER.displayname ? (
                    <>
                      <small className="last-messageTime">
                        <Moment fromNow>{last?.time.toDate()}</Moment>
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
