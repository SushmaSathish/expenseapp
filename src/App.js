import React from 'react';
import SignUp from './components/UI/SignUp';
import SignIn from './components/UI/SignIn';
import Welcome from './components/UI/Welcome';
import ForgotPassword from './components/Pages/ForgotPassword';
import  { Redirect,Route } from 'react-router-dom';
import IncompleteProfile from './components/Pages/Incomplete';
import Expenses from './components/Expense/Expenses';
import Header from './components/Header/Header';
import { useSelector } from 'react-redux';
import classes from "./App.module.css";
import Home from './components/Header/Home';
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = useSelector((state) => state.theme.theme);
  console.log(theme);
  let themeValue;
  if (theme) {
    themeValue = classes.AppDark;
  } else {
    themeValue = classes.AppLight;
  }

  return (
    <div className={themeValue} >
      <Header/>
      {isLoggedIn && (
        <Route path="*">
          <Redirect to="/expenses" />
        </Route>
      )}
      {!isLoggedIn && (
        <Route path="*">
          <Redirect to="/" />
        </Route>
      )}
      <Route path="/signUp">
        <SignUp />
      </Route>
      <Route path="/signIn">
        <SignIn />
      </Route>
      <Route path="/incompleteProfile">
        <IncompleteProfile />
      </Route>
      <Route path="/forgotPassword">
        <ForgotPassword />
      </Route>
      <Route path="/expenses">
        {isLoggedIn ? <Expenses /> : <Redirect to="/signIn" />}
      </Route>
      <Route path="/welcome">
        {isLoggedIn ? <Welcome /> : <Redirect to="/signIn" />}
      </Route>
      <Route path="/" exact>
        <Home/>
      </Route>

    </div>
  );
}
export default App;
