import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FcPicture } from "react-icons/fc";
import { Posts, PostsType } from "../Context/Posts";
import { User, UserType } from "../Context/User";
import { db, storage } from "../FirebaseConfig";

export const AddStatus = () => {
  const [text, setText] = useState<number | string>();
  const [photo, setPhoto] = useState<any>(null);
  const { user } = useContext(User) as UserType;
  const { setPosts } = useContext(Posts) as PostsType;

  const addFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return;
    }
    setPhoto(e.target.files[0]);
  };

  const addPost = async () => {
    if (text) {
      await addDoc(collection(db, "Posts"), {
        text,
        time: Timestamp.now(),
        name: user.displayName,
        image: user.avatarPath,
        Seen: false
      });
      setText("");
    }
    if (photo) {
      const name = new Date().getTime() + photo.name;
      const imgRef = ref(storage, `postsPhotos/${name}`);
      await uploadBytesResumable(imgRef, photo).then(() => {
        getDownloadURL(imgRef).then(async (url) => {
          await addDoc(collection(db, "Posts"), {
            photo: url,
            time: Timestamp.now(),
            name: user.displayName,
            image: user.avatarPath,
            Seen: false
          });
        });
      });
      setPhoto(null);
    }
  };

  useEffect(() => {
    const q = query(collection(db, `Posts`), orderBy("time", "asc"));
    const update = onSnapshot(q, (snap) => {
      let array: any = [];
      snap.forEach((doc) => {
        array.push({ ...doc.data(), Id: doc.id });
      });
      setPosts(array);
    });
    return () => update();
  }, [setPosts]);

  return (
    <div className="addStatus-div">
      <h1 className="mind">What's in your mind</h1>
      <textarea
        className="textarea"
        placeholder="Type a status"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        style={{ display: "none" }}
        type="file"
        id="file"
        onChange={addFile}
      />
      <label htmlFor="file">
        <div className="tapForPhoto">
          <FcPicture className="addPhoto" />
          <span className="spanPhoto">Tap for photo</span>
        </div>
      </label>
      <div className="position-post">
        <button className="postStatus" onClick={addPost}>
          Post
        </button>
      </div>
    </div>
  );
};
