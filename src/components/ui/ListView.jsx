import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ({ children, className, styles }) => (
  <Styles
    className={className}
    styles={styles}
  >
    {children}
  </Styles>
);
