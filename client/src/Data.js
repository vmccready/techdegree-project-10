

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    // Link to host api
    const url = 'http://localhost:5000/api' + path;

    const options = {
      method, 
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    return fetch(url, options);
  }

  async getCourses() {
    const response = await this.api('/courses', 'GET', null, false);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async getCourseDetail(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null, false);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
}