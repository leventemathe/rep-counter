import React from 'react';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


export default ({
  onClick, style, className, type, shape, size,
}) => (
  <Button
    type={type || 'primary'}
    shape={shape || 'circle'}
    size={size || 'large'}
    onClick={onClick}
    style={style}
    className={className}
  >
    <PlusOutlined />
  </Button>
);
