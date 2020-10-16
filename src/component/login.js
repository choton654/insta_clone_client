import axios from "axios";
import M from "materialize-css";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../context/userContext";

const Login = () => {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    dispatch({ type: "CLEAR_ERROR" });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://pacific-crag-92696.herokuapp.com/api/login",
        user
      );
      console.log(data);
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({
        type: "LOGIN_USER",
        payload: { token: data.token },
      });
      M.toast({ html: data.success });
      history.push("/profile");
    } catch (error) {
      console.log(error.response.data.msg);
      const msg = error.response?.data.msg;
      dispatch({ type: "LOGIN_ERROR", payload: msg });
    }
  };

  return (
    <div className="card white darken-1 auth-card z-depth-4">
      <div className="card-content black-text">
        <span style={{ textAlign: "center" }} className="card-title">
          Login Here
        </span>
        <br />
        <label htmlFor="email-input">Email</label>
        <input
          onChange={handleChange}
          name="email"
          value={user.email}
          type="email"
          id="email-input"
          className="autocomplete"
          required
        />
        <label htmlFor="password-input">Password</label>
        <input
          onChange={handleChange}
          name="password"
          value={user.password}
          type="password"
          id="password-input"
          className="autocomplete"
          required
        />
        <br />
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
        <p />
        <button
          style={{ margin: "20px auto", width: "100%" }}
          onClick={handleClick}
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Login
        </button>
        <h5>
          <Link to="/signup">Don't have an account?'</Link>
        </h5>
      </div>
    </div>
  );
};

export default Login;
