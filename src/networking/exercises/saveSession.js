// import request from '../request';

export default async (newSession) => {
  const url = process.env.REACT_APP_URL_NEW_SESSION;
  if (!url) throw new Error('New newSession url not found');

  // TODO:
  // return request(url, 'POST', headers, body);

  return new Promise((resolve) => {
    setTimeout(() => resolve(newSession), 1000);
  });
};
