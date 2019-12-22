import React from 'react';

// TO DO:
// make <title> variable


export default class Header extends React.PureComponent {
  render() {
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
            <h1 className="header--logo">Courses</h1>
            <nav><span>Welcome Joe Smith!</span><a className="signout" href="index.html">Sign Out</a></nav>
          </div>
        </div>
        <hr />
        {/* <div className="header">
          <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="sign-in.html">Sign In</a></nav>
          </div>
        </div>
        <hr /> */}
      </div>
      
    );
  }
}