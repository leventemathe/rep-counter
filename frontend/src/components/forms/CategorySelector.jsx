import React, { useState, useEffect, useContext } from 'react';
import { Input, Select } from 'antd';
import styled from 'styled-components';

import AddButton from '../ui/AddButton';

import listAllCategories from '../../networking/exercises/listAllCategories';

import Stores from '../../stores';

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

  const { uiStore } = useContext(Stores);

  useEffect(() => {
    (async () => {
      try {
        const cats = await listAllCategories();
        setAvailableCategories(cats);
      } catch (e) {
        uiStore.error = e.message || e;
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNewCategory = cat => {
    if (!cat) return;
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
