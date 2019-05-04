import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Image,
  List,
  Card,
  Dimmer,
  Loader,
  Sidebar,
  Menu,
} from 'semantic-ui-react';
import ReactList from 'react-list';
import { useTransition, animated } from 'react-spring';

const Stage = styled.div`
  padding-top: 8em!important;
  padding-bottom: 8em!important;
  max-width: 775px;
  display: block!important;
  margin-right: auto!important;
  margin-left: auto!important;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;
const StyledCard = styled(Card)`
  width: 100%!important;
  border: rgb(242, 242, 242)!important;
  border-style: solid!important;
  border-width: 1px!important;
  box-shadow: rgba(0, 0, 0, 0.0745098) 0px 1px 4px 1px!important;
`;
const ListItem = styled(List.Item)`
  padding: 1.5em!important;
  border-bottom-color: rgba(0, 0, 0, 0.075);
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;
const UserNameAndAvatar = styled.div`
  display: flex;
  font-size: 1.3em;
  line-height: 1.4em;
`;
const Avatar = styled.div`
  margin-right: 1em;
`;
const Action  = styled.div`
  padding-top: 0.5em;
`;
const ListLoader = styled(Loader)`
  position: fixed!important;
  top: 50vh;
`;
const FilterStatus  = styled.div`
  font-size: 1.2em;
`;

function AnimatedList({customers, showCustomer}) {
  return (
    <List divided verticalAlign='middle'>
      <ReactList
        //ref={c => this.list = c}
        itemRenderer={(index, key) => {
          return(
            <ListItem>
              <List.Content floated='right'>
                <Action>
                  <Button onClick={() => showCustomer(index)}>Open</Button>
                </Action>
              </List.Content>
              <UserNameAndAvatar>
                <Avatar>
                  <Image
                    avatar
                    src={'http://lanista-training.com/tpmanager/img/p/' + customers[index].id + '_photo.jpg'}
                    size='massive'
                  />
                </Avatar>
                <List.Content style={{lineHight: '2em'}}>
                  {customers[index].first_name} {customers[index].last_name}
                  <br/>
                  <span style={{color: "rgb(116, 116, 116)", fontSize: '0.9em'}}>{customers[index].email}</span>
                </List.Content>
              </UserNameAndAvatar>
            </ListItem>
          );
        }}
        length={customers.length}
        type='uniform'
        className='hide-scrollbar'
      />
    </List>
  )
}

class Customers extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }

  render() {
    const {
      customers,
      filtering,
      isFilterOn,
      showCustomer,
      t,
    } = this.props;
    return(
      <Stage>
        <FilterStatus>
          {isFilterOn ? (customers.length + ' ' + t('customers:customers_found')) : ''}
        </FilterStatus>
        <StyledCard>
          <Dimmer active={filtering} inverted>
            <ListLoader size='mini'>Loading</ListLoader>
          </Dimmer>
          <AnimatedList customers={customers} showCustomer={showCustomer}/>
        </StyledCard>
      </Stage>
    );
  }
};

export default Customers;
