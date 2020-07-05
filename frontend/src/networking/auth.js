import { Auth } from 'aws-amplify';

// TODO: use these with a store, so we can listen to change

export const login = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    console.error('Error while logging in: ', error);
    return null;
  }
};

export const logout = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error('Error while logging out: ', error);
  }
};

export const getUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (error) {
    console.log('Error while getting user: ', error);
    return null;
  }
};
