import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Posts, PostsType } from "../Context/Posts";
import { User, UserType } from "../Context/User";
import Add from "../Images/no-image.png";
import { AllStatus } from "./AllStatus";

export default function Status() {
  const { posts } = useContext(Posts) as PostsType;
  const { user } = useContext(User) as UserType;

  return (
    <div className="users-div">
      <div className="pad-bottom">
        <div className="fix-status">
          <h1 className="statusH1">Status</h1>
        </div>
        <div className="padding">
          <div className="color">
            <div className="handle-status">
              <img
                className="profile"
                src={user?.avatarPath || Add}
                alt="profile"
              />
              <div className="add-status">
                <h1 className="my-status">My status</h1>
                <Link className="links" to="/AddStatus">
                  <h1 className="addstatus">Add to my status </h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="hr"></hr>
        <h1 className="statusH2">Recent updates</h1>
      </div>
      {posts?.map((post) => (
        <div key={post.Id}>
          <AllStatus post={post} />
        </div>
      ))}
    </div>
  );
}
