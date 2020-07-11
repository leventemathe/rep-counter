import request from '../request';

export default async (exerciseId, editedExercise) => {
  const url = process.env.REACT_APP_URL_EDIT_EXERCISE;
  if (!url) throw new Error('No edit exercise url found');
  const paramedUrl = `${url}/${exerciseId}`;

  return request(paramedUrl, 'PUT', undefined, editedExercise);
};
