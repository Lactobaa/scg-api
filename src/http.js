import * as request from 'then-request';

export class Http {
  setAuthorization(options) {
    if (!options.headers) options.headers = {};
    // options.headers['Authorization'] = `Bearer ${config.api.token}`;
    // options.json = {};
    return options;
  }

  parseBody(response) {
    response.body = JSON.parse(response.body);
    return response;
  }

  async get(url, options = {}) {
    options = this.setAuthorization(options);
    let response = await request.default('GET', url, options);
    return this.parseBody(response);
  }

  async post(url, options = { json: {} }) {
    options = this.setAuthorization(options);

    let response = await request.default('POST', url, options);
    return this.parseBody(response);
  }

  async postManual(url, options = { json: {} }) {
    let response = await request.default('POST', url, options);
    return this.parseBody(response);
  }

  async delete(url, options = {}) {
    options = this.setAuthorization(options);
    let response = await request.default('DELETE', url, options);
    return this.parseBody(response);
  }
}

export const http = new Http();
export default http;
