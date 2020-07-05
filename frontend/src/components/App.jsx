import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import MainRouter from './routing/MainRouter';
import Login from './pages/Login';

import ExerciseContext from '../stores';

import '../networking/authConfig';


export default observer(() => {
  const { authStore } = useContext(ExerciseContext);

  return (authStore.isLoggedin ? <MainRouter /> : <Login />);
});
