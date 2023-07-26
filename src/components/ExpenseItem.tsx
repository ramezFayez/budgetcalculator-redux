import React from "react";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { useAppDispatch } from "../store/hooks";

import ExpenseList from "./ExpenseList";
import { Expense, deleteExpense } from "../store/expenseSlice";

const ExpenseItem = ({ expense }: { expense: Expense }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id, charge, amount } = expense;
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">${amount}</span>
      </div>
      <div>
        <button
          className="edit-btn"
          aria-label="edit-button"
          onClick={() => {}}
        >
          <AiFillEdit />
        </button>
        <button
          className="clear-btn"
          aria-label="delete-button"
          onClick={() => {
            dispatch(deleteExpense(expense.id));
          }}
        >
          <AiTwotoneDelete />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
