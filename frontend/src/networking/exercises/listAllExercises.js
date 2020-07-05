import request from '../request';

export default async () => {
  const url = process.env.REACT_APP_URL_LIST_EXERCISES || ' https://f0cc6clsqf.execute-api.eu-central-1.amazonaws.com/dev/v1/exercises';

  return request(url);
};
