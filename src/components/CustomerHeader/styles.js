import styled from 'styled-components';

export const ImageBlock  = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border-style: ${props => props.editable ? 'solid!important' : 'initial'};
  border-width: 2px!important;
  border-color: ${props => props.status == 1 ? 'rgb(155, 201, 61)' : '#fe9500'};
  margin-top: 4px;
  margin-left: 10px;
  background-color: rgb(155, 201, 61);
  overflow: hidden;
  background-size: cover;
  box-shadow: 0 0 10px 0 #0000006b;
  ::before{
    font-family: Icons;
    content: "\f2bd";
    content: "\f2bd";
    font-size: 80px;
    color: white;
    line-height: 74px;
  }
`;

export const Foto  = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  position: relative;
  top: -74px;
  box-shadow: ${props => props.editable ? 'rgba(0,0,0,0.7) 0 1px 4px 0 inset, rgba(255,255,255,0.2) 0 1px 0 0' : 'initial'} ;
  background-repeat: no-repeat;
  background-position: center;
`;

export const CustomerHeader  = styled.div`
  margin-left: auto;
  display: flex;
  margin-right: 2em;
`;

export const TextBlock  = styled.div`
  font-size: 2em;
  text-align: right;
  font-family: Roboto;
  margin-top: 0.4em;
  line-height: 0.8em;
`;

export const FirstName  = styled.div`
  font-size: 0.8em;
`;

export const LastName  = styled.div`
  font-weight: bold;
`;
