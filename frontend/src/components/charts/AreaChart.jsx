import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';


const Styles = styled.div``;

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref) return;
    const svg = d3.select(ref.current);
    console.log(svg);
  }, []);

  return (
    <Styles>
      <svg ref={ref} />
    </Styles>
  );
};
