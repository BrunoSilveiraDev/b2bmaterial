import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login"  component={Logon} />
        <Route path="/" exact component={Profile}/>
        <Route path="/signup" component={SignUp}/>

      </Switch>
    </BrowserRouter>
  );
}
