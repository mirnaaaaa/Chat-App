import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Posts, PostsType } from "../Context/Posts";
import { PostType } from "../Context/Posts";
import Moment from "react-moment";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { User, UserType } from "../Context/User";
import { SeenStatus } from "./SeenStatus";
import { AiFillEye } from "react-icons/ai";

export const ShowStatus = () => {
  const [post, setPost] = useState<PostType>();
  const { posts } = useContext(Posts) as PostsType;
  const { docId, user } = useContext(User) as UserType;
  const [seen, setSeen] = useState<PostType[]>();

  const { Id } = useParams();

  useEffect(() => {
    const correct = posts?.find((x) => x.Id === Id);
    if (correct) {
      setPost(correct);
    }
  }, [Id, posts, docId]);

  useEffect(() => {
    const Seen = async () => {
      const id = post?.Id;
      const userUid = user.uid;
      const ID = id > userUid ? `${id + userUid}` : `${userUid + id}`;
      const get = await getDoc(doc(db, "seenPost", id, "seen", ID));
      if (get.exists()) return;
      if (post && post.uid !== user.uid) {
        await setDoc(doc(db, "seenPost", id, "seen", ID), {
          name: user.displayName,
          Id: post?.Id,
          uid: user.uid,
          photo: user.avatarPath,
          time: Timestamp.now(),
          ID
        });
      }
    };
    Seen();
  }, [post, seen, user.avatarPath, user.displayName, user.uid]);

  useEffect(() => {
    const id = post?.Id;
    const q = query(collection(db, `seenPost/${id}/seen`), orderBy("time"));
    const snap = onSnapshot(q, (snap) => {
      let array: any = [];
      snap.forEach((doc) => {
        array.push({ ...doc.data(), Id: doc.id });
      });
      setSeen(array);
    });
    return () => snap();
  }, [post?.Id]);

  return (
    <div className="addStatusDiv">
      {post && (
        <>
          <div>
            <div className="flex">
              <img className="profile" src={post.image} alt="Profile" />
              <div className="name-times">
                <div className="ifYou">
                  <p className="user-status">{post.name}</p>
                  {post.uid === user.uid && <h1 className="You">(You)</h1>}
                </div>
                <small className="time-status">
                  <Moment fromNow>{post.time.toDate()}</Moment>
                </small>
              </div>
            </div>
          </div>
          <div className="style-status">
            {post.text && <p>{post.text}</p>}
            {post.photo && (
              <img className="post-photo" src={post.photo} alt="Img" />
            )}
          </div>
          {seen?.length === 0 && post.uid === user.uid && (
            <h1 className="noViews">No views yet</h1>
          )}
          {post.uid === user.uid && (
            <div className="viewLength">
              <AiFillEye className="AiFillEye" />
              {seen?.length ? (
                <p className="numberViews">({seen.length})</p>
              ) : (
                <p className="numberViews">(0)</p>
              )}
            </div>
          )}
          {seen?.length !== 0 &&
            post.uid === user.uid &&
            seen?.map((view: PostType) => (
              <>
                <SeenStatus view={view} />
              </>
            ))}
        </>
      )}
    </div>
  );
};
