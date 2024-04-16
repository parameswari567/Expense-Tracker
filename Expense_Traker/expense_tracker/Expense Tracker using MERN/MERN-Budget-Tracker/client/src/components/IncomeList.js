import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import IncomeTransaction from "./IncomeTransaction";

const IncomeList = () => {
  const { incomeTransactions } = useContext(GlobalContext);

  console.log(incomeTransactions);

  return (
    <div className="transactions transactions-income">
      <h2 className="transaction-history">Transaction History</h2>
      <ul className="transaction-list income">
        {incomeTransactions.map((incomeTransaction) => (
          <IncomeTransaction
            key={incomeTransaction._id}
            incomeTransaction={incomeTransaction}
          />
        ))}
      </ul>
    </div>
  );
};

export default IncomeList;
