import { doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, UserType } from "../Context/User";
import { db } from "../FirebaseConfig";

export const AboutYou = () => {
  const [about, setAbout] = useState<string | number>();
  const { docId } = useContext(User) as UserType;

  let navigate = useNavigate();

  const update = () => {
    if (about) {
      updateDoc(doc(db, "users", docId), {
        about
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    setAbout("");
  };

  return (
    <div className="addAvatar">
      <h1 className="aboutYou">About you:</h1>
      <input
        className="loginPassword"
        placeholder="busy..."
        name="about"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <div className="space-between">
        <button className="SKIP" onClick={update}>
          Update
        </button>
      </div>
      <Link className="link" to="/">
        <button className="SKIP">Skip</button>
      </Link>
    </div>
  );
};
