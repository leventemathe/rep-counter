import request from '../request';

export default async (exerciseId) => {
  const url = process.env.REACT_APP_URL_GET_EXERICSE;
  if (!url) throw new Error('No new get exercise url found');
  const paramedUrl = `${url}/${exerciseId}`;

  const exercise = await request(paramedUrl);
  const newSessions = exercise.exercise.sessions.map(session => ({ ...session, sets: session.sets.filter(set => set.weight > 0 && set.reps > 0) }));
  return { exercise: { ...exercise, sessions: newSessions } };
};
