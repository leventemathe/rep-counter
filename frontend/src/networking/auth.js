import { Auth } from 'aws-amplify';

// TODO: use these with a store, so we can listen to change

export const login = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const logout = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (_) {
    return null;
  }
};
