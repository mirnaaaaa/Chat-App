import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Posts, PostsType } from "../Context/Posts";
import { PostType } from "./../Context/Posts";
import Moment from "react-moment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const ShowStatus = () => {
  const [post, setPost] = useState<PostType>();
  const { posts } = useContext(Posts) as PostsType;

  const { Id } = useParams();

  useEffect(() => {
    const correct = posts.find((x) => x.Id === Id);
    if (correct) {
      setPost(correct);
    }
  }, [Id, posts]);

  useEffect(() => {
    const seen = async () => {
      const id = post?.Id;
      if (post) {
         updateDoc(doc(db, "Posts", id), {
          Seen: true
        });
      }
    };
    seen();
  }, [post, post?.Id]);

  return (
    <div className="addStatus-div">
      {post && (
        <>
          <div>
            <div className="flex">
              <img className="profile" src={post.image} alt="Profile" />
              <p className="user-status">{post.name}</p>
            </div>
            <small className="time-status">
              <Moment fromNow>{post.time}</Moment>
            </small>
          </div>
          <div className="style-status">
            {post.text && <p>{post.text}</p>}
            {post.photo && <img src={post.photo} alt="Img" />}
          </div>
        </>
      )}
    </div>
  );
};
