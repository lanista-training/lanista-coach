/* eslint import/no-webpack-loader-syntax: off */
import * as React from "react";
import styled from 'styled-components';

import LogoImage from '-!react-svg-loader!../../images/LanistaLogo.svg';

const Header = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 70px;
  display: flex;
  z-index: 1;
  .folder-logo {
    margin-left: 0.5em;
    margin-top: 0.15em;
    font-size: 3em;
    color: rgb(52, 172, 251);
  }
`;

const Logo = styled.div`
  margin-left: 2em;
  margin-top: 20px;
  svg {
    transition: fill 2s ease;
    fill: ${props => props.networkStatus > 6 ? "#000000" : (props.networkStatus < 8 ? "#fc7127" : "#f50057")};
  }
`;

export default ({children, mode, renderLogo, networkStatus}) => {

  return (
    <Header mode={mode}>
      {!renderLogo &&
        <Logo networkStatus={networkStatus !== undefined ? networkStatus : 7}>
          <LogoImage width={30} height={30} />
        </Logo>
      }
      {renderLogo && renderLogo()}
      {children}
    </Header>
  )
};
