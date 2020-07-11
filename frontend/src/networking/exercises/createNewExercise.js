import request from '../request';

export default async (newExercise) => {
  const url = process.env.REACT_APP_URL_NEW_EXERCISE;
  if (!url) throw new Error('No new exercise url found');

  return request(url, 'POST', undefined, newExercise);
};
