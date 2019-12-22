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
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
//const IndexWithContext = Context.withContext(Index);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);

export default ()=> (
  <Router>
      <div id="root">
        <Header />
        <Switch>
          <Route exact path="/courses" component={Courses} />
          <Route path="/course/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/courses/create" component={CreateCourse} />
          <Route path="/courses/update/:id" component={UpdateCourse} />
        </Switch>
      </div>
  </Router>

);


