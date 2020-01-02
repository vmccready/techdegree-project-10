
export default class Data {

  // api function to fetch data
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    // Link to host api
    const url = 'http://localhost:5000/api' + path;

    const options = {
      method, 
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body,
    };

    //include credentials if authorization required
    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    //fetch data
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

  async createCourse(course, username, password) {
    const response = await this.api(`/courses`, 'POST', course, true, {username, password});
    if (response.status === 201) {
      return response;
    }
    else if (response.status === 400) {
      return response;
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async updateCourse(id, course, username, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {username, password});
    if (response.status === 204) {
      return response;
    }
    else if (response.status === 400) {
      return response;
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

  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { username, password });
    if (response.status === 204) {
      return response;
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
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

  async createUser(user) {
    const response = await this.api(`/users`, 'POST', user, false);
    if (response.status === 201) {
      return response;
    }
    else if (response.status === 400) {
      return response;
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }



}