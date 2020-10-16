import axios from "axios";
import M from "materialize-css";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../context/userContext";

const Signup = () => {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState({});
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    dispatch({ type: "CLEAR_ERROR" });
  };
  const data = new FormData();
  data.append("photo", image);
  data.append("username", user.username);
  data.append("email", user.email);
  data.append("password", user.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://pacific-crag-92696.herokuapp.com/api/signup",
        data
      );
      // console.log(res.data);
      // console.log(res.data.success);
      if (res.data.msg) {
        dispatch({ type: "SIGNUP_ERROR", payload: res.data.msg });
      } else {
        M.toast({ html: res.data.success });
        history.push("/login");
        setUser({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      // console.log(error.response?.data.msg);
      const msg = error.response?.data.msg;
      dispatch({ type: "SIGNUP_ERROR", payload: msg });
    }
  };

  return (
    <div className="card white darken-1 auth-card z-depth-4">
      <div className="card-content black-text">
        <span style={{ textAlign: "center" }} className="card-title">
          Signup Here
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
        <label htmlFor="username-input">Username</label>
        <input
          onChange={handleChange}
          name="username"
          value={user.username}
          type="text"
          id="username-input"
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
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1">
            <span>Uplaod Image</span>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              name="photo"
              required
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              defaultValue={image?.name || ""}
              required
            />
          </div>
        </div>
        <br />
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
        <p />
        <button
          style={{ margin: "20px auto", width: "100%" }}
          onClick={handleSubmit}
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Sign Up
        </button>
        <h5>
          <Link to="/login">Already have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
