import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Image,
  List,
  Dimmer,
  Loader,
  Sidebar,
  Menu,
} from 'semantic-ui-react';
import {
  Stage,
  ListItem,
  UserNameAndAvatar,
  Action,
  ListSection,
  StyledDialog,
} from './styles'
import InfiniteList from '../../components/InfiniteList';
import EmptyListMessage from '../../components/EmptyListMessage';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Button as DialogButton} from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const Customers = ({
  customers,
  filtering,
  isFilterOn,
  showCustomer,
  t,
  onRequestPage,
  hasMore,
  initialLoading,
  loading,
  showLoading,
  setPageSize,
  filter,
  folderMode,
  onRemoveMemberFromFolder,
  onAddMemberToFolder,
  createFolderDialogOpen,
  createFolderDialogHandleClose,

  onCreateFolder,
  createFolderLoading,
}) => {
  const [folderName, setFolderName] = React.useState("");

  var items = [];
  customers.map((customer, i) => {
    items.push(
      <ListItem key={i} onClick={folderMode > 0 ? null : () => showCustomer(customer.id)}>
        <div style={{
          width: '14em',
          height: '13em',
          backgroundColor: '#fafafa',
          webkitBoxSizing: 'border-box',
          boxSizing: 'border-box',
          display: 'block',
          webkitBoxFlex: '0',
          webkitFlex: '0 0 auto',
          msFlex: '0 0 auto',
          flex: '0 0 auto',
          overflow: 'hidden',
          position: 'relative',
          backgroundImage: 'url(' + customer.photoUrl + ')',
          backgroundSize: "cover",
        }}>
        </div>
        <div style={{ padding: "1em 0"}}>
          <div className="last-name">{customer.last_name}</div>
          <div className="first-name">{customer.first_name}</div>
          <div className="email">{customer.email}</div>
        </div>
        {folderMode == 2 &&
          <Button
            icon='remove circle'
            content='Entfernen'
            onClick={() => onRemoveMemberFromFolder(customer.id)}
          />
        }
        {folderMode == 1 &&
          <Button
            icon='add circle'
            content='Hinzufügen'
            onClick={() => onAddMemberToFolder(customer.id)}
          />
        }
      </ListItem>
    );
  });

  return(
    <Stage>

      <ListSection className='hide-scrollbar' id="infinte-list-wrapper">
        <InfiniteList
          initialLoading={initialLoading}
          loading={loading}
          loader={<div className=""></div>}
          loadMore={onRequestPage}
          hasMore={hasMore}
          setPageSize={setPageSize}
        >
          {items}
        </InfiniteList>
      </ListSection>

      { createFolderDialogOpen &&
        <StyledDialog
          open={createFolderDialogOpen}
          onClose={createFolderDialogHandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t("create_folder")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("create_folder_dialog_text")}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              <TextField
                id="folder-name"
                variant="outlined"
                value={folderName}
                onChange={e => setFolderName(e.target.value)}
                autoFocus={true}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className="dialog-button">
              <Button onClick={createFolderDialogHandleClose} color="primary">
                {t("create_folder_cancel")}
              </Button>
            </div>
            <div className="dialog-button">
              <Button
                onClick={() =>
                {
                  onCreateFolder(folderName);
                  createFolderDialogHandleClose();
                }}
                disabled={folderName.length === 0}
                color="primary" autoFocus>
                {t("create_folder_ok")}
              </Button>
              {createFolderLoading && <CircularProgress size={24} />}
            </div>
          </DialogActions>
        </StyledDialog>
      }
    </Stage>
  );
};

Customers.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * Array with the current hit list
  */
  customers: PropTypes.array,

  /**
   * Graphql flag for list loading
  */
  filtering: PropTypes.bool,

  /**
   * Flag to show the switch in the upper right cornder
  */
  isFilterOn: PropTypes.bool,

  /**
   * Navigate to the customer screen
  */
  showCustomer: PropTypes.func,

  /**
   * Function load the next page on the list
  */
  onRequestPage: PropTypes.func,

  /**
   * Flag to show that end of the results list is sitll not reached
  */
  hasMore: PropTypes.bool,

  /**
   * Graphql flag to signalize that the first page is been loaded
  */
  initialLoading: PropTypes.bool,

  /**
   * Graphql loading flag for the customers list
  */
  loading: PropTypes.bool,

  /**
   * A flag to show or hide the loading component
  */
  showLoading: PropTypes.func,

  /**
   * Configuraiton of the list, this number need to be calculated and passed to the infinity list
  */
  setPageSize: PropTypes.func,

  /**
   * The value of the search field on the header
  */
  filter: PropTypes.string,

  /**
   * If null = no folder selected
   * If 1 = Show list to add customers to a folder
  * If 0 = Show list to remove customers form a folder
  */
  folderMode: PropTypes.number,

  /**
   * Call to remove one customer from the selected folder
  */
  onRemoveMemberFromFolder: PropTypes.func,

  /**
   * Call to add a customer to the selected folder
  */
  onAddMemberToFolder: PropTypes.func,

  /**
   * Flag to show or hide the create folder panel
  */
  createFolderDialogOpen: PropTypes.func,

  /**
   * Call to close the create folder panel
  */
  createFolderDialogHandleClose: PropTypes.func,

  /**
   * Create a folder on the graphql server
  */
  onCreateFolder: PropTypes.func,

  /**
   * Graphql flag when creating a folder on the server
  */
  createFolderLoading: PropTypes.bool,
};

export default Customers;
