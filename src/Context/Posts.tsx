/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from "react";

interface ChildrenType {
  children: React.ReactNode;
}

export interface PostType {
  text?: number | string;
  photo: any;
  image?: string;
  name: number | string;
  time: any;
  Id:any;
  Seen: boolean;
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
