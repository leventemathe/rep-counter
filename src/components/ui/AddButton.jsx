import React from 'react';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


export default ({ onClick, style, className }) => (
  <Button
    type="primary"
    shape="circle"
    size="large"
    onClick={onClick}
    style={style}
    className={className}
  >
    <PlusOutlined />
  </Button>
);
