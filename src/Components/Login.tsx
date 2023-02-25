import { signInWithEmailAndPassword } from "firebase/auth";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { User, UserType } from "../Context/User";
import { auth } from "../FirebaseConfig";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const { docId } = useContext(User) as UserType;

  let navigate = useNavigate();

  useEffect(() => {
    if (docId) {
      navigate("/");
    }
  }, [docId, navigate]);

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        setData({
          email: "",
          password: ""
        });
        toast.success("Login successfully");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className="loginContainer">
        <input
          className="loginEmail"
          placeholder="Enter your email"
          type="text"
          name="email"
          value={data.email}
          onChange={handleSubmit}
        />
        <div className="loginData">
          <input
            className="loginPassword"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleSubmit}
          />
        </div>
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
