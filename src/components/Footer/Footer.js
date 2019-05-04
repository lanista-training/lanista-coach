import * as React from "react";
import styled from 'styled-components';

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  padding: 0.5em;
  padding-left: 1em;
  background-color: white;
  width: 100%;
  border-top: 1px solid rgba(0,0,0,.0975);
  display: flex;
  z-index: 10;
`;

export default ({children}) => {
  return (
    <Footer>
      {children}
    </Footer>
  )
};
