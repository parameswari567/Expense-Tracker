import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import { GlobalContext } from "../context/GlobalState";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import ErrorNotice from "./ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { getTransactions } = useContext(GlobalContext);
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { email, password };
      const loginRes = await axios.post("/api/users/login", loginUser);

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/budget");
      getTransactions();
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <Form>
      <h3>Login</h3>
      {error && <ErrorNotice message={error} />}
      <br />
      <FormGroup className="login-register">
        <Label for="loginEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="loginEmail"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email.."
        />
      </FormGroup>
      <FormGroup className="login-register">
        <Label for="loginPassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="loginPassword"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password.."
        />
      </FormGroup>
      <Button onClick={submit} className="button">
        Submit
      </Button>
    </Form>
  );
}
