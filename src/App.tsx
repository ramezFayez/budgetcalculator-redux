import "./index.css";
import React, { useState, useEffect } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "react-uuid";
import { AiFillDelete } from "react-icons/ai";
import Report from "./components/report";
import {
  Expense,
  selectExpenses,
  editExpense,
  addExpense,
  clearExpenses,
  deleteExpense,
} from "./store/expenseSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { store } from "./store/store";

/*
useEffect let's perform side effects
runs after every render
first parameter - callback function (runs after render )
second parameter - array - for leeting react know when to run useEffect 
react re-renders when state has changed or props
*/

const initialExpenses: Expense[] = [];

/*const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 },
];*/

function App() {
  // ************** state values ****************
  // all expenses , expense
  const expenses = useAppSelector(selectExpenses);
  const dispatch = useAppDispatch();

  //const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");
  // alert
  type AlerState =
    | {
        show: true;
        type: string;
        text: string;
      }
    | { show: false };

  const [alert, setAlert] = useState<AlerState>({ show: false });
  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState<string>();
  const [showReport, setShowReport] = useState(false);
  // ************** useEffect ****************

  // ************** functionality ****************
  // handle charge
  const handleCharge = (e: any) => {
    setCharge(e.target.value);
  };
  // handle amount
  const handleAmount = (e: any) => {
    setAmount(e.target.value);
  };
  // handle alert
  const handleAlert = ({ type, text }: { type: string; text: string }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  // handle submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (charge !== "" && parseInt(amount) > 0) {
      if (edit) {
        let editedItem = { id, charge, amount };
        dispatch(editExpense(editedItem as Expense));
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        dispatch(addExpense(singleExpense));
        handleAlert({ type: "success", text: "item added successfully" });
      }
      setCharge("");
      setAmount("");
    } else {
      // handle alert called
      handleAlert({ type: "danger", text: `charge & amount can't be empty` });
    }
  };
  // clear all items
  const clearItems = () => {
    dispatch(clearExpenses());
    handleAlert({ type: "danger", text: "all items deleted" });
  };
  // handle delete
  const handleDelete = (id: string) => {
    dispatch(deleteExpense(id));
    handleAlert({ type: "danger", text: "item deleted" });
  };
  // handle edit
  const handleEdit = (id: string) => {
    let expense = expenses.find((item) => item.id === id);
    if (expense !== undefined) {
      let { charge, amount } = expense;
      setCharge(charge);
      setAmount(amount);
      setEdit(true);
      setId(id);
    }
  };
  return (
    <>
      {showReport === false ? (
        <>
          <button
            className="btn"
            onClick={() => {
              setShowReport(true);
            }}
          >
            Report
          </button>

          <div>
            {alert.show && <Alert type={alert.type} text={alert.text} />}
            <Alert type={""} text={""} />
            <h1>Budget Calculator</h1>
            <main className="App">
              <ExpenseForm
                charge={charge}
                amount={amount}
                handleCharge={handleCharge}
                handleAmount={handleAmount}
                handleSubmit={handleSubmit}
                edit={edit}
              />
              <ExpenseList />
            </main>
            <h1>
              Total Spending :{" "}
              <span className="total">
                ${" "}
                {expenses.reduce((acc: number, curr: any) => {
                  return (acc += parseInt(curr.amount));
                }, 0)}
              </span>{" "}
            </h1>
            <br />
          </div>
        </>
      ) : (
        <>
          <button
            className="btn"
            onClick={() => {
              setShowReport(false);
            }}
          >
            Back to B.D Calculator
          </button>

          <Report />
        </>
      )}
    </>
  );
}

export default App;
