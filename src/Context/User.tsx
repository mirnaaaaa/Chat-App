import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

type ChildrenType = {
  children: React.ReactNode;
};
export type userType = {
  isLoading: boolean;
  docId: any;
};
export const User = createContext<userType | null>(null);

export const UserProvider = ({ children }: ChildrenType) => {
  const [docId, setDocId] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const Auth = onAuthStateChanged(auth, (user) => {
      setDocId(user?.uid);
      setIsLoading(false);
    });
    return () => {
      Auth();
    };
  }, []);

  const value = {
    isLoading,
    docId
  };

  return <User.Provider value={value}>{children}</User.Provider>;
};
