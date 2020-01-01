import React from 'react';
import { Link } from 'react-router-dom';



export default class UserSignUp extends React.Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    return (
      <div id="root">
        <div>

          <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign In</h1>
              <div>
                { (this.state.errors?.length > 0) &&
                  <div>
                    <h2 className="validation--errors--label">Validation errors</h2>
                    <div className="validation-errors">
                      <ul>
                        {this.state.errors.map((error, i)=> <li key={i}>{error}</li>)}
                      </ul>
                    </div>
                  </div>
                }
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
                    value={confirmPassword} 
                    onChange={this.change}
                    placeholder="Confirm Password" /></div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                  </div>
                </form>
              </div>
              <p>&nbsp;</p>
              <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleSubmit =  (event) => {
    //don't submit and reload page
    event.preventDefault();
    const { context } = this.props;

    const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;
    const user = {firstName, lastName, emailAddress, password};

    if (password === confirmPassword) {
      context.actions.signUp(user)
        .then( (response) => {
          if(response.status === 201) {
            this.props.history.push('/');
          }
          else if (response.status === 400) {
            response.json().then(data => {
              this.setState(() => {
                return { errors: data.message }
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.props.history.push('/error');
        });
    } else {
      this.setState( () => {
        return{ errors: ['Passwords must match']}
      })
    }

  };

  handleCancel = (event) => {
    //don't submit and reload page
    event.preventDefault();
    this.props.history.push('/')

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
