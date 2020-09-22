import * as React from "react";

import moment from "moment";
import { Header, Icon, Image } from 'semantic-ui-react'
import {ImageBlock, Foto, CustomerHeader, TextBlock, FirstName, LastName} from './styles';

export default ({userId, firstName, lastName, photoUrl, onClick, editable, status}) => (
  <CustomerHeader onClick={onClick} >
    <TextBlock >
      <LastName >{lastName}</LastName>
      <FirstName >{firstName}</FirstName>
    </TextBlock>
    <ImageBlock editable={editable} status={status}>
      <Foto style={{ backgroundImage: 'url(' + photoUrl }} editable={editable}/>
    </ImageBlock>
  </CustomerHeader>
);
