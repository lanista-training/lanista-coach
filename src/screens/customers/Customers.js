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
import InfiniteList from '../../components/InfiniteList';
import { useTransition, animated } from 'react-spring';
import EmptyListMessage from '../../components/EmptyListMessage';

const Stage = styled.div`
  max-width: 935px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-flow: row nowrap;
  -ms-flex-flow: row nowrap;
  -webkit-flex-flow: row nowrap;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  max-width: 935px;
  position: relative;
  width: 100%;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  margin: 0 auto;
  padding-top: 5em!important;
  height: 100vh;
`;
const ListSection = styled.div`
  overflow: auto;
  padding-top: 1.5em;
  width: 100%;
  margin-bottom: 4em;
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
  float: left;
  width: 20vw;
  height: 100%;
  background-color: white;
  overflow: hidden;
  margin: 2em;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 5px;
  box-shadow: 0 0 27px 0 #0000001f;
  display: flex;
  flex-flow: column;
  align-items: center;
`;
const UserNameAndAvatar = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
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
const FirstName  = styled.div`
  text-align: center;
  line-height: 1em;
  height: 1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 18vw
`;
const LastName  = styled.div`
  text-align: center;
  line-height: 1em;
  height: 1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 18vw
`;

class Customers extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null,
      initialLoading: true,
    }
  }

  render() {
    const {
      customers,
      filtering,
      isFilterOn,
      showCustomer,
      t,
      onRequestPage,
      hasMore,
      initialLoading,
      loading,
      setPageSize,
    } = this.props;

    var items = [];
    customers.map((customer, i) => {
      items.push(
        <ListItem key={i}>
          <UserNameAndAvatar>
            <div style={{
              width: '8em',
              height: '8em',
              backgroundColor: '#fafafa',
              borderRadius: '5%',
              webkitBoxSizing: 'border-box',
              boxSizing: 'border-box',
              display: 'block',
              webkitBoxFlex: '0',
              webkitFlex: '0 0 auto',
              msFlex: '0 0 auto',
              flex: '0 0 auto',
              overflow: 'hidden',
              position: 'relative',
              backgroundImage: 'url("http://lanista-training.com/tpmanager/img/p/' + customer.id + '_photo.jpg")',
              backgroundSize: "contain",
            }}>
            </div>
            <List.Content style={{ padding: "1em 0"}}>
              <FirstName>{(customer.first_name||customer.last_name) ? customer.last_name : customer.email}</FirstName>
              <LastName>{customer.first_name}</LastName>
            </List.Content>
          </UserNameAndAvatar>
          <Action>
            <Button onClick={() => showCustomer(customer.id)}>Open</Button>
          </Action>
        </ListItem>
      );
    });
    return(
      <Stage>
      {
        customers && customers.length > 0 && (
          <ListSection className='hide-scrollbar' id="infinte-list-wrapper">
            <InfiniteList
              initialLoading={initialLoading}
              loading={loading}
              loader={<div class="">Loading...</div>}
              loadMore={onRequestPage}
              hasMore={hasMore}
              setPageSize={setPageSize}
            >
              {items}
            </InfiniteList>
          </ListSection>
        )
      }
      {
        (customers && customers.length) == 0 && (
          <EmptyListMessage text={t("noresult")} styles={{position:"absolute"}} icon="\e90c"/>
        )
      }
      </Stage>
    );
  }
};

export default Customers;
