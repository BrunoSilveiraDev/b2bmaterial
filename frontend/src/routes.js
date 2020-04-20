import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Logon from "./pages/Logon";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/Profile/edit";
import InterestList from "./pages/InterestList/index";
import PrivateRoute from "./components/PrivateRoute";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Logon} />
        <Route path="/" exact component={Profile} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/profile/edit" exact component={ProfileEdit} />
        <PrivateRoute path="/interest-list" exact component={InterestList} />
      </Switch>
    </BrowserRouter>
  );
}
