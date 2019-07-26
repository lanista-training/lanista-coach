import React, { Component } from 'react';
import Scene from "../../components/Scene";
import Router from 'next/router';
import { Query } from "react-apollo";
import _ from "lodash";
import Customers from './Customers';
import dataSource from './test_data';
import folders from '../folder/test_data';
import CustomerSearchField from '../../components/CustomerSearchField';
import EmptyListMessage from '../../components/EmptyListMessage';
import { MEMBERS, ME } from "../../queries";

class CustomersWithData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      filtering: false,
      folderMenuVisible: false,
      folderMenu: [],
      folders: folders,
      translations: [],
      filter: '',
    }
    this.showFolderMenu = this.showFolderMenu.bind(this);
    this.closeFolderMenu = this.closeFolderMenu.bind(this);
    this.showCustomer = this.showCustomer.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onFetchMembers = this.onFetchMembers.bind(this);
  }

  componentDidMount() {
    this.onChangeLanguage("de");
  }

  goBack() {
    Router.back();
  }

  showCustomer(customerId) {
    Router.push({
      pathname: '/customer',
      query: { customer: customerId }
    });
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
          this.closeFolderMenu();
          history.push("/folder");
        }
    }];
    folders.map(folder => {
      folderMenus.push({
        icon: 'icon-folder',
        text: folder.name,
        onClick: () => {
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
    const translations = require('../../../static/locales/' + language + '/customers');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];

    this.setState({
      translations: {...translations, ...commonTranslations},
      currentLanguage: language,
      availableLanguages: originalLanguages.filter(word => word !== language)
    });
  }

  onFetchMembers(fetchMore, data) {
    const {filter, pageSize, initialLoading} = this.state
    const previousCursor = initialLoading ? "0" : data.members.cursor;

    fetchMore({
      variables: {
        after: previousCursor,
        pageSize: pageSize,
        filter: filter,
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if( initialLoading ) {
          this.setState({initialLoading: false})
        }
        if (!fetchMoreResult) {
          console.log( 'No result')
          this.setState({
            hasMore: false
          })
          return prev;
        } else {
          console.log( 'Cursor ' + fetchMoreResult.members.cursor)
          this.setState({
            hasMore: fetchMoreResult.members.hasMore
          })
          console.log( 'previousCursor ' + previousCursor)
          if( previousCursor == 0) {
            return {
              ...fetchMoreResult,
              members: {
                ...fetchMoreResult.members,
                members: fetchMoreResult.members.members,
              },
            };
          } else {
            return {
              ...fetchMoreResult,
              members: {
                ...fetchMoreResult.members,
                members: _.unionBy(prev.members.members, fetchMoreResult.members.members, value => value.id),
              },
            };
          }
        }
      },
    })
  }

  render() {
    const {t} = this.props;
    const {
      processing,
      filtering,
      folderMenuVisible,
      closeFolderMenu,
      menuDirection,
      folderMenu,
      filter,
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
      <Query query={ME}>
        {({ loading: loadingOne, data: { me } }) => (
          <Query
            notifyOnNetworkStatusChange
            fetchPolicy="cache-and-network"
            query={MEMBERS}
            variables={{
              pageSize: 20,
              after: "0",
            }}
            onCompleted={ (data) => {
              this.setState({
                initialLoading: false,
              })
            }}
          >
            {({ data, loading, error, fetchMore }) => {
              const hasMore = data && data.members ? data.members.hasMore : true
              const result = (data && data.members) ? data.members : {members: []}
              console.log("filter")
              console.log(me)
              console.log(me && me.bu > 0)
              console.log(filter)
              console.log(filter.trim().length === 0)
              return (
                <Scene
                  commandsLeft={this.getCommandsLeft()}
                  commandsRight={this.getCommandsRight()}
                  processing={processing}
                  headerChildren={
                    <>
                      <CustomerSearchField onChange={(text) => {
                        if( text.length > 1 ) {
                          this.setState({
                            filter: text.trim(),
                            initialLoading: true,
                          }, () => {
                            this.onFetchMembers(fetchMore, data);
                          });
                        } else {
                          this.setState({
                            filter: '',
                            initialLoading: true,
                          })
                        }
                      }}/>
                  </>
                  }
                  menuVisible={folderMenuVisible}
                  onHideMenu={this.closeFolderMenu}
                  menuDirection={menuDirection}
                  menu={folderMenu}
                  t={this.t}
                >
                  {
                    ( (me && me.bu === 0) || (filter && filter.trim().length > 1) ) &&
                    <Customers
                      t={this.t}
                      customers={result.members}
                      filtering={filtering}
                      isFilterOn={data ? (data.length != data.length) : false}
                      closeFolderMenu={closeFolderMenu}
                      showCustomer={this.showCustomer}
                      onRequestPage={(page) => this.onFetchMembers(fetchMore, data, page)}
                      loading={loading}
                      error={error}
                      hasMore={hasMore}
                      setPageSize={(newPageSize) => this.setState({pageSize: newPageSize})}
                    />
                  }
                  {
                    ( me && me.bu > 0 && filter.trim().length === 0 ) &&
                    <EmptyListMessage text={this.t("emptylist")} icon="\e90d"/>
                  }
                </Scene>
              );
            }}
          </Query>
        )}
      </Query>
    )
  }
}

export default CustomersWithData;
