import React, { useEffect, useState } from "react";
import EditForm from "./EditForm";
import ExpenseItem from "./ExpenseItem";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Expenses.module.css";
// import "react-calendar/dist/Calendar.css";
// import ShowExpenses from "./ShowExpenses";
import {
  deleteExpenseFetching,
  getExpenseFetching} from "../../store/ActionCreators/ExpenseActionCreators"
import ExpencesForm from "./ExpencesFrom";


const Expenses = (props) => {
  const [editFormState, setEditFormState] = useState(false);
  const [addFormState, setAddFormState] = useState(false);
  const [editExpense, setEditExpense] = useState("");

  const emailId = useSelector((state) => state.auth.email);
  const regex = /[.@]/g;
  const email = emailId.replace(regex, "");

  const dispatch = useDispatch();

  const editExpenseHandler = (id, money, description, category) => {
    setEditFormState(true);
    const expense = {
      id: id,
      money: money,
      description: description,
      category: category,
    };
    setEditExpense(expense);
  };

  const addExpenseHandler = () => {
    setAddFormState(true);
  };

  const deleteExpenseHandler = (id) => {
    dispatch(deleteExpenseFetching(id, email));
  };

  const onCloseEditStateHandler = () => {
    setEditFormState(false);
  };

  const onCloseAddStateHandler = () => {
    setAddFormState(false);
  };

  useEffect(() => {
    dispatch(getExpenseFetching(email));
  }, [dispatch, email]);

  return (
    <div className={classes.Expenses}>
      <h2>Expenses Items</h2>
      <button onClick={addExpenseHandler} className={classes.AddButton}>
        Add Expense
      </button>
      <div>
        <ExpenseItem
          editExpense={editExpenseHandler}
          deleteExpenseHandler={deleteExpenseHandler}
        />
      </div>
      {/* <button onClick={addExpenseHandler} className={classes.AddButton}>
        +
      </button> */}
      {addFormState && (
        <ExpencesForm
          onClose={onCloseAddStateHandler}
          email={email}
        ></ExpencesForm>
      )}

      {editFormState && (
        <EditForm
          onClose={onCloseEditStateHandler}
          editExpense={editExpense}
          email={email}
        />
      )}
    </div>
  );
};
export default Expenses;