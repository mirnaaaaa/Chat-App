import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, UserType } from "../Context/User";
import { db, storage } from "../FirebaseConfig";
import { FcAddImage } from "react-icons/fc";

export const AddAvatar = () => {
  const [avatar, setAvatar] = useState<any>(null);
  const { docId } = useContext(User) as UserType;

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
            navigate("/AboutYou");
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
    <div className="addStatus-div">
      <input
        required
        style={{ display: "none" }}
        type="file"
        id="file"
        onChange={addFile}
      />
      <label htmlFor="file">
        <div className="handle-avatar">
          <FcAddImage className="addprofile" />
          <span className="addAnAvatar">Add an avatar</span>
        </div>
      </label>
      <Link className="link " to="/AboutYou">
        <button className="SKIP">Skip</button>
      </Link>
    </div>
  );
};
