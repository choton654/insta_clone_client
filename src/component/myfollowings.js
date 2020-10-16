import axios from "axios";
import M from "materialize-css";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/userContext";
import ProtectRoute from "./protectRoute";

const Myfollowings = () => {
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    getPosts();
  }, []);
  let user;
  state.user !== null
    ? (user = state.user)
    : (user = JSON.parse(localStorage.getItem("user")));
  const getPosts = async (e) => {
    const token = localStorage.getItem("jwt");
    try {
      const { data } = await axios.get(
        "https://pacific-crag-92696.herokuapp.com/api/myfollowings",
        {
          headers: {
            Authorization: token && token,
          },
        }
      );
      console.log(data.subsUserPost);
      dispatch({ type: "ADD_SUBSCRIBERS", payload: data.subsUserPost });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      {state.subsUser ? (
        <div>
          <div
            className="row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {state.subsUser.map((post) => (
              <div
                className="card z-depth-4"
                style={{ width: "350px", backgroundColor: "lightpink" }}
              >
                <div className="card-image waves-effect waves-block waves-light">
                  <img
                    className="activator"
                    src={post.photo}
                    style={{ height: "250px", width: "350px" }}
                  />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                    {post.title}
                    <i className="material-icons right">expand_more</i>
                  </span>
                  <span class="new badge">{post.likes.length}</span>
                  <strong>
                    Posted By :<span>{post.postedBy.username}</span>
                  </strong>
                </div>
                <div
                  className="card-reveal"
                  style={{ backgroundColor: "lightgoldenrodyellow" }}
                >
                  <span className="card-title grey-text text-darken-4">
                    About the post<i className="material-icons right">close</i>
                  </span>
                  <p>{post.body}</p>
                  <h6>
                    <strong>Comments :</strong>
                  </h6>
                  {post.comments.map((comment) => (
                    <p>{comment.text}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ProtectRoute(Myfollowings);
