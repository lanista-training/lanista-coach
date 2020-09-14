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
          height: '14em',
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
   * Function to translate content
  */
  customers: PropTypes.array,

  /**
   * Function to translate content
  */
  filtering: PropTypes.bool,

  /**
   * Function to translate content
  */
  isFilterOn: PropTypes.bool,

  /**
   * Function to translate content
  */
  showCustomer: PropTypes.func,

  /**
   * Function to translate content
  */
  onRequestPage: PropTypes.func,

  /**
   * Function to translate content
  */
  hasMore: PropTypes.bool,

  /**
   * Function to translate content
  */
  initialLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  loading: PropTypes.bool,

  /**
   * Function to translate content
  */
  showLoading: PropTypes.func,

  /**
   * Function to translate content
  */
  setPageSize: PropTypes.func,

  /**
   * Function to translate content
  */
  filter: PropTypes.string,

  /**
   * Function to translate content
  */
  folderMode: PropTypes.number,

  /**
   * Function to translate content
  */
  onRemoveMemberFromFolder: PropTypes.func,

  /**
   * Function to translate content
  */
  onAddMemberToFolder: PropTypes.func,

  /**
   * Function to translate content
  */
  createFolderDialogOpen: PropTypes.func,

  /**
   * Function to translate content
  */
  createFolderDialogHandleClose: PropTypes.func,

  /**
   * Function to translate content
  */
  onCreateFolder: PropTypes.func,

  /**
   * Function to translate content
  */
  createFolderLoading: PropTypes.bool,
};

export default Customers;
