import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import {
  Form, Input, Button,
} from 'antd';
import CategorySelector from './CategorySelector';

import Stores from '../../stores';

const NewExerciseFormStyles = styled(Form)`
  margin: 16px;
  
  button {
    display: block;
    margin: 0 auto;
  }
`;

const NewExerciseForm = ({ action, initialValues }) => {
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState(initialValues?.category);

  const { uiStore } = useContext(Stores);

  const onFinish = async (exercise) => {
    try {
      setLoading(true);
      const newExercise = exercise.category ? { ...exercise, categories: [exercise.category] } : exercise;
      await action(newExercise);
    } catch (error) {
      uiStore.error = error.message || error;
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
      initialValues={initialValues}
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

      <Form.Item
        label="Category"
        name="category"
      >
        <CategorySelector
          category={category}
          onChange={setCategory}
        />
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
