import request from '../request';

export default async () => {
  const url = process.env.REACT_APP_URL_LIST_EXERCISES;
  if (!url) throw new Error('No list exercises url found');

  return request(url);
};
