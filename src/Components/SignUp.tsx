import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import React, { ChangeEvent, useState } from "react";
import { auth, db } from "../FirebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [data, setData] = useState({
    displayname: "",
    email: "",
    password: ""
  });

  let navigate = useNavigate();

  const submitData = (e: ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        setDoc(doc(db, "users", res.user.uid), {
          displayName: data.displayname,
          email: data.email,
          password: data.password,
          uid: res.user.uid,
          createdAt: Timestamp.now(),
          isOnline: true
        })
          .then(() => {
            setData({
              displayname: "",
              email: "",
              password: ""
            });
            toast.success("Account created ");
            // localStorage.setItem("isAuth", true);
            setTimeout(() => {
              navigate("/AddAvatar");
            }, 3000);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className="loginContainer">
        <input
          className="loginEmail"
          placeholder="Enter your name"
          type="text"
          name="displayname"
          value={data.displayname}
          onChange={submitData}
          required
        />
        <input
          className="loginEmail"
          placeholder="Enter your email"
          type="email"
          name="email"
          value={data.email}
          onChange={submitData}
          required
        />
        <input
          className="loginEmail"
          placeholder="Enter your password"
          type="password"
          name="password"
          value={data.password}
          onChange={submitData}
          required
        />
        <div className="LOGINDiv">
          <button className="LOGIN" onClick={submit}>
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
}
