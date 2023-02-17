import React from "react";
import Chat from "./Components/Chat";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/User";
import Login from "./Components/Login";
import { Profile } from "./Components/Profile";
import { EditProfile } from "./Components/EditProfile";
import { AddAvatar } from "./Components/AddAvatar";

export default function App() {
  
  return (
    <div>
      <Router>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/AddAvatar" element={<AddAvatar />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}
