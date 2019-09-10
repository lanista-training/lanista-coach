import React, { Component } from 'react';
import { useRef, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { List, Header, Modal, Icon, Button} from 'semantic-ui-react'

const StyledForm = styled.div`
  height: auto;
`;

const BirthdayPanel = ({t, data}) => {
  const [pagesState, setPagesState] = useState({
    currentPage: 1,
    frameIndex: 1,
  });

  return (
    <>
      <Header icon='archive' content='Archive Old Messages' />
      <Modal.Content>
       <p>
         Your inbox is getting full, would you like us to enable automatic archiving of old messages?
       </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red'>
          <Icon name='remove' /> No
        </Button>
        <Button color='green'>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
   </>
  )
}


export default BirthdayPanel
