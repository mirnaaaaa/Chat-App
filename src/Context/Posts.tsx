/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState } from "react";

interface ChildrenType {
  children: React.ReactNode;
}

export interface PostType {
  text?: number | string;
  photo: any;
  image?: string;
  name: number | string;
  time: string | number | any;
  Id:any;
  uid: number | string;
  ID?: number | string;
}

export interface PostsType {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
}
export const Posts = createContext<PostsType | null>(null);

export const PostsProvider = ({ children }: ChildrenType) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const value = {
    posts,
    setPosts
  };

  return <Posts.Provider value={value}>{children}</Posts.Provider>;
};
