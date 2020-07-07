import React, { useState } from 'react';
import styled from 'styled-components';

import {
  Form, Input, Button,
} from 'antd';

const NewExerciseFormStyles = styled(Form)`
  margin: 16px;
  
  button {
    display: block;
    margin: 0 auto;
  }
`;

const NewExerciseForm = ({ action }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (exercise) => {
    try {
      setLoading(true);
      await action(exercise);
    } catch (error) {
      // TODO: better error handling
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (error) => {
    console.error('Creating new exercise failed: ', error);
    // TODO: handle error with modal or something
  };

  return (
    <NewExerciseFormStyles
      name="newExercise"
      hideRequiredMark
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input a name!' }]}
      >
        <Input placeholder="e.g. Benchpress (required)" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <Input placeholder="optional" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
        >
          {loading ? 'Loading' : 'Submit' }
        </Button>
      </Form.Item>
    </NewExerciseFormStyles>
  );
};

export default NewExerciseForm;
