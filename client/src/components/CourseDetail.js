import React from 'react';
import Data from '../Data';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends React.Component {

  state = {
    courseDetail: {},
    isCourseOwner: false,
    loading: true
  };

  constructor(props) {
    super(props);
    this.data = new Data();
    this.id = this.props.match.params.id;
  }

  async componentDidMount() {
    // fetch data from database
    const courseDetail = await this.data.getCourseDetail(this.id);
    if (courseDetail !== null) {
      this.setState( ()=> {
        return {
          courseDetail: courseDetail,
          isCourseOwner: (courseDetail.userId === this.props.context.authenticatedUser?.id),
          loading:false
        };
      });
    }
  }

  componentWillUnmount() {
    this.setState( ()=> { return {loading: true} })
  }
  
  deleteCourse = async () => {
    const user = this.props.context.authenticatedUser;
    // wait for delete before loading all courses
    await this.data.deleteCourse(this.id, user.emailAddress, user.password )
    this.props.history.push('/');
  }

  render() {
    const { courseDetail } = this.state;
    if(this.state.loading) {
      return (<h2>Loading...</h2>)
    } else {
      return(
      <div id="root">
        <div>
          <div>
            <div className="actions--bar">
              <div className="bounds">

                <div className="grid-100">        
                {/* only show update and delete if user is course owner */}
                { this.state.isCourseOwner && 
                  <span>
                    <Link className="button" to={`/courses/${courseDetail.id}/update`}>Update Course</Link>
                    <button className="button" onClick={this.deleteCourse} >Delete Course</button>
                  </span>
                }
                  <Link className="button button-secondary" to='/'>Return to List</Link>
                </div>
              </div>
            </div>

            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{courseDetail.title}</h3>
                  <p>By {`${courseDetail.User.firstName} ${courseDetail.User.lastName}`}</p>
                </div>
                <div className="course--description">
                  <ReactMarkdown source={courseDetail.description} />
                </div>
              </div>

              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{courseDetail.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ReactMarkdown source={courseDetail.materialsNeeded} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }
    
  }
}
