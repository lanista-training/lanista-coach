import * as React from "react";
import styled from 'styled-components';

const Footer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 0px;
`;

export default ({children}) => {
  return (
    <Footer>
      {children}
    </Footer>
  )
};
