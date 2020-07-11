import request from '../request';

export default async () => {
  const url = process.env.REACT_APP_URL_LIST_CATEGORIES;
  if (!url) throw new Error('No list categories url found');

  return request(url);
};
