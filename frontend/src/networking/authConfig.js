/* eslint-disable no-param-reassign */
import Amplify from 'aws-amplify';
import axios from 'axios';
import { getUser } from './auth';

const config = {
  apiGateway: {
    REGION: 'eu-central-1',
    URL: process.env.API_BASE_URL || 'https://f0cc6clsqf.execute-api.eu-central-1.amazonaws.com/dev',
  },
  cognito: {
    REGION: 'eu-central-1',
    USER_POOL_ID: process.env.USER_POOL_ID || 'eu-central-1_rQJIRknvf',
    APP_CLIENT_ID: process.env.APP_CLIENT_ID || '753vl3j4tirqpcbaf621qhg5h0',
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
