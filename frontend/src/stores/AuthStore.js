import {
  observable, decorate, action, computed,
} from 'mobx';
import {
  login, logout, getUser,
} from '../networking/auth';

class AuthStore {
  user;

  constructor() {
    getUser().then(user => {
      this.user = user;
    });
  }

  login = async (username, password) => {
    const newUser = await login(username, password);
    this.user = newUser;

    return this.user;
  }

  logout = async () => {
    await logout();
    this.user = null;
  }

  get isLoggedin() {
    return !!this.user;
  }

  get token() {
    return this.user.signInUserSession.idToken.jwtToken;
  }
}

export default AuthStore;

decorate(AuthStore, {
  user: observable,
  login: action,
  logout: action,
  isLoggedin: computed,
  token: computed,
});
