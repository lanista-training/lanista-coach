import * as React from "react";
import styled from 'styled-components';

import LogoImage from '-!react-svg-loader!../../images/LanistaLogoGreen.svg';

const Header = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: ${props => props.theme.header.height};
  display: flex;
  background-color: white;
  border-bottom: 1px solid rgba(0,0,0,.0975);
  -webkit-box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);
  box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);
  z-index: 1;
`;
const Logo = styled.div`
  margin-left: 2em;
  margin-top: 15px;
`;

export default ({children}) => {
  return (
    <Header>
      <Logo>
        <LogoImage width={40} height={40} />
      </Logo>
      {children}
    </Header>
  )
};
