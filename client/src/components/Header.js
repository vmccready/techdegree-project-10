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
        <link rel="shortcut icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Cousine" rel="stylesheet" type="text/css" />
        {/* <link href="../styles/global.css" rel="stylesheet" /> */}
        <title>Courses</title>

        <div className="header">
          <div className="bounds">
            <Link to="/"><h1 className="header--logo">Courses</h1></Link>
            <nav>
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