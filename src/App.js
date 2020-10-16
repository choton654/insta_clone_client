import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import CreatePost from "./component/createpost";
import Home from "./component/home";
import Login from "./component/login";
import Myfollowings from "./component/myfollowings";
import Navbar from "./component/navbar";
import Otherprofile from "./component/otherprofile";
import Profile from "./component/profile";
import Signup from "./component/signup";
function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/createpost" component={CreatePost} />
        <Route exact path="/myfollowings" component={Myfollowings} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/:id" component={Otherprofile} />
      </Switch>
    </div>
  );
}

export default App;
