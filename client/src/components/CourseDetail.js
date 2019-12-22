import React from 'react';
import Data from '../Data';

export default class CourseDetail extends React.Component {

  state = {
    courseDetail: {},
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
          courseDetail: courseDetail,
          loading:false
        };
      });
    }
  }

  componentWillUnmount() {
    this.setState( ()=> { return {loading: true} })
  }
  

  render() {
    // const course = this.props.context.courseDetail;
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
                <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a className="button button-secondary" href="index.html">Return to List</a></div>
              </div>
            </div>

            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{courseDetail.title}</h3>
                  <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                  <p>{ courseDetail.description}</p>
                </div>
              </div>

              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>14 hours</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        <li>1/2 x 3/4 inch parting strip</li>
                        <li>1 x 2 common pine</li>
                        <li>1 x 4 common pine</li>
                        <li>1 x 10 common pine</li>
                        <li>1/4 inch thick lauan plywood</li>
                        <li>Finishing Nails</li>
                        <li>Sandpaper</li>
                        <li>Wood Glue</li>
                        <li>Wood Filler</li>
                        <li>Minwax Oil Based Polyurethane</li>
                      </ul>
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
