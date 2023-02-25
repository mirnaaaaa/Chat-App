import "./App.css";
import React, { useContext, useState } from "react";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { User, UserType } from "./Context/User";
import Login from "./Components/Login";
import { Profile } from "./Components/Profile";
import { AddAvatar } from "./Components/AddAvatar";
import { UserDataProvider } from "./Context/UserData";
import Chat from "./Components/Chat";
import { UserInformation } from "./Components/UserInformation";
import { AboutYou } from "./Components/AboutYou";
import Status from "./Components/Status";
import { AllUsersProvider } from "./Context/AllUsers";
import { AddStatus } from "./Components/AddStatus";
import { PostsProvider } from "./Context/Posts";
import { ShowStatus } from "./Components/ShowStatus";
import { EditProfile } from "./Components/EditProfile";
import { Welcome } from "./Components/Welcome";
import { Chats } from "./Components/Chats";
import Users from "./Components/Users";

export default function App() {
  const { docId } = useContext(User) as UserType;
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="app">
      <Router>
        <UserDataProvider>
          <AllUsersProvider>
            <PostsProvider>
              {docId && (
                <>
                  <div className="nav-flex">
                    <Navbar setShow={setShow} />
                  </div>
                  <div className="chats-flex">
                    {show ? <Status /> : <Chats />}
                  </div>
                </>
              )}
              <div className="container">
                <Routes>
                  <Route path="/" element={<Welcome />} />
                  <Route path="/Users" element={<Users />} />
                  <Route path="/SignUp" element={<SignUp />} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/AddAvatar" element={<AddAvatar />} />
                  <Route path="/Chat" element={<Chat />} />
                  <Route path="/EditProfile" element={<EditProfile />} />
                  <Route path="/ShowStatus/:Id" element={<ShowStatus />} />
                  <Route
                    path="/UserInformation/:id"
                    element={<UserInformation />}
                  />
                  <Route path="/AboutYou" element={<AboutYou />} />
                  <Route path="/AddStatus" element={<AddStatus />} />
                </Routes>
              </div>
            </PostsProvider>
          </AllUsersProvider>
        </UserDataProvider>
      </Router>
    </div>
  );
}
