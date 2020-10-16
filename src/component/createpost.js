import axios from "axios";
import M from "materialize-css";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { userContext } from "../context/userContext";
import ProtectRoute from "./protectRoute";

const CreatePost = () => {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState({});
  const data = new FormData();
  data.append("photo", image);
  data.append("title", title);
  data.append("body", body);

  const picUpload = () => {
    const token = localStorage.getItem("jwt");
    axios
      .post("https://pacific-crag-92696.herokuapp.com/api/createpost", data, {
        headers: {
          Authorization: token && token,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "POST_CREATED", payload: res.data.newPost });
        M.toast({ html: "New post has created" });
        history.push("/");
      })
      .catch((err) => {
        if (!err.response.data.msg) {
          console.log(err.response.data);
          err.response.data.title
            ? dispatch({
                type: "POST_CREATION_ERROR",
                payload: err.response.data.title,
              })
            : dispatch({
                type: "POST_CREATION_ERROR",
                payload: err.response.data.body,
              });
        } else {
          console.log(err.response.data.msg);
          dispatch({
            type: "PHOTO_UPLOAD_ERROR",
            payload: err.response.data.msg,
          });
        }
      });
  };

  return (
    <div className="card white darken-1 auth-card z-depth-4">
      <div className="card-content black-text">
        <span style={{ textAlign: "center" }} className="card-title">
          Create new post
        </span>
        <br />
        <label htmlFor="title-input">Post Title</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title || ""}
          type="text"
          id="title-input"
          className="autocomplete"
        />
        <label htmlFor="body-input">Post description</label>
        <input
          onChange={(e) => setBody(e.target.value)}
          name="body"
          value={body || ""}
          type="text"
          id="body-input"
          className="autocomplete"
        />

        <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1">
            <span>Uplaod Image</span>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              name="photo"
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              defaultValue={image?.name || ""}
            />
          </div>
        </div>

        <br />
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
        <p></p>
        <button
          style={{ margin: "20px auto", width: "100%" }}
          onClick={() => picUpload()}
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Upload POst
        </button>
      </div>
    </div>
  );
};

export default ProtectRoute(CreatePost);
