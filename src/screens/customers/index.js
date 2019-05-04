import React, { Component } from 'react';
import Scene from "../../components/Scene";
import Router from 'next/router';

import Customers from './Customers';
import dataSource from './test_data';
import folders from '../folder/test_data';
import CustomerSearchField from '../../components/CustomerSearchField';

class CustomersWithData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: dataSource,
      processing: false,
      filteredCustomers: dataSource,
      filtering: false,
      folderMenuVisible: false,
      folderMenu: [],
      folders: folders,
      translations: [],
    }
    this.filterList = this.filterList.bind(this);
    this.showFolderMenu = this.showFolderMenu.bind(this);
    this.closeFolderMenu = this.closeFolderMenu.bind(this);
    this.showCustomer = this.showCustomer.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
  }

  componentDidMount() {
    this.onChangeLanguage("de");
  }

  goBack() {
    Router.back();
  }

  showCustomer(index) {
    const {customers} = this.state;
    Router.push({
      pathname: '/customer',
      query: { customer: customers[index].id }
    });
    //history.push("/customer", {customer: customers[index]});
  }

  closeFolderMenu() {
    this.setState({
      folderMenuVisible: false,
      folderMenu: [],
    })
  }

  showFolderMenu() {
    const {folders} = this.state;
    const {history} = this.props;
    const folderMenus = [{
        icon: 'icon-plus',
        text: 'Create new customer folder',
        onClick: () => {
          console.log("Create new folder");
          this.closeFolderMenu();
          history.push("/folder");
        }
    }];
    folders.map(folder => {
      folderMenus.push({
        icon: 'icon-folder',
        text: folder.name,
        onClick: () => {
          console.log("Open folder");
          this.closeFolderMenu();
          history.push("/folder", {folder: folder});
        }
      });
    });

    this.setState({
      folderMenuVisible: true,
      menuDirection: 'right',
      folderMenu: folderMenus,
    })
  }

  filterList(value) {
    const {customers} = this.state;

    this.setState({
      filtering: true
    }, () => {
      this.setState({
        filteredCustomers: customers.filter( customer =>
          customer.first_name.toLowerCase().indexOf(value.toLowerCase()) > -1
          || customer.last_name.toLowerCase().indexOf(value.toLowerCase()) > -1
          || customer.email.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
      }, () => {
        this.setState({filtering: false});
      })
    });
  }

  getCommandsRight() {
    return ([{
          icon: 'icon-user-new',
          text: 'new user',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'new user',
          onTap: () => {
            console.log("create user");
          }
      }, {
          icon: 'icon-folder',
          text: 'folder',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'folder',
          onTap: () => {
            console.log("Folder Options");
            this.showFolderMenu();
          }
      }, {
          icon: 'icon-time-back',
          text: 'last',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'last',
          onTap: () => {
            console.log("Filter by last action");
          }
      }, {
          icon: 'icon-sync',
          text: 'refresh',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'refresh',
          onTap: () => {
            console.log("Refresh list");
          }
      }]);
  }

  getCommandsLeft() {
    return ([{
          //icon: CustomerIcon,
          icon: 'icon-back',
          text: 'Back',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          onTap: () => {
            this.goBack();
          }
      }, {
          //icon: CustomerIcon,
          icon: 'icon-tools-inactive',
          text: 'Setting',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'settings',
          onTap: () => {
            console.log("Command Settings");
          }
      }, {
          //icon: HelpIcon,
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

  t(text) {
    const {translations} = this.state;
    const textWithoutNamespace = text.split(":");
    const translation = translations[textWithoutNamespace[textWithoutNamespace.length-1]];
    return (translation ? translation : text);
  }

  onChangeLanguage( language ) {
    const translations = require('../../../static/locales/' + language + '/dashboard');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];

    this.setState({
      translations: {...translations, ...commonTranslations},
      currentLanguage: language,
      availableLanguages: originalLanguages.filter(word => word !== language)
    });
  }

  render() {
    const {t} = this.props;
    const {
      filteredCustomers,
      processing,
      filtering,
      customers,
      folderMenuVisible,
      closeFolderMenu,
      menuDirection,
      folderMenu,
    } = this.state;
    const languages = [
      { key: 'DE', text: 'Deutsch', value: 'DE' },
      { key: 'ES', text: 'Español', value: 'ES' },
      { key: 'EN', text: 'English', value: 'EN' },
      { key: 'PT', text: 'Português', value: 'PT' },
      { key: 'FR', text: 'Français', value: 'FR' },
      { key: 'RU', text: 'ру́сский', value: 'RU' },
    ]

    return(
      <Scene
        commandsLeft={this.getCommandsLeft()}
        commandsRight={this.getCommandsRight()}
        processing={processing}
        headerChildren={
          <CustomerSearchField onChange={this.filterList}/>
        }
        menuVisible={folderMenuVisible}
        onHideMenu={this.closeFolderMenu}
        menuDirection={menuDirection}
        menu={folderMenu}
        t={this.t}
      >
        <Customers
          t={this.t}
          customers={filteredCustomers}
          filtering={filtering}
          isFilterOn={filteredCustomers.length != customers.length}
          closeFolderMenu={closeFolderMenu}
          showCustomer={this.showCustomer}
        />
      </Scene>
    )
  }
}

export default CustomersWithData;
