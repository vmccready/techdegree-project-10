import React from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends React.Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    deleting: false,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser, deleting } = this.state;
    const value = {
      authenticatedUser,
      deleting,
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

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }

  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      const cookieOptions = {
        expires: 1 // 1 day
      };
      // save unhashed password to state
      user.password = password;
      Cookies.set('authenticatedUser', user, cookieOptions);
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }

  signUp = async (user) => {
    const response = await this.data.createUser(JSON.stringify(user));
    if (response.status === 201) {
      this.signIn(user.emailAddress, user.password);
    }
    else if (response.status === 400) {
      return response;
    }
    // if (response !== null) {
    //   this.setState(() => {
    //     return {
    //       authenticatedUser: JSON.parse(response),
    //     };
    //   });
    //   const cookieOptions = {
    //     expires: 1 // 1 day
    //   };
    //   Cookies.set('authenticatedUser', JSON.parse(response), cookieOptions);
    // }
    // return response;
  }

  createCourse = async (course) => {
    const user = this.state.authenticatedUser;
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

  // deleteCourse = async (id) => {
  //   this.setState(() => { return { deleting: true } });
  //   const { emailAddress, password } = this.state.authenticatedUser;
  //   const response = await this.data.deleteCourse(id, emailAddress, password);

  //   this.setState(() => { return { deleting: false} });
  // }


}

export const Consumer = Context.Consumer;

/**
 * From teamtreehouse.com curriculum file:
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
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