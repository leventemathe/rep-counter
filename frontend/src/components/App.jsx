import React from 'react';
import MainRouter from './routing/MainRouter';
import Login from './pages/Login';

export default () => {
  const isLoggedIn = false;

  return isLoggedIn ? <MainRouter /> : <Login />;
};
