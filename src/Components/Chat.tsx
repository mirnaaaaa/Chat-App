import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import { User, UserType } from "../Context/User";
import { UserData, UserDataType } from "../Context/UserData";
import { db, storage } from "../FirebaseConfig";
import { AiOutlineUpload } from "react-icons/ai";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Messages } from "./Messages";
import { Link } from "react-router-dom";
import { TiArrowForwardOutline } from "react-icons/ti";

export default function Chat() {
  const [text, setText] = useState<string | number>("");
  const [photo, setPhoto] = useState<any>(null);
  const { chat, setChats, chats } = useContext(UserData) as UserDataType;
  const { user } = useContext(User) as UserType;

  const addFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return;
    }
    setPhoto(e.target.files[0]);
  };

  const from = user.uid;
  const to = chat.map((x) => x.uid);
  const id = from > to ? `${from + to}` : `${to + from}`;
  const sendMessage = async () => {
    if (text) {
      await addDoc(collection(db, "chats", id, "messages"), {
        text,
        from: user.displayName,
        to: chat.map((x) => x.displayName),
        time: Timestamp.now()
      });
      await setDoc(doc(db, "lastMessage", id), {
        text,
        from: user.displayName,
        to: chat.map((x) => x.displayName),
        time: Timestamp.now()
      });
      setText("");
    }
    if (photo) {
      const name = new Date().getTime() + photo.name;
      const imgRef = ref(storage, `photos/${name}`);
      await uploadBytesResumable(imgRef, photo).then(() => {
        getDownloadURL(imgRef).then(async (url) => {
          await addDoc(collection(db, "chats", id, "messages"), {
            photo: url,
            from: user.displayName,
            to: chat.map((x) => x.displayName),
            time: Timestamp.now()
          });
          await setDoc(doc(db, "lastMessage", id), {
            photo: url,
            from: user.displayName,
            to: chat.map((x) => x.displayName),
            time: Timestamp.now()
          });
        });
      });
      setPhoto(null);
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, `chats/${id}/messages`),
      orderBy("time", "asc")
    );
    const snap = onSnapshot(q, (snap) => {
      let array: any = [];
      snap.forEach((doc) => {
        array.push({ ...doc.data(), Id: doc.id });
      });
      setChats(array);
    });
    return () => snap();
  }, [id, setChats]);

  return (
    <div className="chat">
      <div className="fixed">
        {chat &&
          chat.map((x) => (
            <div className="chat-header" key={x.uid}>
              <div className="chat-div" key={x.uid}>
                <img
                  className="profile-chat"
                  src={x.avatarPath}
                  alt="Profile"
                />
                <Link className="link" to={`/UserInformation/${x.displayName}`}>
                  <h1 className="user-name">{x.displayName}</h1>
                </Link>
                {user.isOnline ? (
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
          ))}
      </div>
      <div className="conversation">
        {chats &&
          chats.map((message: any) => (
            <div>
              <Messages message={message} />
            </div>
          ))}
      </div>
      <div className="type">
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          onChange={addFile}
        />
        <label htmlFor="file">
          <AiOutlineUpload className="addImage" />
        </label>
        <div className="div-sendMessage">
          <input
            className="yourMessage"
            placeholder="Type a message"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <TiArrowForwardOutline className="btn-send" onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
}
