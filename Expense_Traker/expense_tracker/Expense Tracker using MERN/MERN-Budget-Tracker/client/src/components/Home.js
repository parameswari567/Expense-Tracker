import React, { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="home">
      {userData.user ? (
        <>
          <h1>Welcome to Budget Tracker, {userData.user.name}!</h1>
          <br />
          <h3>You are currently logged in.</h3>
          <br />
          <a href="/budget">Click Here to View Budget</a>
        </>
      ) : (
        <>
          <h1>Welcome to Budget Tracker!</h1>
          <br />
          <h3>Please register a new user or login to create a budget.</h3>
        </>
      )}
    </div>
  );
}
