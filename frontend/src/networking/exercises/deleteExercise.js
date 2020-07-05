import request from '../request';

export default async (name) => {
  const url = process.env.REACT_APP_URL_DELETE_EXERCISE || 'https://f0cc6clsqf.execute-api.eu-central-1.amazonaws.com/dev/v1/exercises';
  const paramedUrl = `${url}/${name}`;

  return request(paramedUrl, 'DELETE');
};
