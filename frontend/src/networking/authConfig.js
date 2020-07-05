import Amplify from 'aws-amplify';

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
