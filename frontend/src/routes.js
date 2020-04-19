import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Logon from "./pages/Logon";
import SignUp from "./pages/SignUp";
import Logon from "./pages/Logon";
import ProfileEdit from "./pages/Profile/edit";
import PrivateRoute from "./components/PrivateRoute";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Logon} />
        <Route path="/" exact component={Profile} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/profile/edit" exact component={ProfileEdit} />
      </Switch>
    </BrowserRouter>
  );
}
