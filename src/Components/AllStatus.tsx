import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { PostType } from "../Context/Posts";

interface StatusProps {
  post: PostType;
}

export const AllStatus = ({ post }: StatusProps) => {
  return (
    <div className="allStatus">
      <div className="status-div">
        <Link className="link" to={`/ShowStatus/${post.Id}`}>
            <img className= "profile-status" src={post.image} alt="Profile" />
          <div className="name-time">
            <p className="status-name">{post.name}</p>
            <span className="date">
              <Moment fromNow>{post.time.toDate()}</Moment>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
