import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Balance = () => {
  const { incomeTransactions, expenseTransactions } = useContext(GlobalContext);

  const incomeAmount = incomeTransactions.map(
    (incomeTransaction) => incomeTransaction.incomeAmount
  );

  const expenseAmount = expenseTransactions.map(
    (expenseTransaction) => expenseTransaction.expenseAmount
  );

  const totalIncome = incomeAmount
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const totalExpense = expenseAmount
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const balance = totalIncome - totalExpense;

  const numberWithCommas = (e) => {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="balance">
      <h2>Your Balance</h2>
      <h3>${numberWithCommas(balance)}</h3>
      <div className="income-expense">
        <div className="plus">
          <h3>Income</h3>
          <p>+${numberWithCommas(totalIncome)}</p>
        </div>
        <div className="minus">
          <h3>Expenses</h3>
          <p>-${numberWithCommas(totalExpense)}</p>
        </div>
      </div>
    </div>
  );
};

export default Balance;
