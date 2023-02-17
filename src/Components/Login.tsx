import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { auth, db } from '../FirebaseConfig';

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
            // localStorage.setItem("isAuth", true);
            setTimeout(() => {
                navigate("/");
              //setIsAuth(true);
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
    <div>
      <ToastContainer />
    
      <input
        placeholder="Enter your email"
        type="text"
        name="email"
        value={data.email}
        onChange={handleSubmit}
      />
      <input
        placeholder="Enter your password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleSubmit}
      />
      <button onClick={submit}>Login</button>
    </div>
  );
}
