import * as React from "react";
import styled from 'styled-components';

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  padding: 0.5em;
  padding-left: 1em;
  width: 100%;
  display: flex;
  flex-flow: row;
  z-index: 10;
`;

export default ({children}) => {
  return (
    <Footer>
      {children}
    </Footer>
  )
};
