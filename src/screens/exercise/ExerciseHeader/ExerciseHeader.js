import * as React from "react";
import styled from 'styled-components';
import moment from "moment";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const ImageBlock  = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-top: 7px;
  margin-left: 10px;
  background-color: rgb(155, 201, 61);
  overflow: hidden;
  background-size: cover;
  box-shadow: 0 0 10px 0 #0000006b;
  ::before{
    font-family: Icons;
    content: "\f2bd";
    content: "\f2bd";
    font-size: 60px;
    color: white;
    line-height: 61px;
  }
`;
const Foto  = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  position: relative;
  top: -60px;
  box-shadow: rgba(0,0,0,0.7) 0 1px 4px 0 inset, rgba(255,255,255,0.2) 0 1px 0 0;
  background-repeat: no-repeat;
  background-position: center;
`;
const ExerciseName  = styled.div`
  margin-right: auto;
  margin-left: 0.5em;
  display: flex;
  font-size: 1.7em;
  line-height: 2.5em;
  font-weight: 100;
  svg {
    color: rgb(155,201,61);
  }
`;
const ExerciseHeader  = styled.div`
  display: flex;
  margin-right: 2em;
  width: 100%;
`;
const TextBlock  = styled.div`
  font-size: 2em;
  text-align: right;
  font-family: Roboto;
  margin-top: 0.35em;
  line-height: 0.8em;
`;
const FirstName  = styled.div`
  font-size: 0.8em;
`;
const LastName  = styled.div`
  font-weight: bold;
`;


export default ({exercise,  owner, editNameMode, toggleEditNameMode}) => {
  const {member} = exercise ? exercise : {};
  const {id, first_name, last_name} = member ? member : {};
  const {name} = exercise ? exercise : {};
  return(
    <ExerciseHeader>
      <ExerciseName>
        {name}
        {owner && !editNameMode &&
          <IconButton
            aria-label="edit"
            className="edit-button"
            onClick={toggleEditNameMode}
          >
            <EditIcon fontSize="large" />
          </IconButton>
        }
      </ExerciseName>
      {member &&
        <TextBlock >
          <LastName >{last_name}</LastName>
          <FirstName >{first_name}</FirstName>
        </TextBlock>
      }
      {member &&
        <ImageBlock >
          <Foto style={{ backgroundImage: 'url(http://lanista-training.com/tpmanager/img/p/'+ id
           + '_photo.jpg)' }}/>
        </ImageBlock>
      }
    </ExerciseHeader>
  )
};
