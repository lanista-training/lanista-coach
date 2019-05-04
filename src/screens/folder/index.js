import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from "react-router";
import { translate } from 'react-i18next';
import Scene from "../../components/Scene";
import Folder from './Folder';
import folders from '../folder/test_data';
import customers from '../customers/test_data';
import CustomerSearchField from '../../components/CustomerSearchField';

@translate(['common', 'setup'], { wait: true })
class CreateFolderWithData extends Component {

  constructor(props) {
    super(props);
    const ids = props.location.state ? props.location.state.folder.customers.map( item => parseInt(item.id)) : [];

    const filteredItems = customers.filter( item => {
      const searchFor = parseInt(item.id);
      const result = ids.indexOf(searchFor);
      return (result == -1);
    });
    this.state = {
      processing: false,
      folderName: null,
      isValid: true,
      errorMessage: null,
      editModus: false,
      folder: (props.location.state ? props.location.state.folder : null),
      modalOpen: false,
      addItemsModus: false,
      removeItemsModus: false,
      itemsToAdd: filteredItems,
      filter: null,
    };
    this.goBack = this.goBack.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.saveData = this.saveData.bind(this);
    this.deleteFolder = this.deleteFolder.bind(this);
    this.addCustomerToFolder = this.addCustomerToFolder.bind(this);
    this.removeCustomerFromFolder = this.removeCustomerFromFolder.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.enteraddItemsModus.setFilter = this.enteraddItemsModus.bind(this);
    this.exitaddItemsModus.setFilter = this.exitaddItemsModus.bind(this);
  };

  goBack() {
    this.props.history.goBack();
  }

  handleOpenModal = () => this.setState({ modalOpen: true });
  handleCloseModal = () => this.setState({ modalOpen: false });

  enteraddItemsModus = () => this.setState({ addItemsModus: true, filter: '', });
  exitaddItemsModus = () => this.setState({ addItemsModus: false, filter: '', });

  enterRemoveItemsModus = () => this.setState({ removeItemsModus: true });
  exitRemoveItemsModus = () => this.setState({ removeItemsModus: false });

  setFilter = (text) => {
    this.setState({
      filter: text
    });
  }

  addCustomerToFolder(customerId) {
    const{folder, itemsToAdd} = this.state;
    const filteredItems = itemsToAdd.filter( item => {
      if( item.id == customerId ) {
        folder.customers.push(item);
        return false;
      } else {
        return true;
      }
    })

    this.setState({
      itemsToAdd: filteredItems,
    })
  }

  removeCustomerFromFolder(customerId) {
    const{ folder } = this.state;
    const newCustomersInFolder = folder.customers.filter( item => {
      return item.id != customerId
    })
    this.setState({
      folder: {...folder, customers: newCustomersInFolder}
    });
    folder.customers = newCustomersInFolder;
  }

  getCommandsRight() {
    let result = [];
    const {folder, addItemsModus, removeItemsModus} = this.state;
    if( addItemsModus || removeItemsModus ) return [];
    if( folder && folder.customers.length > 0 ) {
      result.push({
            icon: 'icon-user-new',
            text: 'create user',
            type: 'type-1',
            typex: 'Ionicons',
            name: 'create user',
            onTap: this.enteraddItemsModus,
        }, {
            icon: 'icon-user-remove',
            text: 'remove user',
            type: 'type-1',
            typex: 'Ionicons',
            name: 'remove user',
            onTap: this.enterRemoveItemsModus,
        });
    }
    result.push({
        icon: 'icon-remove',
        text: 'remove',
        type: 'type-1',
        typex: 'Ionicons',
        name: 'remove',
        onTap: this.handleOpenModal,
    });
    return result;
  }

  getCommandsLeft() {
    const {addItemsModus, removeItemsModus} = this.state;

    return ([{
          icon: 'icon-back',
          text: 'Back',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          onTap: () => {
            if( addItemsModus ) {
              this.exitaddItemsModus();
            } else if( removeItemsModus ) {
              this.exitRemoveItemsModus();
            } else {
              this.goBack();
            }
          }
      }, {
          icon: 'icon-tools-inactive',
          text: 'Setting',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'settings',
          onTap: () => {
            console.log("Command Settings");
          }
      }, {
          icon: 'icon-help-inactive',
          text: 'Help',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'help-circle',
          onTap: () => {
            console.log("Command Help");
          }
      }]);
  }

  saveData( name ) {
    console.log( "folder name" );
    console.log( this.state.folderName );
  }

  dataChanged( name ) {
    this.setState({
      folderName: name,
    });
  }

  deleteFolder() {
    const {folder} = this.props;
    this.handleCloseModal();
  }

  render() {
    const {t, i18n} = this.props;
    const {
      processing,
      isValid,
      errorMessage,
      editModus,
      folder,
      modalOpen,
      addItemsModus,
      removeItemsModus,
      itemsToAdd,
      filter,
     } = this.state;

    return(
      <Scene
        commandsLeft={this.getCommandsLeft()}
        commandsRight={this.getCommandsRight()}
        processing={processing}
        headerChildren={
          <CustomerSearchField onChange={this.setFilter}/>
        }
      >
        <Folder
          t={t}
          saveData={this.saveData}
          dataChanged={this.dataChanged}
          folderName={folder && folder.name}
          isValid={isValid}
          errorMessage={errorMessage}
          editModus={(editModus || !(folder && folder.id > 0))}
          items={folder ? folder.customers : []}
          deleteFolder={this.deleteFolder}
          modalOpen={modalOpen}
          handleCloseModal={this.handleCloseModal}
          addItemsModus={addItemsModus}
          removeItemsModus={removeItemsModus}
          enteraddItemsModus={this.enteraddItemsModus}
          itemsToAdd={itemsToAdd.filter((item) => item.first_name.indexOf(filter) > -1)}
          addCustomerToFolder={this.addCustomerToFolder}
          removeCustomerFromFolder={this.removeCustomerFromFolder}
        />
      </Scene>
    )
  }
}

export default withRouter(CreateFolderWithData);
