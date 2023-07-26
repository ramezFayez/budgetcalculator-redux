import React from "react";
import { icons } from "react-icons";
import Item from "./ExpenseItem";
import { AiFillDelete } from "react-icons/ai";
import {
  Expense,
  selectExpenses,
  editExpense,
  addExpense,
  clearExpenses,
  deleteExpense,
} from "../store/expenseSlice";
import { store } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type Props = {
  expenses: Expense[];
  clearItems: (...args: any[]) => any;
  handleDelete: (...args: any[]) => any;
  handleEdit: (...args: any[]) => any;
};
const ExpenseList = (): JSX.Element => {
  const expenses = useAppSelector(selectExpenses);
  const dispatch = useAppDispatch();
  return (
    <>
      <ul className="list">
        {expenses.map((expense): JSX.Element => {
          return <Item key={expense.id} expense={expense} />;
        })}
      </ul>
      {expenses.length > 0 && (
        <button
          className="btn"
          onClick={() => {
            dispatch(clearExpenses());
          }}
        >
          Clear Expenses
          <AiFillDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
