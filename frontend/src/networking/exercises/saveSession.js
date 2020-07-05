import request from '../request';

export default async (exerciseName, newSession) => {
  const url = process.env.REACT_APP_URL_NEW_SESSION || 'https://f0cc6clsqf.execute-api.eu-central-1.amazonaws.com/dev/v1/exercises/addSession';
  const paramedUrl = `${url}/${exerciseName}`;

  console.log(newSession);

  return request(paramedUrl, 'POST', null, newSession);
};
