import * as React from "react";
import styled from "@/lib/styledComponents";
import {
  Button,
  Form,
  Card,
  Segment,
  Grid,
  Header,
  Icon,
  Input,
  Label,
  List,
  Image,
  Modal,
  Divider,
} from 'semantic-ui-react';
import ReactList from 'react-list';

const Stage = styled(Grid)`
  padding-top: 6em!important;
  padding-bottom: 6em!important;
`;
const StageCentered = styled(Grid)`
  max-width: 775px;
  display: block!important;
  margin-right: auto!important;
  margin-left: auto!important;
`;
const CardSection = styled.div`
  padding-top: 2em;
  padding-bottom: 2em;
  width: 50em;
`;
const CardHeader = styled(Header)`
  font-weight: bold;
  text-align: left!important;
`;
const StyledLabel = styled(Label)`
  line-height: 2em!important;
`;
const StyledCard = styled(Card)`
  width: 100%!important;
  border: rgb(242, 242, 242)!important;
  border-style: solid!important;
  border-width: 1px!important;
  box-shadow: rgba(0, 0, 0, 0.0745098) 0px 1px 4px 1px!important;
`;
const FormInput = styled.input`
  border-color: transparent!important;
  padding-left: 0!important;
  width: 100%!important;
`;
const CardInput = styled(Form.Input)`
  border: 0;
  border-bottom-color: rgb(201, 201, 201);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-radius: 0;
  margin-top: 2em!important;
`;
const FormHeader = styled(Header)`
  font-size: 1em!important;
  margin-bottom: 0!important;
  text-align: left!important;
`;
const CardButton = styled(Button)`
  background-color: rgb(155,201,61)!important;
  float: right;
  margin-top: 1em!important;
`;
const ListItem = styled(List.Item)`
  padding: 1.5em!important;
  border-bottom-color: rgba(0, 0, 0, 0.075);
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;
const Avatar = styled.div`
  margin-right: 1em;
`;
const Action  = styled.div`
  padding-top: 0.5em;
`;
const UserNameAndAvatar = styled.div`
  display: flex;
  font-size: 1.3em;
  line-height: 1.4em;
`;

const EmptyListSection = styled.div`
  background: transparent!important;
  display: flex!important;
  flex-direction: column!important;
  align-items: center!important;
  margin-right: auto!important;
  margin-left: auto!important;
  font-size: 2em!important;
  padding-top: 3em!important;
  i {
    margin-right: 0!important;
    margin-top: 1em!important;
    font-size: 3em!important;
  }
  button {
    margin-top: 2em!important;
  }
`;

const LanistaList = ({items, renderButton}) =>
(<StyledCard>
  <List divided verticalAlign='middle'>
    <ReactList
      ref={c => this.list = c}
      itemRenderer={(index, key) => {
        return(
          <ListItem>
            <List.Content floated='right'>
              <Action>
                {renderButton(items[index])}
              </Action>
            </List.Content>
            <UserNameAndAvatar>
              <Avatar>
                <Image
                  avatar
                  src={'https://randomuser.me/api/portraits/' + (items[index].gender == 1 ? 'women' : 'men') + '/' + (index % 100) + '.jpg'}
                  size='massive'
                />
              </Avatar>
              <List.Content style={{lineHight: '2em', textAlign: 'left'}}>
                {items[index].first_name} {items[index].last_name}
                <br/>
                <span style={{color: "rgb(116, 116, 116)", fontSize: '0.9em'}}>{items[index].email}</span>
              </List.Content>
            </UserNameAndAvatar>
          </ListItem>
        );
      }}
      length={items.length}
      type='uniform'
      className='hide-scrollbar'
    />
  </List>
</StyledCard>);

class Folder extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      folderName: null,
    }
  }

  render() {
    const {
      folderName,
      saveData,
      isValid,
      errorMessage,
      dataChanged,
      t,
      editModus,
      items,
      deleteFolder,
      handleCloseModal,
      modalOpen,
      addItemsModus,
      removeItemsModus,
      enteraddItemsModus,
      addCustomerToFolder,
      removeCustomerFromFolder,
    } = this.props;

    return(
      <Stage centered columns={2} padded style={{ marginRight: "auto!important",  marginLeft: "auto!important"}}>
        <StageCentered>
          <Grid.Row columns='equal' equal width style={{paddingTop: 0}}>
            <Grid.Column>
              <Card.Group>
                <CardSection id="section-1">
                  <CardHeader as='h3'>{editModus ? 'Kundenfolder erstellen' : folderName}</CardHeader>
                  {editModus && (<StyledCard>
                    <Card.Content>
                      <Form>
                        <CardInput placeholder='Fildername' error={!isValid}>
                          <FormHeader>Neue Mitgliederverzeichnisname</FormHeader>
                          <FormInput
                            value={folderName}
                            onChange={(event) => dataChanged(event.target.value)}
                          />
                          {
                            !isValid &&
                            <StyledLabel color='red' pointing='left'>
                              {errorMessage}
                            </StyledLabel>
                          }
                        </CardInput>
                        <CardButton
                          primary
                          onClick={saveData}
                          disabled={!(folderName && folderName.length > 0 && isValid)}>{t( "common:save" )}
                        </CardButton>
                      </Form>
                    </Card.Content>
                  </StyledCard>)}
                  {
                    addItemsModus &&
                      <>
                        <Divider horizontal><Icon name='icon-user-new' style={{paddingBottom: "2em", fontSize: "2em", marginTop: "1em"}}/></Divider>
                        <LanistaList
                          items={this.props.itemsToAdd}
                          renderButton={(item) => (
                            <Button onClick={() => {
                              console.log("Add customer to folder");
                              addCustomerToFolder(item.id);
                            }}>Kunde hinzufügen</Button>
                          )}
                        />
                      </>
                  }
                  {
                    removeItemsModus &&
                      <>
                        <Divider horizontal><Icon name='icon-user-remove' style={{paddingBottom: "2em", fontSize: "2em", marginTop: "1em"}}/></Divider>
                        <LanistaList
                          items={items}
                          renderButton={(item) => (
                            <Button onClick={() => {
                              console.log("Remove customer from folder");
                              removeCustomerFromFolder(item.id);
                            }}>Kunde entfernen</Button>
                          )}
                        />
                      </>
                  }
                  {
                    !addItemsModus && !removeItemsModus && items.length > 0 &&
                      <LanistaList
                        items={items}
                        renderButton={() => (
                          <Button onClick={() => {
                            console.log("Open customer");
                          }}>öffnen</Button>
                        )}
                      />
                  }
                  {
                    !addItemsModus && !removeItemsModus && items.length == 0 &&
                    <EmptyListSection>
                      <Icon name='icon-user-new' />
                      Order ist leer.
                      <Button basic color='olive' onClick={enteraddItemsModus}>
                        Kunde hinzufügen
                      </Button>
                    </EmptyListSection>
                  }
                </CardSection>
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </StageCentered>
        <Modal
          basic
          size='small'
          open={modalOpen}
          onClose={handleCloseModal}
        >
        <Header icon='archive' content='Ordner löschen' />
         <Modal.Content>
           <p>
             Willst du den Ordner {folderName} wirklich löschen?
           </p>
         </Modal.Content>
         <Modal.Actions>
           <Button
            basic
            color='red'
            inverted
            onClick={handleCloseModal}
          >
             <Icon name='remove' /> No
           </Button>
           <Button color='green' onClick={deleteFolder} inverted>
             <Icon name='checkmark' /> Yes
           </Button>
         </Modal.Actions>
       </Modal>
      </Stage>
    );
  }
};

export default Folder;
