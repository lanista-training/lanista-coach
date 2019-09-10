import * as React from "react";
import styled from 'styled-components';
import moment from "moment";

const ImageBlock  = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border-style: solid!important;
  border-width: 4px!important;
  border-color: rgb(155, 201, 61);
  margin-top: 7px;
  margin-left: 10px;
  background-color: rgb(155, 201, 61);
  overflow: hidden;
  background-size: cover;
  ::before{
    font-family: Icons;
    content: "\f2bd";
    content: "\f2bd";
    font-size: 6.5em;
    color: white;
    line-height: 1em;
  }
`;
const Foto  = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  position: relative;
  top: -92px;
  box-shadow: rgba(0,0,0,0.7) 0 1px 4px 0 inset, rgba(255,255,255,0.2) 0 1px 0 0;
  background-repeat: no-repeat;
  background-position: center;
`;
const ExerciseName  = styled.div`
  margin-right: auto;
  margin-left: 0.5em;
  display: flex;
  font-size: 1.7em;
  line-height: 3.2em;
  font-weight: 700;
`;
const ExerciseHeader  = styled.div`
  display: flex;
  margin-right: 2em;
  width: 100%;
`;
const TextBlock  = styled.div`
  font-size: 2em;
  text-align: right;
  font-family: Abel;
  margin-top: 0.7em;
  line-height: 0.8em;
`;
const FirstName  = styled.div`
  font-size: 0.8em;
`;
const LastName  = styled.div`
  font-weight: bold;
`;


export default ({userId, firstName, lastName, exerciseName}) => (
  <ExerciseHeader>
    <ExerciseName>
      {exerciseName}
    </ExerciseName>
    <TextBlock >
      <LastName >{lastName}</LastName>
      <FirstName >{firstName}</FirstName>
    </TextBlock>
    <ImageBlock >
      <Foto style={{ backgroundImage: 'url(http://lanista-training.com/tpmanager/img/p/'+ userId + '_photo.jpg)' }}/>
    </ImageBlock>
  </ExerciseHeader>
);
