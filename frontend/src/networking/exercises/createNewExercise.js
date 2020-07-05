import request from '../request';

export default async (newExercise) => {
  const url = process.env.REACT_APP_URL_NEW_EXERCISE || 'https://f0cc6clsqf.execute-api.eu-central-1.amazonaws.com/dev/v1/exercises/create';

  return request(url, 'POST', undefined, newExercise);
};
