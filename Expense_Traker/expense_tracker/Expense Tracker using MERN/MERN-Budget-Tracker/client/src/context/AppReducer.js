export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        incomeTransactions: action.payload.filter(
          (incomeTransaction) => incomeTransaction.incomeText
        ),
        expenseTransactions: action.payload.filter(
          (expenseTransaction) => expenseTransaction.expenseText
        ),
      };
    case "ADD_INCOME":
      return {
        ...state,
        incomeTransactions: [action.payload, ...state.incomeTransactions],
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        expenseTransactions: [action.payload, ...state.expenseTransactions],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        incomeTransactions: state.incomeTransactions.filter(
          (incomeTransaction) => incomeTransaction._id !== action.payload
        ),
        expenseTransactions: state.expenseTransactions.filter(
          (expenseTransaction) => expenseTransaction._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
