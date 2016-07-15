import UserApp from '../user/UserApp.jsx';
import NotFound from './NotFound.jsx';
import Skel from './Skel.jsx';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={UserApp}>
        <Route>
          <Route path="member/:memberId" component={Skel} />
        </Route>
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  , document.getElementById('app'));
});
