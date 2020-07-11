import request from '../request';

export default async (exerciseId) => {
  const url = process.env.REACT_APP_URL_GET_EXERICSE;
  if (!url) throw new Error('No new get exercise url found');
  const paramedUrl = `${url}/${exerciseId}`;

  return request(paramedUrl);
};
