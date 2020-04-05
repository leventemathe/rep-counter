import Axios from 'axios';

import ErrorWithStatus from './ErrorWithStatus';
import errorNames from './erroNames';

export default async (url, method = 'GET', headers, data) => {
  try {
    const response = await Axios.request({
      url,
      method,
      headers,
      data,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded, but not with 2xx
      throw new ErrorWithStatus(error.response.data, error.response.status, errorNames.service, error.stack);
    } else if (error.request) {
      // Server did not respond
      throw new ErrorWithStatus(`Server at ${url} did not respond`, 503, errorNames.serviceUnavailable, error.stack);
    } else {
      // An error happened while setting up the request
      throw new ErrorWithStatus(`Setting up request to ${url} with method ${method} failed`, 500, errorNames.server, error.stack);
    }
  }
};
