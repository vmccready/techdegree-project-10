import React from 'react';
import { Link } from 'react-router-dom';

// TO DO:
// make <title> variable

export default class Header extends React.PureComponent {
  render() {
    const {context} = this.props;
    const authUser = context.authenticatedUser;
    return (
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Courses</title>

        <div className="header">
          <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <nav>
              {/* Load greeting if user is signed in, or links if not */}
              {authUser ? (
                <React.Fragment>
                  <span>Welcome, {`${authUser.firstName} ${authUser.lastName}`}!</span>
                  <Link to="/signout">Sign Out</Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link className="signup" to="/signup">Sign Up</Link>
                  <Link className="signin" to="/signin">Sign In</Link>
                </React.Fragment>
              )}
            </nav>
          </div>
        </div>
        <hr />
      </div>
      
    );
  }
}