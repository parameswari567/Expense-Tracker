import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import AppNavBar from "./components/AppNavBar";
import Balance from "./components/Balance";
import AddTransaction from "./components/AddTransaction";
import IncomeList from "./components/IncomeList";
import ExpenseList from "./components/ExpenseList";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { GlobalContextProvider } from "./context/GlobalState";
import UserContext from "./context/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("api/users/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes.data) {
        const userRes = await axios.get("/api/users", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <GlobalContextProvider>
        <UserContext.Provider value={{ userData, setUserData }}>
          <div className="app">
            <AppNavBar />
            <div className="app-wrapper">
              <Route exact path="/" component={Home} />
              <Route path="/budget" component={Balance} />
              <Route path="/budget" component={AddTransaction} />
              <Route path="/budget" component={IncomeList} />
              <Route path="/budget" component={ExpenseList} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </div>
          </div>
        </UserContext.Provider>
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
