import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { Modal, Button } from 'antd';

import MainRouter from './routing/MainRouter';
import Login from './pages/Login';

import ExerciseContext from '../stores';

import '../networking/authConfig';


export default observer(() => {
  const { authStore, uiStore } = useContext(ExerciseContext);

  return (
    <>
      {uiStore.error && (
      <Modal
        title="Error"
        visible={!!uiStore.error}
        closable={false}
        footer={[
          <Button key="okButton" type="primary" onClick={() => { uiStore.error = ''; }}>OK</Button>,
        ]}
      >
        {uiStore.error}
      </Modal>
      )}
      {authStore.isLoggedin ? <MainRouter /> : <Login />}
    </>
  );
});
