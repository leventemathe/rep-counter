import request from '../request';

export default async (id) => {
  const url = process.env.REACT_APP_URL_DELETE_EXERCISE;
  if (!url) throw new Error('No delete exercise url found');
  const paramedUrl = `${url}/${id}`;

  return request(paramedUrl, 'DELETE');
};
