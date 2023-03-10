import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User, UserType } from "../Context/User";
import { useEffect } from "react";
import { BsWhatsapp } from "react-icons/bs";

export const Welcome = () => {
  const { docId } = useContext(User) as UserType;

  let navigate = useNavigate();

  useEffect(() => {
    if (!docId) {
      navigate("/Login");
    }
  }, [docId, navigate]);

  return (
    <div className="background">
      <h1>Send and receive messages without keeping your phone online.</h1>
      <BsWhatsapp className="whatsapp" />
    </div>
  );
};
