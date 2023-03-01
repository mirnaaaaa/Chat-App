import React from "react";
import { AiFillEye } from "react-icons/ai";
import Moment from "react-moment";
import { PostType } from "../Context/Posts";

interface ViewProps {
  view: PostType;
  seen: PostType[];
}

export const SeenStatus = ({ view, seen }: ViewProps) => {
  return (
    <div className="seen-status">
      <div className="seenBy">
        <div className="viewLength">
          <AiFillEye className="AiFillEye" />
          {seen.length ? (
            <p className="numberViews">({seen.length})</p>
          ) : (
            <p className="numberViews">(0)</p>
          )}
        </div>
        <div className="handleSeen">
            <img className="seenProfile" src={view.photo} alt="profile"/>
        <h1 className="seenName">{view.name}</h1>
        <small className="last-messageTime-seen">
          <Moment fromNow>{view.time.toDate()}</Moment>
        </small>
        </div>
      </div>
    </div>
  );
};
