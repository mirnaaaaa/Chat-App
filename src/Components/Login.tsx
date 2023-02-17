import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { auth, db } from "../FirebaseConfig";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  let navigate = useNavigate();

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        updateDoc(doc(db, "users", res.user.uid), {
          isOnline: true
        })
          .then(() => {
            setData({
              email: "",
              password: ""
            });
            toast.success("Login successfully");
            setTimeout(() => {
              navigate("/");
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
        <div className="loginData">
          <input
            className="loginEmail"
            placeholder="Enter your email"
            type="text"
            name="email"
            value={data.email}
            onChange={handleSubmit}
          />
        </div>
        <input
          className="loginPassword"
          placeholder="Enter your password"
          type="password"
          name="password"
          value={data.password}
          onChange={handleSubmit}
        />
        <div className="LOGINDiv">
          <button className="LOGIN" onClick={submit}>
            Login
          </button>
        </div>
        <div className="LOGINDivs">
        <Link className="link" to="/SignUp">
        <button className="LOGIN">SignUp</button>
        </Link>
      </div>
      </div>
    </div>
  );
}
