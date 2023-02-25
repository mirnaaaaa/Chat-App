import React, { useContext, useState } from "react";
import { User, UserType } from "../Context/User";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { BsFillPencilFill } from "react-icons/bs";
import Add from "../Images/no-image.png";

export const Profile = () => {
  const { user, docId, setUser } = useContext(User) as UserType;
  const [edit, setEdit] = useState<boolean>(false);
  const [editAbout, setEditAbout] = useState<boolean>(false);
  const [name, setName] = useState<string | number>(user?.displayName);
  const [changeAbout, setChangeAbout] = useState<string | number>(user?.about);

  let navigate = useNavigate();
  
  const handleLogout = async () => {
    await signOut(auth).then(() => {
      navigate("/Login");
    });
    setUser([]);
  };

  const change = () => {
    if (name) {
      updateDoc(doc(db, "users", docId), {
        displayName: name
      });
      setName("");
      setEdit(false);
    }
    if (changeAbout) {
      updateDoc(doc(db, "users", docId), {
        about: changeAbout
      });
      setChangeAbout("");
      setEditAbout(false);
    }
  };

  return (
    <div className="addStatus-div">
      {user && (
        <>
          <div className="log-profile">
            <div className="changeProfile">
              <img
                className="profile-change"
                src={user?.avatarPath || Add}
                alt="profile"
              />
              <Link to="/EditProfile">
                <BsFillPencilFill className="pen-profile" />
              </Link>
            </div>
            <h1 className="logout" onClick={handleLogout}>
              LogOut
            </h1>
          </div>
          <div className="userName">
            {edit ? (
              <>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="search-USER"
                />
                <button className="done-change" onClick={change}>
                  Change
                </button>
              </>
            ) : (
              <>
                <h1>Name: {user?.displayName}</h1>
                <BsFillPencilFill
                  className="pen"
                  onClick={() => setEdit(true)}
                />
              </>
            )}
          </div>
          <h1>Email: {user?.email}</h1>
          <div className="userName">
            {editAbout ? (
              <>
                <input
                  className="search-USER"
                  value={changeAbout}
                  onChange={(e) => setChangeAbout(e.target.value)}
                />
                <button className="done-change" onClick={change}>
                  Change
                </button>
              </>
            ) : (
              <>
                <h1>ABOUT: {user?.about || "Busy"}</h1>
                <BsFillPencilFill
                  className="pen"
                  onClick={() => setEditAbout(true)}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
