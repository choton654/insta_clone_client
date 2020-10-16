import Axios from "axios";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../context/userContext";
import ProtectRoute from "./protectRoute";
import M from "materialize-css";
const Otherprofile = () => {
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    getPosts();
  }, []);
  let user;
  state.user !== null
    ? (user = state.user)
    : (user = JSON.parse(localStorage.getItem("user")));
  const { id } = useParams();
  // console.log(id);
  const token = localStorage.getItem("jwt");
  const getPosts = async (e) => {
    try {
      const { data } = await Axios.get(
        `https://pacific-crag-92696.herokuapp.com/api/${id}/otherprofile`,
        {
          headers: {
            Authorization: token && token,
          },
        }
      );
      console.log(data.userPosts);
      dispatch({ type: "OTHER_USER", payload: data.userPosts });
    } catch (error) {
      console.log(error);
    }
  };
  const followUser = async (id) => {
    try {
      const { data } = await Axios.put(
        "https://pacific-crag-92696.herokuapp.com/api/follow",
        { id },
        {
          headers: {
            Authorization: token && token,
          },
        }
      );
      console.log(data.otherUser);
      M.toast({ html: data.success });
      dispatch({
        type: "FOLLOW_USER",
        payload: { loggedUser: data.loggedUser, otherUser: data.otherUser },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const unfollowUser = async (id) => {
    try {
      const { data } = await Axios.put(
        "https://pacific-crag-92696.herokuapp.com/api/unfollow",
        { id },
        {
          headers: {
            Authorization: token && token,
          },
        }
      );
      console.log(data);
      M.toast({ html: data.success });
      dispatch({
        type: "UNFOLLOW_USER",
        payload: { loggedUser: data.loggedUser, otherUser: data.otherUser },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container z-depth-4" style={{ backgroundColor: "white" }}>
      {state.otherPost ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              alignItems: "center",
              margin: "40px",
              borderBottom: "2px solid grey",
            }}
          >
            <div>
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  border: "5px solid darkmagenta",
                  borderRadius: "80px",
                }}
                src={state.otherPost?.photo}
                alt="no image"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1>{state.otherPost.username}</h1>
              <h4>{state.otherPost.email}</h4>
              {state.otherPost.followers.includes(user._id) ? (
                <a
                  style={{ width: "50%" }}
                  className="waves-effect waves-light btn red"
                  onClick={() => unfollowUser(state.otherPost._id)}
                >
                  unfollow
                </a>
              ) : (
                <a
                  style={{ width: "50%" }}
                  className="waves-effect waves-light btn"
                  onClick={() => followUser(state.otherPost._id)}
                >
                  follow
                </a>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "108%",
                }}
              >
                <h6>{state.otherPost.allposts.length}posts </h6>
                <h6>{state.otherPost.followers.length}followers </h6>
                <h6>{state.otherPost.followings.length} followings </h6>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {state.otherPost.allposts.map((post) => (
              <div
                style={{
                  maxWidth: "450px",
                }}
                className="card"
              >
                <div className="card-image">
                  <img src={post.photo} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
};

export default ProtectRoute(Otherprofile);
