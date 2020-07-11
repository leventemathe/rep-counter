/* eslint-disable no-param-reassign */
import Amplify from 'aws-amplify';
import axios from 'axios';
import { getUser } from './auth';

const config = {
  apiGateway: {
    REGION: process.env.REACT_APP_AWS_REGION,
    URL: process.env.REACT_APP_API_GATEWAY_BASE_URL,
  },
  cognito: {
    REGION: process.env.REACT_APP_AWS_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_APP_CLIENT_ID,
  },
};


Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: 'exercises',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

axios.interceptors.request.use(
  async conf => {
    // TODO: rethink this, use store instead?
    const user = await getUser();
    const token = user.signInUserSession.idToken.jwtToken;
    if (token) {
      conf.headers.Authorization = `Bearer ${token}`;
    }
    conf.headers['Content-Type'] = 'application/json';
    return conf;
  },
  error => {
    Promise.reject(error);
  },
);
