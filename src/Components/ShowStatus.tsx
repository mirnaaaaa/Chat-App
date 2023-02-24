import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Posts, PostsType } from "../Context/Posts";
import { PostType } from "../Context/Posts";
import Moment from "react-moment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { User, UserType } from "../Context/User";

export const ShowStatus = () => {
  const [post, setPost] = useState<PostType>();
  const { posts } = useContext(Posts) as PostsType;
  const { docId, user } = useContext(User) as UserType;

  const { Id } = useParams();

  useEffect(() => {
    const correct = posts.find((x) => x.Id === Id);
    if (correct) {
      setPost(correct);
    }
  }, [Id, posts, docId]);

  useEffect(() => {
    const seen = async () => {
      const id = post?.Id;
      if (post && post.name !== user.displayName) {
        updateDoc(doc(db, "Posts", id), {
          Seen: true
        });
      }
    };
    seen();
  }, [post, Id]);

  return (
    <div className="addStatus-div">
      {post && (
        <>
          <div>
            <div className="flex">
              <img className="profile" src={post.image} alt="Profile" />
              <div className="name-time">
                <p className="user-status">{post.name}</p>
                <small className="time-status">
                  <Moment fromNow>{post.time.toDate()}</Moment>
                </small>
              </div>
            </div>
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
