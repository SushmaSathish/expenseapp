import React from 'react';
import SignUp from './compounds/UI/SignUp';
import SignIn from './compounds/UI/SignIn';
import Welcome from './compounds/UI/Welcome';
import ForgotPassword from './compounds/Pages/ForgotPassword';
import  { Redirect,Route } from 'react-router-dom';
import IncompleteProfile from './compounds/Pages/Incomplete';
import Expenses from './compounds/Expence/Expenses';
import Header from './compounds/Header/Header';
import { useSelector } from 'react-redux';
import classes from "./App.module.css";
import Home from './compounds/Header/Home';
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
