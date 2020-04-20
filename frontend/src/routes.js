import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Logon from "./pages/Logon";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/Profile/edit";
import InterestList from "./pages/InterestList/index";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Logon} />
        <Route path="/" exact component={Profile} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile/edit" exact component={ProfileEdit} />
        <Route path="/interest-list" exact component={InterestList} />
      </Switch>
    </BrowserRouter>
  );
}
