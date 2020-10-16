import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/userContext";
import ProtectRoute from "./protectRoute";
import M from "materialize-css";

const Profile = () => {
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    getPosts();
    getUser();
    const elems = document.querySelectorAll(".parallax");
    M.Parallax.init(elems);
    const elems1 = document.querySelectorAll(".modal");
    M.Modal.init(elems1);
  }, []);
  let user;
  state.user !== null
    ? (user = state.user)
    : (user = JSON.parse(localStorage.getItem("user")));
  const token = localStorage.getItem("jwt");
  // const [image, setImage] = useState(null);
  // console.log(image);

  const picUpload = async (file) => {
    console.log(file);
    const pic = new FormData();
    pic.append("photo", file);
    try {
      const { data } = await axios.put(
        "https://pacific-crag-92696.herokuapp.com/api/updatepic",
        pic,
        {
          headers: {
            Authorization: token && token,
          },
        }
      );
      console.log(data.pic);
      dispatch({ type: "UPDATE_PIC", payload: data.pic });
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async (e) => {
    try {
      const { data } = await axios.get(
        "https://pacific-crag-92696.herokuapp.com/api/mypost",
        {
          headers: {
            Authorization: token && token,
          },
        }
      );
      // console.log(data);
      dispatch({ type: "MY_POSTS", payload: data.myPost });
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    const { data } = await axios.get(
      "https://pacific-crag-92696.herokuapp.com/api/currentuser",
      {
        headers: {
          Authorization: token && token,
        },
      }
    );
    // console.log(data.user);
    if (data.msg) {
      console.log(data.msg);
    } else {
      dispatch({ type: "ADD_USER", payload: data.user });
    }
  };

  return (
    <div className="container z-depth-4" style={{ backgroundColor: "white" }}>
      {user ? (
        <div key={user._id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              margin: "40px",
              flexWrap: "wrap",
              borderBottom: "2px solid grey",
              backgroundColor: "l",
            }}
          >
            <div>
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  border: "5px solid red",
                  borderRadius: "80px",
                }}
                src={user.photo}
                alt="no image"
              />
              <i
                style={{ cursor: "pointer" }}
                className="small material-icons modal-trigger"
                data-target="modal1"
              >
                add_a_photo
              </i>
            </div>
            <div>
              <h1>{user?.username}</h1>
              <h4>{user?.email}</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h6>{state.myPosts?.length}posts </h6>
                <h6>{user.followers?.length} followers</h6>
                <h6>{user.followings?.length} followings</h6>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            {state.myPosts?.map((post) => (
              <div
                key={post._id}
                style={{
                  maxWidth: "450px",
                }}
                className="card z-depth-3"
              >
                <div className="card-image">
                  <img src={post.photo} />
                  {/* <Link
                    to="/createpost"
                    className="btn-floating halfway-fab waves-effect waves-light red"
                  >
                    <i className="material-icons">add</i>
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <div>
        <div
          style={{ margin: "20px auto", maxWidth: "500px" }}
          id="modal1"
          className="modal"
        >
          <div className="modal-content">
            <i class="modal-close small material-icons">arrow_back</i>
            <div className="file-field input-field">
              <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                <input
                  type="file"
                  onChange={(e) => picUpload(e.target.files[0])}
                  name="photo"
                />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectRoute(Profile);
