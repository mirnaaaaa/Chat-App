import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { User, UserType } from "../Context/User";
import { UserData, UserDataType } from "../Context/UserData";
import { db, storage } from "../FirebaseConfig";
import { AiOutlineUpload } from "react-icons/ai";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Messages } from "./Messages";
import { Link } from "react-router-dom";
import { ChatsType } from "./../Type/ChatsType";

export default function Chat() {
  const [text, setText] = useState<string | number>("");
  const [photo, setPhoto] = useState<File | undefined>();
  const { setChats, chats, chat } = useContext(UserData) as UserDataType;
  const { user } = useContext(User) as UserType;

  const addFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return;
    }
    setPhoto(e.target.files[0]);
  };

  const from = user.uid;
  const to: any =
    (!chat.userId && chat.uid) || user.uid === chat.userId
      ? chat.uid
      : chat.userId;
  const id = from > to ? `${from + to}` : `${to + from}`;

  const sendMessage = async () => {
    if (text) {
      const get = await getDoc(doc(db, "chat", id));
      if (get.exists() && chat.displayname) {
        await addDoc(collection(db, "chats", id, "messages"), {
          text,
          from: user.displayName,
          to: chat.displayname,
          time: Timestamp.now(),
          Id: id
        });
        await setDoc(doc(db, "lastMessage", id), {
          text,
          from: user.displayName,
          to: chat.displayname,
          time: Timestamp.now()
        });
      }
      if (get.exists() && !chat.displayname) {
        await addDoc(collection(db, "chats", id, "messages"), {
          text,
          from: user.displayName,
          to: chat.displayName,
          time: Timestamp.now(),
          Id: id
        });
        await setDoc(doc(db, "lastMessage", id), {
          text,
          from: user.displayName,
          to: chat.displayName,
          time: Timestamp.now()
        });
      }
      if (!get.exists()) {
        await setDoc(doc(db, "chat", id), {
          displayName: user?.displayName,
          avatarPath: user?.avatarPath,
          userId: user.uid,
          uid: chat?.uid,
          displayname: chat?.displayName,
          avatarpath: chat?.avatarPath,
          combined: id,
          time: serverTimestamp()
        });
        await addDoc(collection(db, "chats", id, "messages"), {
          text,
          from: user.displayName,
          to: chat.displayName,
          time: Timestamp.now(),
          Id: id
        });
        await setDoc(doc(db, "lastMessage", id), {
          text,
          from: user.displayName,
          to: chat.displayName,
          time: Timestamp.now()
        });
      }
      setText("");
    }
    if (photo) {
      const name = new Date().getTime() + photo.name;
      const imgRef = ref(storage, `photos/${name}`);
      await uploadBytesResumable(imgRef, photo).then(() => {
        getDownloadURL(imgRef).then(async (url) => {
          const get = await getDoc(doc(db, "chat", id));
          if (get.exists() && chat.displayname) {
            await addDoc(collection(db, "chats", id, "messages"), {
              photo: url,
              from: user.displayName,
              to: chat.displayname,
              time: Timestamp.now(),
              Id: id
            });
            await setDoc(doc(db, "lastMessage", id), {
              photo: url,
              from: user.displayName,
              to: chat.displayname,
              time: Timestamp.now()
            });
          }
          if (get.exists() && !chat.displayname) {
            await addDoc(collection(db, "chats", id, "messages"), {
              photo: url,
              from: user.displayName,
              to: chat.displayName,
              time: Timestamp.now(),
              Id: id
            });
            await setDoc(doc(db, "lastMessage", id), {
              photo: url,
              from: user.displayName,
              to: chat.displayName,
              time: Timestamp.now()
            });
          }
          if (!get.exists()) {
            await setDoc(doc(db, "chat", id), {
              displayName: user?.displayName,
              avatarPath: user?.avatarPath,
              userId: user.uid,
              uid: chat?.uid,
              displayname: chat?.displayName,
              avatarpath: chat?.avatarPath,
              combined: id,
              time: serverTimestamp()
            });
            await addDoc(collection(db, "chats", id, "messages"), {
              photo: url,
              from: user.displayName,
              to: chat.displayName,
              time: Timestamp.now(),
              Id: id
            });
            await setDoc(doc(db, "lastMessage", id), {
              photo: url,
              from: user.displayName,
              to: chat.displayName,
              time: Timestamp.now()
            });
          }
        });
      });
      setPhoto(undefined);
    }
  };

  useEffect(() => {
    const q = query(collection(db, `chats/${id}/messages`), orderBy("time"));
    const snap = onSnapshot(q, (snap) => {
      let array: any = [];
      snap.forEach((doc) => {
        array.push({ ...doc.data(), Id: doc.id });
      });
      setChats(array);
    });
    return () => snap();
  }, [id, setChats]);

  const sent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && sendMessage();
  };

  return (
    <div className="chat">
      <div className="fixed">
        {chat && (
          <div className="chat-header">
            <div className="chat-div" key={chat.uid}>
              {chat.userId === user.uid ? (
                <>
                  <img
                    className="profile-chat"
                    src={chat.avatarpath}
                    alt="Profile"
                  />

                  <div className="name-time"></div>
                  <Link
                    className="link"
                    to={`/UserInformation/${chat.displayname}`}
                  >
                    <div className="handleYourself">
                      <h1 className="user-name">{chat.displayname}</h1>
                      {chat.uid === user.uid &&
                        chat.userId &&
                        chat.userId === chat.uid && (
                          <h1 className="yourself">(Message yourself)</h1>
                        )}
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <img
                    className="profile-chat"
                    src={chat.avatarPath}
                    alt="Profile"
                  />
                  <div className="name-time"></div>
                  <Link
                    className="link"
                    to={`/UserInformation/${chat.displayName}`}
                  >
                    <div className="handleYourself">
                      <h1 className="user-name">{chat.displayName}</h1>
                      {chat.userId && chat.userId === chat.uid && (
                        <h1 className="yourself">(Message yourself)</h1>
                      )}
                      {!chat.userId && chat.uid === user.uid && (
                        <h1 className="yourself">(Message yourself)</h1>
                      )}
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="conversation">
        {chats &&
          chats.map((message: ChatsType) => (
            <div key={message.Id}>
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
            placeholder={photo ? "Sent photo" : "Type a message"}
            name="text"
            value={text}
            onKeyDown={sent}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
