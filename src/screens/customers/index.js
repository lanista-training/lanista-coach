import React, { Component, useState, useEffect } from 'react';
import { useTranslate } from '../../hooks/Translation';
import Scene from "../../components/Scene";
//import { useRouter } from 'next/router';
import withData from "./DataProvider";
import _ from "lodash";
import Customers from './Customers';
import dataSource from './test_data';
import CustomerSearchField from '../../components/CustomerSearchField';
import EmptyListMessage from '../../components/EmptyListMessage';
import HeaderSwitch from './HeaderSwitch';
import CreateCustomerDialog from './CreateCustomerDialog';
import {
  StyledDrawer,
  StageHeader,
  StyledDialog,
  Loading,
} from "./styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import TextField from '@material-ui/core/TextField';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import Help from '../../components/icons/Help';
import Tools from '../../components/icons/Tools';
import Back from '../../components/icons/Back';
import Folder from '../../components/icons/Folder';
import CreateUser from '../../components/icons/CreateUser';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import useDebounce from '../../hooks/use-debounce';

const Panel = ({
  workoutId,

  memberFolders,
  memberFoldersLoading,
  memberFoldersError,

  membersData,
  membersError,
  membersLoading,
  fetchMore,

  clonePlan,
  clonePlanLoading,
  clonePlanError,

  meData,
  meLoading,
  meError,

  pageSize,
  setPageSize,

  showLastMembers,
  setShowLastMembers,

  selectedFolderId,
  setSelectedFolderId,
  folderMode,
  setFolderMode,
  deleteMemberFromFolder,
  addMemberToFolder,

  createFolder,
  createFolderLoading,
  createFolderError,
  createdFolder,
  setCreatedFolder,

  deleteFolder,
  deleteFolderLoading,
  deleteFolderError,
  deletedFolder,
  setDeletedFolder,

  filter,
  setFilter,

  networkStatus,

  goBack,
  goToCustomer,
  goToSetup,

}) => {
  const {t} = useTranslate("customers");
console.log("goToSetup", goToSetup)
  const [hidden , setHidden] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);


  //
  // Folder management
  //
  const [folderDrawerOpen, setFolderDrawerOpen] = React.useState(false);
  const toggleFolderDrawer = () => {
    setFolderMode(0);
    setFolderDrawerOpen(!folderDrawerOpen);
  }
  //
  //

  //
  // create folder dialog
  //
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = React.useState(false);
  const toggleCreateFolderDialogOpen = () => {
    setCreateFolderDialogOpen(!createFolderDialogOpen);
  };

  //
  // Clone plan
  //
  React.useEffect(() => {
    if( selectedCustomerId > 0 ) {
      clonePlan({
        variables: {
          memberId: selectedCustomerId,
          planId: workoutId,
        }
      })
    }
  }, [selectedCustomerId]);

  React.useEffect(() => {
    if( !clonePlanLoading) {
      if( selectedCustomerId > 0 ) {
        localStorage.setItem('pending_user_id', selectedCustomerId);
        goBack();
        goBack();
        goBack();
      }
    }
  }, [clonePlanLoading]);


  //
  // Search logic
  //
  const debouncedFilter = useDebounce(filter, 500);
  useEffect(() => {
    if( debouncedFilter ) {
      setInitialLoading(true);
    }
  }, [debouncedFilter]);
  useEffect(() => {
    if( initialLoading ) {
      if( filter.length > 2 ) onFetchMembers();
      else if( filter.length == 0 ) onFetchMembers();
      setInitialLoading(false);
    }
  }, [debouncedFilter, initialLoading]);


  useEffect(() => {
    setInitialLoading(true);
    onFetchMembers();
  }, [showLastMembers]);

  const onToggleShowLastMembers = () => {
    setFilter('')
    if( showLastMembers ) {
      setShowLastMembers(false)
    } else {
      setShowLastMembers(true)
    }
  }

  const getCommandsRight = () => {
    let commands = [];
    if(selectedFolderId === null) {
      commands.push({
        icon: <Folder/>,
        iosname: 'tools-inactive',
        text: t("FOLDER"),
        type: 'type-1',
        typex: 'Ionicons',
        name: 'back',
        onTap: () => {
          toggleFolderDrawer();
        },
      });
      commands.push({
        icon: <CreateUser/>,
        iosname: 'tools-inactive',
        text: t("CREATE_CUSTOMER"),
        type: 'type-1',
        typex: 'Ionicons',
        name: 'create-user',
        onTap: handleCreateCustomerDialogOpen,
      });
    } else {
      if( folderMode > 0 ) {
        commands.push({
          icon: <CheckCircleOutlineIcon/>,
          text: t("EXIT_EDIT_MODE"),
          type: 'type-1',
          name: 'add-user',
          style: {color: '#34acfb'},
          onTap: () => {
            setFolderMode(null);
          }
        });
      } else {
        commands.push({
          icon: <AddCircleOutlineIcon/>,
          text: t("ADD_USER"),
          type: 'type-1',
          name: 'add-user',
          style: {color: '#34acfb'},
          onTap: () => {
            setFolderMode(1);
          }
        });
        commands.push({
          icon: <RemoveCircleOutlineIcon/>,
          text: t("REMOVE_USER"),
          type: 'type-1',
          name: 'remove-user',
          style: {color: '#34acfb'},
          onTap: () => {
            setFolderMode(2);
          }
        });
      }
      commands.push({
        icon: <DeleteOutlineIcon/>,
        text: t("delete_folder"),
        type: 'type-1',
        typex: 'Ionicons',
        name: 'delete folder',
        style: {color: '#34acfb'},
        onTap: () => {
          console.log("Remove folder");
          console.log(selectedFolderId);
          toggleDeleteFolderDialogOpen();
        }
      });
    }
    return commands;
  }

  const getCommandsLeft = () => {

    return ([{
        icon: <Back/>,
        iosname: 'tools-inactive',
        text: '',
        type: 'type-1',
        typex: 'Ionicons',
        name: 'back',
        style: {color: '#34acfb'},
        onTap: () => {
          if(selectedFolderId > 0) {
            onFolderSelection(null);
            setFolderMode(0);
          } else {
            goBack();
          }
        }
    }]);
  }

  const showCustomer = (customerId) => {
    setHidden(true)
    if( workoutId && workoutId > 0 ) {
      setSelectedCustomerId(customerId);
    } else {
      goToCustomer(customerId);
      /*
      router.push({
        pathname: '/customer',
        query: { customer: customerId }
      });
      */
    }
  }

  const onFetchMembers = () => {
    if( !showLastMembers && filter.trim() === '' )  {
      return true;
    }
    const previousCursor = initialLoading ? "0" : (membersData && membersData.members ? membersData.members.cursor : "0");
    if( previousCursor > 0 && previousCursor < pageSize ) return false;
    fetchMore({
      variables: {
        after: previousCursor,
        pageSize: pageSize,
        filter: (filter && filter.length) > 2 ? filter : null,
        last: showLastMembers,
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if( initialLoading ) {
          setInitialLoading(false)
        }
        if (!fetchMoreResult) {
          return prev;
        } else {
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
  };

  const hasMore = membersData && membersData.members ? membersData.members.hasMore : true;
  const result = (membersData && membersData.members) ? membersData.members : {members: []};
  const {me} = meData ? meData : {};

  //
  // delete folder dialog
  //
  const [deleteFolderDialogOpen, setDeleteFolderDialogOpen] = React.useState(false);
  const toggleDeleteFolderDialogOpen = () => {
    setDeleteFolderDialogOpen(!deleteFolderDialogOpen);
  };

  //
  // create customer dialog
  //
  const [createCustomerDialogOpen, setCreateCustomerDialogOpen] = React.useState(false);
  const handleCreateCustomerDialogOpen = () => {
    setCreateCustomerDialogOpen(true);
  };
  const handleCreateCustomerDialogClose = () => {
    setCreateCustomerDialogOpen(false);
  };

  //
  // folder management
  //
  const folder = (memberFolders && selectedFolderId > 0) ? memberFolders.find(folder => selectedFolderId == folder.id) : null;
  const onFolderSelection = (folderId) => {
    setSelectedFolderId(folderId);
  };

  const onRemoveMemberFromFolder = (memberId) => {
    deleteMemberFromFolder({
      variables: {
        memberId: memberId,
        folderId: selectedFolderId,
      }
    });
  }

  const onAddMemberToFolder = (memberId) => {
    addMemberToFolder({
      variables: {
        memberId: memberId,
        folderId: selectedFolderId,
      }
    });
  }

  const onCreateFolder = (folderName) => {
    createFolder({
      variables: {
        folderName: folderName,
        folderType: 0,
      }
    })
  };

  const onDeleteFolder = () => {
    deleteFolder({
      variables: {
        folderId: selectedFolderId,
      }
    });
  }

  React.useEffect(() => {
    if( !memberFoldersLoading && createdFolder > 0 ) {
      setCreatedFolder(null);
      onFolderSelection(createdFolder);
    } else if( !memberFoldersLoading && deletedFolder > 0 ) {
      setDeletedFolder(null);
      toggleDeleteFolderDialogOpen();
      onFolderSelection(null);
      setFolderMode(0);
    }
  }, [memberFolders]);

  //
  // Licence exired handling
  //
  const [showLicenceExpiredWarning, setShowLicenceExpiredWarning] = useState(false);
  const toggleLicenceExpiredWarning = () => setShowLicenceExpiredWarning(!showLicenceExpiredWarning);
  useEffect(() => {
    if( clonePlanError && clonePlanError.message.indexOf('LICENCEINVALID') > -1 ) {
      toggleLicenceExpiredWarning();
    } else  if( createFolderError && createFolderError.message.indexOf('LICENCEINVALID') > -1 ) {
      toggleLicenceExpiredWarning();
    } else {
      setShowLicenceExpiredWarning(false);
    }
  }, [clonePlanError, createFolderError]);

  return (
    <Scene
      commandsLeft={getCommandsLeft()}
      commandsRight={getCommandsRight()}
      processing={membersLoading}
      headerChildren={
        <StageHeader>
          <div className="folder-name">{folder && folder.name}</div>
          <CustomerSearchField value={filter} onChange={(text) => {
            setFilter(text)
          }}/>
          {!(selectedFolderId > 0) &&
            <HeaderSwitch
              onChange={onToggleShowLastMembers}
              checked={showLastMembers}
              t={t}
            />
          }
        </StageHeader>
      }
      renderLogo={selectedFolderId > 0 ? () => <FolderIcon className="folder-logo"/> : null}
      mode={selectedFolderId > 0 ? 'folder' : null}
      t={t}
      networkStatus={networkStatus}
      showLicenceExpiredWarning={showLicenceExpiredWarning}
      onCloseLicenceExpiredWarning={toggleLicenceExpiredWarning}
      goToSetup={goToSetup}
    >
      { (initialLoading || membersLoading ) &&
        <Loading>
          <CircularProgress size={100}/>
        </Loading>
      }
      {
        (
          result &&
          result.members &&
          result.members.length > 0 &&
          ( showLastMembers || filter.trim() !== '' || selectedFolderId > 0) &&
          !hidden
        ) &&
        <Customers
          t={t}
          customers={result.members}
          isFilterOn={membersData ? (membersData.length != membersData.length) : false}
          showCustomer={showCustomer}
          onRequestPage={(page) => onFetchMembers()}
          loading={membersLoading}
          showLoading={initialLoading && membersLoading}
          error={membersError}
          hasMore={hasMore}
          setPageSize={(newPageSize) => setPageSize(newPageSize)}
          showLastMembers={showLastMembers}
          filter={filter}
          folderMode={folderMode}
          onAddMemberToFolder={onAddMemberToFolder}
          onRemoveMemberFromFolder={onRemoveMemberFromFolder}

          createFolderDialogOpen={createFolderDialogOpen}
          createFolderDialogHandleClose={toggleCreateFolderDialogOpen}

          onCreateFolder={onCreateFolder}
          createFolderLoading={createFolderLoading}
        />
      }
      {
        ( (!membersLoading && result  &&
          result.members &&
          result.members.length == 0) ||
          ( !membersLoading && !showLastMembers && filter.trim() == '' && selectedFolderId === null)
        ) &&
        <EmptyListMessage text={t("emptylist")} icon="\e90d"/>
      }
        <StyledDrawer
          anchor="right"
          open={folderDrawerOpen}
          onClose={() => toggleFolderDrawer()}
        >
          <div
            role="presentation"
            onClick={() => toggleFolderDrawer()}
            onKeyDown={() => toggleFolderDrawer()}
          >
            <List>
              <div key={'folder-create'} className="list-item-wrapper">
                <ListItem button onClick={toggleCreateFolderDialogOpen}>
                  <ListItemIcon>
                    <CreateNewFolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("create_folder")}/>
                </ListItem>
              </div>
              {
                memberFolders && memberFolders.map(folder => (
                  <div key={'folder-' + folder.id} className="list-item-wrapper">
                    <ListItem button key="new-plan" onClick={() => onFolderSelection(folder.id)}>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText primary={folder.name + ' [' + folder.size + ']'}/>
                    </ListItem>
                  </div>
                ))
              }
            </List>
          </div>
        </StyledDrawer>

      { deleteFolderDialogOpen &&
        <StyledDialog
          open={deleteFolderDialogOpen}
          onClose={toggleDeleteFolderDialogOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t("delete_folder")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("delete_folder_dialog_text")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className="dialog-button">
              <Button onClick={toggleDeleteFolderDialogOpen} color="primary">
                {t("delete_folder_cancel")}
              </Button>
            </div>
            <div className="dialog-button">
              <Button
                onClick={() =>
                {
                  onDeleteFolder();
                }}
                color="primary" autoFocus>
                {t("delete_folder_ok")}
              </Button>
              {deleteFolderLoading && <CircularProgress size={24} />}
            </div>
          </DialogActions>
        </StyledDialog>
      }
      { createCustomerDialogOpen &&
        <CreateCustomerDialog
          t={t}
          open={createCustomerDialogOpen}
          onClose={handleCreateCustomerDialogClose}
          showCustomer={showCustomer}

          toggleLicenceExpiredWarning={toggleLicenceExpiredWarning}
        />
      }
    </Scene>
  )
}

const PanelWithData = ({workoutId, goBack, goToCustomer, goToSetup}) => {
  console.log("PanelWithData", goToSetup)
  const CustomersData = withData(Panel, {workoutId, goBack, goToCustomer, goToSetup});
  return <CustomersData/>
}

export default PanelWithData;
