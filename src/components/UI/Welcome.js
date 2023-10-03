import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Welcome = () => {

  const idToken = useSelector((state) => state.auth.idToken);
  const verifyEmailHandler = async () => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDdzK1m-uCUib1L4CoNCJk4F7R1CH_lHrw",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          requestType: "VERIFY_EMAIL",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data.email);
    } else {
      alert(data.error.message);
    }
  };
  return (
    <div>
      <h2>Welcome To Expense Tracker</h2>
      <p>
        Your Profile is incomplete.
        <Link to="/incompleteProfile"> Complete Profile</Link>
      </p>
      <button onClick={verifyEmailHandler}>Verify Email</button>
    </div>
  );
};

export default Welcome;