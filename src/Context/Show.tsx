import React, { createContext, useState } from "react";

type ChildrenType = {
  children: React.ReactNode;
};

export type ShowType = {
    show: boolean;
    setShow:  React.Dispatch<React.SetStateAction<boolean>>;
};

export const Show = createContext<ShowType | null>(null);

export const ShowProvider = ({ children }: ChildrenType) => {
    const [show, setShow] = useState<boolean>(false);

  const value = {
    show,
    setShow
  };

  return (
    <Show.Provider value={value}>{children}</Show.Provider>
  );
};
