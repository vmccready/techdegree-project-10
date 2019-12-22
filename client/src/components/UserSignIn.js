import React from 'react';
import { Link } from 'react-router-dom';



export default class UserSignIn extends React.Component {

  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      username,
      password,
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
                          id="emailAddress" 
                          name="emailAddress" 
                          type="text" 
                          value={username} 
                          onChange={this.change}
                          placeholder="Email Address" 
                          /></div>
                  <div><input 
                          id="password" 
                          name="password" 
                          type="password" 
                          value={password}
                          onChange={this.change}
                          placeholder="Password" 
                          /></div>
                  <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={this.handleCancel}>Cancel</button></div>
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
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/courses' } };
    const { password } = this.state;
    const username = this.state.emailAddress;

    context.actions.signIn(username, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          this.props.history.push('/courses');
        }
      })
      .catch((error) => {
        console.error(error);
        this.props.history.push('/error');
      });


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
