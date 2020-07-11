import request from '../request';

export default async (exerciseId, newSession) => {
  const url = process.env.REACT_APP_URL_NEW_SESSION;
  if (!url) throw new Error('No add sessions url found');
  const paramedUrl = `${url}/${exerciseId}`;

  console.log(newSession);

  return request(paramedUrl, 'POST', undefined, newSession);
};
