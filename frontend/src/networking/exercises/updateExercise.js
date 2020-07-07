import request from '../request';

export default async (exerciseName, editedExercise) => {
  const url = process.env.REACT_APP_URL_EDIT_EXERCISE || 'https://f0cc6clsqf.execute-api.eu-central-1.amazonaws.com/dev/v1/exercises';
  const paramedUrl = `${url}/${exerciseName}`;

  return request(paramedUrl, 'PUT', undefined, editedExercise);
};
