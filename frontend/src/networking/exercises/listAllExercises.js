// import request from '../request';

export default async () => {
  const url = process.env.REACT_APP_URL_LIST_EXERCISES;
  if (!url) throw new Error('Exercise list url not found');

  // TODO:
  // return request(url);

  const exercises = [
    {
      id: 0,
      name: 'Squat',
      description: 'You squat, then stand up...',
    },
    {
      id: 1,
      name: 'Benchpress',
      description: 'You press the bar above you, dummy!',
    },
    {
      id: 2,
      name: 'Row',
      description: 'Pull, like you never pulled before!',
    },
  ];
  return new Promise((resolve) => {
    setTimeout(() => resolve(exercises), 1000);
  });
};
