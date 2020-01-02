import React from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends React.Component {

  state = {
    // get authenticated user from cookies, or null
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;

    // values for context
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        signUp: this.signUp,
        createCourse: this.createCourse,
        updateCourse: this.updateCourse,
        deleteCourse: this.deleteCourse,
      },
    }

    // pass values to context provider
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }

  signIn = async (username, password) => {
    // get user from database
    const user = await this.data.getUser(username, password);

    // store if user exists
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });

      //save user in cookie
      const cookieOptions = {
        expires: 1 // 1 day
      };

      // save unhashed password to state for future use
      user.password = password;
      Cookies.set('authenticatedUser', user, cookieOptions);
    }
    return user;
  }

  signOut = () => {
    // remove user from state and cookie
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }

  signUp = async (user) => {
    const response = await this.data.createUser(JSON.stringify(user));
    if (response.status === 201) {
      // sign in user after signup
      this.signIn(user.emailAddress, user.password);
    }
    else if (response.status === 400) {
      return response;
    }
  }

  createCourse = async (course) => {
    // get current user
    const user = this.state.authenticatedUser;
    // add userId to course
    course.userId = user.id;
    const response = await this.data.createCourse(JSON.stringify(course), user.emailAddress, user.password);
    return response;
  }

  updateCourse = async (id, course) => {
    const user = this.state.authenticatedUser;
    course.userId = user.id;
    const response = await this.data.updateCourse(id, JSON.stringify(course), user.emailAddress, user.password);
    return response;
  }

}

export const Consumer = Context.Consumer;

/**
 * From teamtreehouse.com curriculum file:
 * A higher-order component that wraps the provided component in a Context Consumer component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} temp={10} />}
      </Context.Consumer>
    );
  }
}