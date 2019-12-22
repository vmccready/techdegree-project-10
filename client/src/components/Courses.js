import React from 'react';
import { Link } from 'react-router-dom';
import Data from '../Data';


export default class Courses extends React.Component {

  // initialize state
  state = {
    courses: []
  };

  constructor(props) {
    super(props);
    this.data = new Data();
  }

  async componentDidMount() {
    // fetch data from database
    const courses = await this.data.getCourses();
    if (courses !== null) {
      this.setState( ()=> {
        return {
          courses: courses,
        };
      });
    }
  }

  render() {
    const { courses } = this.state;

    return (
      <div id="root">
        <div>
          {/* From database */}
          <div className = "bounds">
            {courses.map( (course, index) => {
              return(
                <div className="grid-33"><Link className="course--module course--link" to={`course/${course.id}`}>
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                </Link></div>
              )
            })}
            {/* New course 
                TODO: change anchor tag to LINK
            */}
            <div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                  </svg>New Course</h3>
              </a></div>            
          </div>


        </div>
      </div>
    )
    
  }
}
