// import request from '../request';

export default async (newExercise) => {
  const url = process.env.REACT_APP_URL_NEW_EXERCISE;
  if (!url) throw new Error('New exercise url not found');

  // TODO:
  // return request(url, 'POST', headers, body);

  return new Promise((resolve) => {
    setTimeout(() => resolve(newExercise), 1000);
  });
};
