import React from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends React.Component {

  state = {
    courses: [],
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { courses } = this.state;
    const value = {
      courses: courses,
      data: this.data,
      actions: {
        getCourses: this.getCourses,
      },
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }

  getCourses = async() => {
    const courses = await this.data.getCourses();
    if (courses !== null) {
      this.setState( ()=> {
        return {
          courses: courses,
        };
      });
    }
    return courses;
  }


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