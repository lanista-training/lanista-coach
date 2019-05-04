import React, { Component } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  background: none!important;
  padding: 0!important;
  font-size: 1.2em!important;
  .actives {
    color: green!important;
  }
`;

export default class Calender extends Component {

  state = { modalOpen: false };
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const {buttonStyle, onClick, modifiers, modifiersStyles, onDayClick} = this.props;
    return (
      <Modal
        trigger={<StyledButton
          circular icon='expand arrows alternate expand'
          onClick={this.handleOpen}
        />}
        style={{height: '90vh', width: '90vw', overflowY: 'scroll'}}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        >
        <Modal.Content>
          <Modal.Description>
            <DayPicker
              numberOfMonths={12}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              onDayClick={(day) =>
              {
                onDayClick(day);
                this.handleClose();
              }}
              todayButton="Today"
              onTodayButtonClick={(day, modifiers) => onDayClick(day)}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
