import React from "react";
import Moment from "react-moment";
import { PostType } from "../Context/Posts";
interface ViewProps {
  view: PostType;
}

export const SeenStatus = ({ view }: ViewProps) => {
  return (
    <div className="seen-status">
      <div className="seenBy">
        <div className="handleSeen">
          <img className="seenProfile" src={view.photo} alt="profile" />
          <h1 className="seenName">{view.name}</h1>
          <small className="last-messageTime-seen">
            <Moment fromNow>{view.time.toDate()}</Moment>
          </small>
        </div>
      </div>
    </div>
  );
};
