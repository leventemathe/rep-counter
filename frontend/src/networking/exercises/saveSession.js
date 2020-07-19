import request from '../request';

export default async (exerciseId, newSession) => {
  const url = process.env.REACT_APP_URL_NEW_SESSION;
  if (!url) throw new Error('No add sessions url found');
  const paramedUrl = `${url}/${exerciseId}`;

  const filteredSession = { ...newSession, sets: newSession.sets.filter(set => set.weight > 0 && set.reps > 0) };

  return request(paramedUrl, 'POST', undefined, filteredSession);
};
