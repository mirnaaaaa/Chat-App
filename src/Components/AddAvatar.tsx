import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, userType } from "../Context/User";
import { db, storage } from "../FirebaseConfig";
import Add from "../Images/addAvatar.png";

export const AddAvatar = () => {
  const [avatar, setAvatar] = useState<any>(null);
  const { docId } = useContext(User) as userType;

  let navigate = useNavigate();

  const addFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return;
    }
    setAvatar(e.target.files[0]);
  };

  useEffect(() => {
    if (avatar) {
      const uploading = async () => {
        const name = new Date().getTime() + avatar.name;
        const imgRef = ref(storage, `image/${name}`);
        try {
          await uploadBytesResumable(imgRef, avatar).then(() => {
            getDownloadURL(imgRef).then(async (url) => {
              await updateDoc(doc(db, "users", docId), {
                avatarPath: url
              });
            });
          });
          setTimeout(() => {
            navigate("/");
          }, 3000);
          setAvatar(null);
        } catch (err) {
          console.log(err);
        }
      };
      uploading();
    }
  }, [avatar, docId, navigate]);

  return (
    <div>
      <input
        required
        style={{ display: "none" }}
        type="file"
        id="file"
        onChange={addFile}
      />
      <label htmlFor="file">
        <img src={Add} alt="Profile" />
        <span>Add an avatar</span>
      </label>
    </div>
  );
};
