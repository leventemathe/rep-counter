// import request from '../request';

export default async (id) => {
  const url = process.env.REACT_APP_URL_DELETE_EXERCISE;
  if (!url) throw new Error('New exercise url not found');

  // TODO:
  // return request(url, 'DELETE', headers, body);

  return new Promise((resolve) => {
    setTimeout(() => resolve(id), 1000);
  });
};
