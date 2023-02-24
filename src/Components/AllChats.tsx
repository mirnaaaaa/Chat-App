import { onSnapshot, doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import Moment from "react-moment";
import { User, UserType } from "../Context/User";
import { UserData, UserDataType } from "../Context/UserData";
import { db } from "../FirebaseConfig";

interface ChatType {
  USER: any;
}

export const AllChats = ({ USER }: ChatType) => {
  const [last, setLast] = useState<any>();
  const { startChat } = useContext(UserData) as UserDataType;
  const { user } = useContext(User) as UserType;

  const from = user.uid;
  const to = user.uid === USER.userId ? USER.uid : USER.userId;
  const id = from > to ? `${from + to}` : `${to + from}`;

  useEffect(() => {
    const snap = onSnapshot(doc(db, `lastMessage/${id}`), (x) => {
      if (x.exists()) {
        setLast({ ...x.data() });
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
                  <h1 className="user-name">{USER.displayname}</h1>
                  {
                    //last?.to !== USER.displayname ? (
                    // <>
                    //<div className="lasTime">
                    //<small className="last-messageTime">
                    // <Moment fromNow>{last.time.toDate()}</Moment>
                    //</small>
                    //<h1 className="last-message"> {last.text}</h1>
                    //</div>
                    // </>
                    //) : (
                    /// <></>
                    //)
                  }
                </>
              ) : (
                <>
                  <img
                    className="profile"
                    src={USER.avatarPath}
                    alt="profile"
                  />
                  <h1 className="user-name">{USER.displayName}</h1>
                  {
                    //last?.to === USER.displayname ? (
                    //<>
                    //<div className="lasTime">
                    //<small className="last-messageTime">
                    //<Moment fromNow>{last.time.toDate()}</Moment>
                    ////  </small>
                    //<h1 className="last-message"> {last.text}</h1>
                    //</div>
                    // </>
                    //) : (
                    // <></>
                    //)
                  }
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
