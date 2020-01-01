import React from 'react';
import Data from '../Data';

export default class UpdateCourse extends React.Component {

  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    courseId: "",
    errors: [],
    loading: true
  };

  constructor(props) {
    super(props);
    // this.props.context.actions.getCourseDetail(props.match.params.id);
    this.data = new Data();
  }

  async componentDidMount() {
    // get id from url
    const id = this.props.match.params.id;
    // fetch data from database
    const courseDetail = await this.data.getCourseDetail(id);
    if (courseDetail !== null) {
      this.setState( ()=> {
        return {
          title: courseDetail.title,
          description: courseDetail.description,
          estimatedTime: courseDetail.estimatedTime,
          materialsNeeded: courseDetail.materialsNeeded,
          courseId: courseDetail.id,
          loading:false
        };
      });
    }
  }
  

  render() {
    const { title, description, estimatedTime, materialsNeeded } = this.state;

    return(
      <div className="bounds course--detail">
        <h1>Update Course</h1>
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
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                {/* Update value value and placeholder to current values */}
                <div><input 
                    id="title" 
                    name="title" 
                    type="text" 
                    className="input-title course--title--input" 
                    value={title}
                    onChange={this.change}
                    placeholder="Course title..." /></div>
                <p>By Joe Smith</p>
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
              <button className="button" type="submit">Update Course</button>
              <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>

    )
    
  }

  handleSubmit =  (event) => {
    //don't submit and reload page
    event.preventDefault();
    const { context } = this.props;

    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const course = {title, description, estimatedTime, materialsNeeded};
    const id = this.state.courseId;

    context.actions.updateCourse(id, course)
      .then( (response) => {
        if(response.status === 204) {
          this.props.history.push(`/course/${this.props.match.params.id}`);
        } 
        else if (response.status === 400) {
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

  handleCancel = (event) => {
    //don't submit and reload page
    event.preventDefault();
    this.props.history.push(`/course/${this.props.match.params.id}`)

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
