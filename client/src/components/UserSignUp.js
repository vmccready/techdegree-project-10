import React from 'react';
import { Link } from 'react-router-dom';



export default class UserSignUp extends React.Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    verifyPassword: '',
    errors: [],
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      verifyPassword,
      errors,
    } = this.state;

    return (
      <div id="root">
        <div>

          <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign In</h1>
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div><input 
                    id="firstName" 
                    name="firstName" 
                    type="text"  
                    value={firstName} 
                    onChange={this.change}
                    placeholder="First Name" /></div>
                  <div><input 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    value={lastName} 
                    onChange={this.change}
                    placeholder="Last Name"  /></div>
                  <div><input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="text"  
                    value={emailAddress} 
                    onChange={this.change}
                    placeholder="Email Address" /></div>
                  <div><input 
                    id="password" 
                    name="password" 
                    type="password"  
                    value={password} 
                    onChange={this.change}
                    placeholder="Password" /></div>
                  <div><input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    value={verifyPassword} 
                    onChange={this.change}
                    placeholder="Confirm Password" /></div>
                  <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={this.handleCancel}>Cancel</button></div>
                </form>
              </div>
              <p>&nbsp;</p>
              <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleSubmit = (event) => {
    //don't submit and reload page
    event.preventDefault();


  };

  handleCancel = (event) => {
    //don't submit and reload page
    event.preventDefault();


  };

  change = (event) => { 
    const name = event.target.name;
    const value = event.target.value;

    this.setState( () => {
      return {
        [name]: value
      }
    })
  }
}
