import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { UsersType } from "../Type/UserType";

interface ChildrenType  {
  children: React.ReactNode;
};
export interface AllUsersType  {
  users: UsersType[] ;
  setUsers:React.Dispatch<React.SetStateAction<UsersType[]>>;
};
export const AllUsers = createContext<AllUsersType | null>(null);

export const AllUsersProvider = ({ children }: ChildrenType) => {
  const [users, setUsers] = useState<UsersType[]>([]);

 const value = {
    users,
    setUsers
  };

  return <AllUsers.Provider value={value}>{children}</AllUsers.Provider>;
};
