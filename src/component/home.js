import axios from "axios";
import M from "materialize-css";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/userContext";

const Home = () => {
  const { state, dispatch } = useContext(userContext);
  const [search, setSearch] = useState("");
  const [foundUser, setFoundUser] = useState([]);
  const [comment, setComment] = useState("");
  const css0 = { display: "none" };
  const css1 = { display: "block" };

  let user;
  state.user !== null
    ? (user = state.user)
    : (user = JSON.parse(localStorage.getItem("user")));

  // if (state.user !== null) {
  //   user = state.user;
  // } else if (localStorage.key("user") != "") {
  //   user = JSON.parse(localStorage.getItem("user"));
  // } else {
  //   user = state.users.forEach((user) => ({ _id: user._id }));
  // }

  const token = localStorage.getItem("jwt");
  useEffect(() => {
    getAllPosts();
    getAllUsers();
  }, []);

  const commentChange = (e) => {
    setComment(e.target.value);
  };

  const handleChange = async (query) => {
    setSearch(query);

    try {
      const { data } = await axios.post(
        "https://pacific-crag-92696.herokuapp.com/api/search",
        { search },
        {
          headers: {
            Authorization: token && token,
          },
        }
      );
      setFoundUser(data.searchedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    const { data } = await axios.get(
      "https://pacific-crag-92696.herokuapp.com/api/allUsers"
    );
    // console.log(data.allUser);
    dispatch({ type: "ALL_USERS", payload: data.allUser });
  };

  const getAllPosts = async () => {
    const { data } = await axios.get(
      "https://pacific-crag-92696.herokuapp.com/api/allposts"
    );
    // console.log(data.allPosts);
    dispatch({ type: "GET_ALL_POSTS", payload: data.allPosts });
  };

  const likePost = async (id) => {
    try {
      const { data } = await axios.put(
        `https://pacific-crag-92696.herokuapp.com/api/like`,
        { id: id },
        {
          headers: {
            Authorization: token && token,
          },
        }
      );
      console.log(data);
      const newOne = state.posts.map((post) => {
        if (post._id === data._id) {
          return data;
        } else {
          return post;
        }
      });
      console.log(newOne);
      dispatch({ type: "POST_LIKED", payload: newOne });
    } catch (error) {
      console.log(error);
    }
  };
  const unlikePost = async (id) => {
    try {
      const { data } = await axios.put(
        `https://pacific-crag-92696.herokuapp.com/api/unlike`,
        { id: id },
        {
          headers: {
            Authorization: token && token,
          },
        }
      );
      console.log(data);
      const newOne = state.posts.map((post) => {
        if (post._id === data._id) {
          return data;
        } else {
          return post;
        }
      });
      dispatch({ type: "POST_UNLIKED", payload: newOne });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    console.log(id);
    const { data } = await axios.put(
      "https://pacific-crag-92696.herokuapp.com/api/comment",
      { id: id, text: comment },
      {
        headers: {
          Authorization: token && token,
        },
      }
    );
    if (data.msg) {
      console.log(data.msg);
    } else {
      console.log(data.newComment);
      const newOne = state.posts.map((post) => {
        if (post._id === data.newComment._id) {
          return data.newComment;
        } else {
          return post;
        }
      });
      console.log(newOne);
      dispatch({ type: "COMMENT_POST", payload: newOne });
      setComment("");
    }
  };
  const deletePost = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://pacific-crag-92696.herokuapp.com/api/${id}/delete`,
        {
          headers: {
            Authorization: token && token,
          },
        }
      );
      console.log(data.success);
      dispatch({ type: "POST_DELETE", payload: id });
      M.toast({ html: data.success });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (postId, commentId) => {
    console.log(postId, commentId);
    console.log(token);
    try {
      const { data } = await axios.delete(
        `https://pacific-crag-92696.herokuapp.com/api/${postId}/${commentId}/deletecomment`,
        {
          headers: {
            Authorization: token && token,
          },
        }
      );
      console.log(data);
      M.toast({ html: data.success });
      dispatch({
        type: "DELETE_COMMENT",
        payload: { post: data.post, comment: commentId },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row" style={{ backgroundColor: "lightsalmon" }}>
      <div className="col s12 l9">
        {state.posts && user ? (
          state.posts.map((post, i) => (
            <div
              className="comtainer z-depth-4"
              style={{
                maxWidth: "800px",
                margin: "50px auto",
                backgroundColor: "#8d8ebc",
                padding: "10px",
              }}
              key={i}
            >
              <div style={{ backgroundColor: "whitesmoke" }} className="card">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "80px",
                      margin: "10px",
                    }}
                    src={post.postedBy.photo}
                  />
                  <Link
                    to={
                      user._id === post.postedBy._id
                        ? "/profile"
                        : `/profile/${post.postedBy._id}`
                    }
                  >
                    <strong
                      style={{ paddingLeft: "20px", color: "darkmagenta" }}
                      className="card-title"
                    >
                      {post.postedBy.username}
                    </strong>
                  </Link>
                </div>
                <div className="card-image">
                  <div className="parallax">
                    <img
                      style={{ paddingBottom: "10px" }}
                      src={post.photo}
                      width="650"
                      alt="no-image"
                    />
                  </div>
                </div>
                <div>
                  <i
                    style={{
                      paddingLeft: "20px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    className="material-icons"
                  >
                    favorite
                  </i>
                  {post.likes.includes(user._id) ? (
                    <i
                      onClick={() => unlikePost(post._id)}
                      style={{
                        paddingLeft: "20px",
                        cursor: "pointer",
                        color: "blueviolet",
                      }}
                      className="material-icons"
                    >
                      thumb_down
                    </i>
                  ) : (
                    <i
                      onClick={() => likePost(post._id)}
                      style={{
                        paddingLeft: "20px",
                        cursor: "pointer",
                        color: "blueviolet",
                      }}
                      className="material-icons"
                    >
                      thumb_up
                    </i>
                  )}
                  {post.postedBy._id === user._id && (
                    <i
                      onClick={() => deletePost(post._id)}
                      style={{
                        paddingRight: "20px",
                        cursor: "pointer",
                        float: "right",
                      }}
                      className="material-icons"
                    >
                      delete
                    </i>
                  )}
                </div>
                <div className="card-content">
                  {post.likes.length} likes
                  <h5>{post.body}</h5>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "center",
                    }}
                  >
                    <div>
                      {post.comments.map((comment) => (
                        <div
                          className="collection"
                          key={comment._id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor: "lightblue",
                          }}
                        >
                          <div
                            className="collection-item"
                            style={{ backgroundColor: "lightblue" }}
                          >
                            <strong>{comment.postedBy.username}</strong>
                            {"    "}:{"   "}
                            {comment.text}
                          </div>
                          {comment.postedBy._id === user._id && (
                            <i
                              style={{ marginLeft: "20px" }}
                              onClick={() =>
                                deleteComment(post._id, comment._id)
                              }
                              style={{
                                paddingRight: "20px",
                                paddingTop: "15px",
                                cursor: "pointer",
                                float: "right",
                                color: "coral",
                              }}
                              className="tiny material-icons"
                            >
                              delete
                            </i>
                          )}
                        </div>
                      ))}
                    </div>

                    <form
                      style={{ backgroundColor: "#8d8ebc", marginTop: "20px" }}
                      onSubmit={(e) => handleSubmit(e, post._id)}
                      className="input-field col s6"
                    >
                      <i
                        className="tiny material-icons prefix"
                        style={{ color: "white" }}
                      >
                        chat
                      </i>
                      <input
                        className="materialize-input"
                        name="comment"
                        onChange={commentChange}
                        value={comment}
                        required
                        placeholder="Comment here"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div
        className="col s12 l3"
        style={{
          // paddingRight: "30px",
          // paddingLeft: "30px",
          // paddingTop: "30px",
          padding: "30px",
          position: "fixed",
          right: 0,
          backgroundColor: "lightsalmon",
        }}
      >
        <nav style={{ backgroundColor: "darkcyan" }}>
          <div className="nav-wrapper">
            <div className="input-field">
              <input
                id="sch"
                type="search"
                required
                name="search"
                value={search}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="search user"
              />
              <label className="label-icon" htmlFor="sch">
                <i className="material-icons">search</i>
              </label>
              <i className="material-icons">close</i>
            </div>
          </div>
        </nav>

        <div className="collection" style={search === "" ? css0 : css1}>
          {user ? (
            foundUser.map((founduser) => (
              <Link
                to={
                  user._id === founduser._id
                    ? "/profile"
                    : `/profile/${founduser._id}`
                }
                className="collection-item"
              >
                {founduser.username}
              </Link>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
