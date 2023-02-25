import React, { useContext } from "react";
import { User, UserType } from "../Context/User";
import { EachUser } from "./EachUser";
import { AllUsers, AllUsersType } from "../Context/AllUsers";

export default function Users() {
  const { docId } = useContext(User) as UserType;
  const { users } = useContext(AllUsers) as AllUsersType;

  return (
    <div className="allRegistered">
      <div className="push-search">
        <h1 className="friends">All users</h1>
        {!docId ? (
          <h1>Login first</h1>
        ) : (
          <div className="allUsers">
            {users.map((eachUser) => (
              <div key={eachUser.uid}>
                <EachUser eachUser={eachUser} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
