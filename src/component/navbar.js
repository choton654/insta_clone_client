import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import M from "materialize-css";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../context/userContext";
const Navbar = () => {
  const history = useHistory();
  const ulInput = useRef(null);
  useEffect(() => {
    // console.log(ulInput.current);
    M.Sidenav.init(ulInput.current);
  }, []);

  const { state, dispatch } = useContext(userContext);
  // const user = JSON.parse(localStorage.getItem("user")) || "";
  const token = localStorage.getItem("jwt");
  const handleClick = async () => {
    try {
      const res = await axios.post(
        "https://pacific-crag-92696.herokuapp.com/api/logout"
      );
      console.log(res.data);
      localStorage.removeItem("jwt");
      dispatch({ type: "LOGOUT_USER" });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="navbar-fixed">
        <nav style={{ backgroundColor: "darkslateblue" }}>
          <div className="nav-wrapper">
            <Link style={{ marginLeft: "20px" }} to="/" className="brand-logo">
              Instagram
            </Link>
            <a href="#" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            {token ? (
              <ul id="mobile-nav" className="right hide-on-med-and-down">
                <li>
                  <Link to="/createpost">Createpost</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/myfollowings">Posts of my followings</Link>
                </li>
                <button
                  style={{ marginRight: "20px" }}
                  className="waves-effect waves-light btn-small"
                  onClick={handleClick}
                  to="/logout"
                >
                  Log Out
                </button>
              </ul>
            ) : (
              <ul id="mobile-nav" className="right hide-on-med-and-down">
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
      <div>
        {token ? (
          <ul
            ref={ulInput}
            id="slide-out"
            className="sidenav"
            style={{ padding: "10px" }}
          >
            <li>
              <Link to="/createpost">Createpost</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/myfollowings">My followings' profile</Link>
            </li>
            <button
              style={{ marginLeft: "30px" }}
              className="waves-effect waves-light btn-small"
              onClick={handleClick}
              to="/logout"
            >
              Log Out
            </button>
          </ul>
        ) : (
          <ul
            ref={ulInput}
            id="slide-out"
            className="sidenav"
            style={{ padding: "10px" }}
          >
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
