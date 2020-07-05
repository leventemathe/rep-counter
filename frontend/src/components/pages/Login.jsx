import React from 'react';
import { observer } from 'mobx-react';
import {
  PageHeader, Form, Input, Button,
} from 'antd';
import styled from 'styled-components';

import Page from './Page';

const LoginForm = styled(Form)`
  margin: 16px;
  
  button {
    display: block;
    margin: 0 auto;
  }
`;

export default observer(() => {
  const loading = false;

  const onFinish = () => {

  };

  const onFinishFailed = () => {

  };

  return (
    <Page>
      <PageHeader
        className="site-page-header"
        title="Login"
      />

      <LoginForm
        name="login"
        hideRequiredMark
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input a username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input a password!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
          >
            {loading ? 'Loading' : 'Login' }
          </Button>
        </Form.Item>
      </LoginForm>
    </Page>
  );
});
