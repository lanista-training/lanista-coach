import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import moment from "moment";
import { useRouter } from 'next/router';
import { MEMBERS, ME, MEMBER, MEMBERFOLDERS } from "../../queries";
import { CLONEPLAN, ADDMEMBERTOFOLDER, DELETEMEMBERFROMFOLDER, CREATEFOLDER, DELETEFOLDER, CHANGEFOLDERNAME } from "../../mutations";

const SELECTED_FOLDER_ID = gql`
  {
    selectedFolderId @client
  }
`;

const SEARCH_FILTER = gql`
  {
    filter @client
  }
`;

const SHOW_LAST_MEMBERS = gql`
  {
    showLastMembers @client
  }
`;

const WithData = (WrappedComponent, {workoutId, goBack, goToCustomer, goToSetup}) => {

  const [pageSize, setPageSize] = useState(20);

  const DataProvider = () => {


    const router = useRouter()

    /*
    const { data: filterData, client: filterClient } = useQuery(SEARCH_FILTER);
    const {filter} = (filterData && filterData.filter && filterData.filter.length > 0) ? filterData : {filter: ''};
    const setFilter = (searchText) => {
      client.writeData({ data: {filter: searchText ? searchText : ''} })
    };
    */
    /*
    const filterStoredValue = localStorage.getItem('filter');
    const [filter, setFilter] = useState(filterStoredValue ? filterStoredValue : '');
    useEffect(() => {
      console.log('filter change', filter)
      filter && localStorage.setItem('filter', filter);
    }, [filter]);
    */
    const [filter, setFilter] = useState('');

    //
    // Filter local storage
    //
    const { data: showLastMembersData, client } = useQuery(SHOW_LAST_MEMBERS);
    const {showLastMembers} = (showLastMembersData && showLastMembersData.showLastMembers) ? showLastMembersData : {showLastMembers: false};
    const setShowLastMembers = (flag) => {
      client.writeData({ data: {showLastMembers: flag} })
    };

    //
    // FolderId management
    //
    const { data: selectedFolderIdData } = useQuery(SELECTED_FOLDER_ID);
    const {selectedFolderId} = selectedFolderIdData && selectedFolderIdData.selectedFolderId ? selectedFolderIdData : {selectedFolderId: null};
    const setSelectedFolderId = (id) => client.writeData({ data: {selectedFolderId: id} });
    const [folderMode, setFolderMode] = React.useState(null);

    const {
      data: memberFoldersData,
      loading: memberFoldersLoading,
      error: memberFoldersError,
      refetch: refetchFolders
    } = useQuery(MEMBERFOLDERS);
    const {memberFolders} = memberFoldersData ? memberFoldersData : {memberFolders: []};

    const [initialFilter, setInitialFilter] = useState('');
    const {
      loading: membersLoading,
      error: membersError,
      data: membersData,
      fetchMore,
      refetch,
      networkStatus,
    } = useQuery(MEMBERS, {
      variables: {
        pageSize: pageSize,
        after: "0",
        last: selectedFolderId > 0 ? false : showLastMembers,
        folderId: parseInt(selectedFolderId),
        substractFolderMembers: folderMode == 1,
        filter: initialFilter
      },
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
    });
    useEffect(() => {
      setInitialFilter(filter);
    }, []);

    const [clonePlan, {
      loading: clonePlanLoading,
      error: clonePlanError
    }] = useMutation(
      CLONEPLAN,
      {
        update(cache,  { data: {clonePlan} }) {
          const {id} = clonePlan;
          if( id > 0 ) {
            localStorage.setItem('openplan', id);
          }
        }
      }
    );

    const [addMemberToFolder, {
      loading: addMemberToFolderPlanLoading,
      error: addMemberToFolderError
    }] = useMutation(
      ADDMEMBERTOFOLDER,
      {
        update(cache,  { data: {addMemberToFolder} }) {
          if(addMemberToFolder.id > 0) {
            refetch();
            refetchFolders();
          }
        }
      }
    );

    const [deleteMemberFromFolder, {
      loading: deleteMemberFromFolderPlanLoading,
      error: deleteMemberFromFolderError
    }] = useMutation(
      DELETEMEMBERFROMFOLDER,
      {
        update(cache,  { data: {deleteMemberFromFolder} }) {
          if(deleteMemberFromFolder.id > 0) {
            refetch();
            refetchFolders();
          }
        }
      }
    );

    const [createdFolder, setCreatedFolder] = React.useState(null);
    const [createFolder, {
      loading: createFolderLoading,
      error: createFolderError
    }] = useMutation(
      CREATEFOLDER,
      {
        update(cache,  { data: {createFolder} }) {
          if(createFolder.id > 0) {
            setCreatedFolder(createFolder.id);
            refetchFolders();
          }
        }
      }
    );

    const [deletedFolder, setDeletedFolder] = React.useState(null);
    const [deleteFolder, {
      loading: deleteFolderLoading,
      error: deleteFolderError
    }] = useMutation(
      DELETEFOLDER,
      {
        update(cache,  { data: {deleteFolder} }) {
          if(deleteFolder.id > 0) {
            setDeletedFolder(deleteFolder.id);
            refetchFolders();
          }
        }
      }
    );

    const [folderNameChanged, setFolderNameChanged] = React.useState(false);
    const [changeFolderName, {
      loading: changeFolderNameLoading,
      error: changeFolderNameError
    }] = useMutation(
      CHANGEFOLDERNAME,
      {
        update(cache,  { data: {changeFolderName} }) {
          if(changeFolderName.id > 0) {
            setFolderNameChanged(true);
            refetchFolders();
          }
        }
      }
    );
    const onCloseFolderNameChangeDialog = () => {
      setFolderNameChanged(false);
    }

    const {
      loading: meLoading,
      error: meError,
      data: meData,
    } = useQuery(ME);

    return(
      <WrappedComponent
        workoutId={workoutId}

        memberFolders={memberFolders}
        memberFoldersLoading={memberFoldersLoading}
        memberFoldersError={memberFoldersError}

        membersData={membersData}
        membersError={membersError}
        membersLoading={membersLoading}
        fetchMore={fetchMore}

        clonePlan={clonePlan}
        clonePlanLoading={clonePlanLoading}
        clonePlanError={clonePlanError}

        meData={meData}
        meLoading={meLoading}
        meError={meError}

        pageSize={pageSize}
        setPageSize={setPageSize}

        showLastMembers={showLastMembers}
        setShowLastMembers={setShowLastMembers}

        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
        folderMode={folderMode}
        setFolderMode={setFolderMode}
        deleteMemberFromFolder={deleteMemberFromFolder}
        addMemberToFolder={addMemberToFolder}

        createFolder={createFolder}
        createFolderLoading={createFolderLoading}
        createFolderError={createFolderError}
        createdFolder={createdFolder}
        setCreatedFolder={setCreatedFolder}

        changeFolderName={changeFolderName}
        changeFolderNameLoading={changeFolderNameLoading}
        changeFolderNameError={changeFolderNameError}
        folderNameChanged={folderNameChanged}
        onCloseFolderNameChangeDialog={onCloseFolderNameChangeDialog}

        deleteFolder={deleteFolder}
        deleteFolderLoading={deleteFolderLoading}
        deleteFolderError={deleteFolderError}
        deletedFolder={deletedFolder}
        setDeletedFolder={setDeletedFolder}

        filter={filter}
        setFilter={setFilter}

        networkStatus={networkStatus}

        goBack={goBack}
        goToCustomer={goToCustomer}
        goToSetup={goToSetup}

        resetFilter={() => setInitialFilter('')}
      />
    )
  }

  return DataProvider;

}

export default WithData;
