import React from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

import withContext from './Context';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
//const IndexWithContext = Context.withContext(Index);
const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);

export default ()=> (
  <Router>
      <div id="root">
        <HeaderWithContext />
        <Switch>
          <Route exact path="/courses" component={Courses} />
          <Route path="/course/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/courses/create" component={CreateCourse} />
          <Route path="/courses/update/:id" component={UpdateCourse} />
        </Switch>
      </div>
  </Router>

);


