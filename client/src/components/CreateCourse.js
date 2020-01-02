import React from 'react';
import Data from '../Data';
import { Link } from 'react-router-dom';

export default class CreateCourse extends React.Component {

  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
    loading: true
  };

  constructor(props) {
    super(props);
    // this.props.context.actions.getCourseDetail(props.match.params.id);
    this.data = new Data();
  }
  

  render() {
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const currentUser = this.props.context.authenticatedUser;

    return(
      <div>

        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            {/* Show validation errors if any */}
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
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div><input 
                    id="title" 
                    name="title" 
                    type="text" 
                    className="input-title course--title--input" 
                    value={title}
                    onChange={this.change}
                    placeholder="Course title..." /></div>
                  <p>{`By ${currentUser.firstName} ${currentUser.lastName}`}</p>
                </div>
                <div className="course--description">
                  <div><textarea 
                    id="description" 
                    name="description" 
                    value={description}
                    onChange={this.change}
                    placeholder="Course description..."  /></div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div><input 
                        id="estimatedTime" 
                        name="estimatedTime" 
                        type="text" 
                        className="course--time--input" 
                        value={estimatedTime}
                        onChange={this.change}
                        placeholder="Hours" /></div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div><textarea 
                        id="materialsNeeded" 
                        name="materialsNeeded" 
                        value={materialsNeeded}
                        onChange={this.change}
                        placeholder="List materials..." /></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Create Course</button>
                <Link className="button button-secondary" to={`/`}>Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

    )
    
  }

  // change value and update state when user types input
  change = (event) => { 
    const name = event.target.name;
    const value = event.target.value;

    this.setState( () => {
      return {
        [name]: value
      }
    })
  }

  handleSubmit =  (event) => {
    //don't submit and reload page
    event.preventDefault();
    const { context } = this.props;

    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const course = {title, description, estimatedTime, materialsNeeded};
    
    // access context to create course
    context.actions.createCourse(course)
      .then( (response) => {
        if(response.status === 201) {
          // load courses if successful
          this.props.history.push('/');
        } else if (response.status ===400){
          // load errors to state if any
          response.json().then(data => {
            this.setState(() => {
              return {errors: data.message }
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push('/error');
      });
  };

}
