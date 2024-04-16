import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  incomeTransactions: [],
  expenseTransactions: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = () => {
    const token = localStorage.getItem("auth-token");
    axios
      .get("/api/transactions", { headers: { "x-auth-token": token } })
      .then((res) => dispatch({ type: "GET_TRANSACTIONS", payload: res.data }))
      .catch((err) => console.log(err));
  };

  const addIncome = (incomeTransaction) => {
    dispatch({
      type: "ADD_INCOME",
      payload: incomeTransaction,
    });
  };

  const addExpense = (expenseTransaction) => {
    dispatch({
      type: "ADD_EXPENSE",
      payload: expenseTransaction,
    });
  };

  const deleteTransaction = (id) => {
    const token = localStorage.getItem("auth-token");
    axios
      .delete(`/api/transactions/${id}`, { headers: { "x-auth-token": token } })
      .then((res) => console.log(res.data))
      .then(() =>
        dispatch({
          type: "DELETE_TRANSACTION",
          payload: id,
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <GlobalContext.Provider
      value={{
        incomeTransactions: state.incomeTransactions,
        expenseTransactions: state.expenseTransactions,
        addIncome,
        addExpense,
        deleteTransaction,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
