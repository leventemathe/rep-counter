import React, { useState, useEffect } from 'react';
import { Input, Select } from 'antd';
import styled from 'styled-components';

import AddButton from '../ui/AddButton';

import listAllCategories from '../../networking/exercises/listAllCategories';

const { Option } = Select;

const NewCategoryArea = styled.div`
  display: flex;
  align-items: center;
  &>:first-child {
    margin-right: 8px;
    margin-top: 16px;
    margin-bottom: 16px;
  }
`;

export default ({ category, onChange }) => {
  const [newCategory, setNewCategory] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const cats = await listAllCategories();
      setAvailableCategories(cats);
    })();
  }, []);

  const addNewCategory = cat => {
    setNewCategory('');
    setAvailableCategories([...availableCategories, cat]);
    onChange(cat);
  };

  return (
    <div>
      <Select value={category} onChange={onChange}>
        {availableCategories.map(cat => <Option key={cat} value={cat}>{cat}</Option>)}
      </Select>
      <NewCategoryArea>
        <Input placeholder="New category" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
        <AddButton onClick={() => addNewCategory(newCategory)} />
      </NewCategoryArea>
    </div>
  );
};
