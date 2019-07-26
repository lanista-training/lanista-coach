import * as React from "react";
import styled from 'styled-components';

const EmptyListMessage =  styled.div`
  width: 100%;
  position: relative;
  font-size: 1.5em;
  font-weight: 700;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column-reverse;
  -ms-flex-flow: column-reverse;
  flex-flow: column-reverse;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  line-height: 3.5em;
  opacity: .5;
  i {
    font-size: 5em;
    font-family: Lanista;
    font-style: normal;
    text-align: center;
    margin-top: 25vh;
    ::before {
      content: "${props => props.icon || "\e90b"}";
      background: 0 0!important;
      font-weight: normal;
    }
  }
`;

export default ({text, styles, icon}) =>
{
  console.log("icon")
  console.log(icon)
  return (
  <EmptyListMessage style={styles} icon={icon}>
    {text}
    <i/>
  </EmptyListMessage>
)}
