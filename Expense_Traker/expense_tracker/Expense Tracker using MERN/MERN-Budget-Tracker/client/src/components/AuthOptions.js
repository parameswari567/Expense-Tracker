import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { NavItem, NavLink, Nav } from "reactstrap";
import UserContext from "../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.removeItem("auth-token");
    window.location = "/";
  };

  return (
    <Nav>
      {userData.user ? (
        <>
          <NavItem className="auth-options">
            <NavLink className="auth-options navlink" onClick={logout}>
              Logout
            </NavLink>
          </NavItem>
        </>
      ) : (
        <>
          <NavItem className="auth-options">
            <NavLink className="auth-options navlink" onClick={login}>
              Login
            </NavLink>
          </NavItem>
          <NavItem className="auth-options">
            <NavLink className="auth-options navlink" onClick={register}>
              Register
            </NavLink>
          </NavItem>
        </>
      )}
    </Nav>
  );
}
