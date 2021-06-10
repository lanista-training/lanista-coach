import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import moment from "moment";
import { ADDEXERCISESTOPLAN, ADDEXERCISESTOTEST, ADDEXERCISETOFOLDER, DELETEEXERCISEFROMFOLDER, CREATEFOLDER, DELETEFOLDER, CREATEEXERCISE, CHANGEFOLDERNAME} from "../../mutations";
import { EXERCISES, WORKOUT, EXERCISEFOLDERS, OWNTEST, ME } from "../../queries";

// Hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

const GET_FILTER = gql`
  {
    filter @client {
      body
      type
      tool
      plugin
      text
      folderId
      recentlyUsed
      folder {
        id
        name
      }
      private
    }
  }
`;

const GET_DEFAULTSETTINGS = gql`
  {
    defaultSettings @client {
      sets
      unit
      execution
    }
  }
`

const defaultInitialValues = {
  sets: 3,
  unit: 0,
  execution: 8,
}

const filterInitialValues = {
  body: [],
  type: [],
  tool: [],
  plugin: [],
  text: '',
  folderId: 0,
  recentlyUsed: false,
  folder: null,
  private: false,
};

const withData = (WrappedComponent, {editmode, workout: workoutId, testId, split, member, goBack, goToExercise}) => {

  const DataProvider = () => {

    const [folderMode, setFolderMode] = React.useState(null);
    const { data: filterData, client } = useQuery(GET_FILTER);
    const { data: defaultSettingsData } = useQuery(GET_DEFAULTSETTINGS);
    const {defaultSettings} = defaultSettingsData ? defaultSettingsData : {defaultSettings: defaultInitialValues};
    const { data: exerciseFoldersData, loading: exerciseFoldersLoading, error: exerciseFoldersError, refetch: refetchFolders } = useQuery(EXERCISEFOLDERS);
    const {exerciseFolders} = exerciseFoldersData ? exerciseFoldersData : {exerciseFolders: []};
    const {filter} = (filterData && filterData.filter && filterData.filter.body) ? filterData : {filter: filterInitialValues};
    const setFilter = (newFilter) => {
      newFilter.__typename = 'filter';
      client.writeData({ data: { filter: newFilter } });
    };
    const [hasMore, setHasMore] = useState(false);
    const [pageSize, setPageSize] = useState(40);

    const { meLoading, meError, data: meData } = useQuery(ME);
    const {me} = meData ? meData : {me: {}}
    // calculate how many exercises for each page
    const size = useWindowSize();
    const {height, width} = size;

    const exercisesInRow = Math.floor((width - 200) / 214);
    const exercisesInColumn = Math.floor((height - 80) / 191) + 1;
    const calculatedPageSize = exercisesInRow * exercisesInColumn;


    const { loading: exercisesLoading, error: exercisesError, data:exercisesData, fetchMore, refetch, networkStatus } = useQuery(EXERCISES, {
      variables: {
        pageSize: calculatedPageSize,
        after: "0",
        bodyFilters: filter ? filter.body : [],
        typeFilters: filter ? filter.type : [],
        toolFilters: filter ? filter.tool : [],
        pluginFilters: filter ? filter.plugin : [],
        textFilter: (filter && filter.text.length > 2) ? filter.text : '',
        folderId: filter ? filter.folderId : 0,
        substractFolderExercises: folderMode == 1,
        private: filter.private,
        recentlyUsed: filter.recentlyUsed,
        language: me.language,
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    });

    const {hasMore: exercisesHasMore, cursor, total, exercises} = (exercisesData && exercisesData.exercises) ? exercisesData.exercises : {};
    const [initialLoading, setInitialLoading] = useState(true);
    const [filterVisible, setFilterVisible] = useState(false);

    useEffect(() => {
      setHasMore(exercisesHasMore)
    }, [exercisesHasMore]);

    const onFetchExercises = () => {
      const previousCursor = initialLoading ? "0" : cursor;
      fetchMore({
        variables: {
          after: previousCursor,
          pageSize: pageSize,
          bodyFilters: filter.body,
          typeFilters: filter.type,
          toolFilters: filter.tool,
          pluginFilters: filter.plugin,
          textFilter: (filter && filter.text.length > 2) ? filter.text : '',
          folderId: filter.folderId,
          substractFolderExercises: folderMode == 1,
          private: filter.private,
          language: me.language,
        },
        updateQuery: (prev, { fetchMoreResult, ...rest }) => {
          if( initialLoading ) {
            setInitialLoading(false);
          }
          if (!fetchMoreResult) {
            setHasMore(false);
            return prev;
          } else {
            setHasMore(fetchMoreResult.exercises.hasMore);
            if( previousCursor == 0) {
              return {
                ...fetchMoreResult,
                exercises: {
                  ...fetchMoreResult.exercises,
                  exercises: fetchMoreResult.exercises.exercises,
                },
              };
            } else {
              return {
                ...fetchMoreResult,
                exercises: {
                  ...fetchMoreResult.exercises,
                  exercises: _.unionBy(prev.exercises.exercises, fetchMoreResult.exercises.exercises, value => value.id),
                },
              };
            }
          }
        },
      })
    }


    const [addExercisesToPlan, { loading: mutationLoading, error: mutationError }] = useMutation(
      ADDEXERCISESTOPLAN
    );










    const { testLoading, testError, data: ownTestData} = useQuery(OWNTEST, {
      variables: {
        testId: testId
      },
      fetchPolicy: 'cache-only',
    });
    const {ownTest} = ownTestData ? ownTestData : {ownTest: undefined}
    const [addExercisesToTest, { loading: addExercisesToTestLoading, error: addExercisesToTestError }] = useMutation( ADDEXERCISESTOTEST );








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

    const [addExerciseToFolder, {
      loading: addExerciseToFolderLoading,
      error: addExerciseToFolderError
    }] = useMutation(
      ADDEXERCISETOFOLDER,
      {
        update(cache,  { data: {addExerciseToFolder} }) {
          if(addExerciseToFolder.id > 0) {
            refetch();
            refetchFolders();
          }
        }
      }
    );

    const [deleteExerciseFromFolder, {
      loading: deleteExerciseFromFolderLoading,
      error: deleteExerciseFromFolderError
    }] = useMutation(
      DELETEEXERCISEFROMFOLDER,
      {
        update(cache,  { data: {deleteExerciseFromFolder} }) {
          if(deleteExerciseFromFolder.id > 0) {
            refetch();
            refetchFolders();
          }
        }
      }
    );

    const { workoutLoading, workoutError, data: workoutData} = useQuery(WORKOUT, {
      variables: {
        workoutId: workoutId
      },
    });
    const {workout} = workoutData ? workoutData : {workout: null};

    const [newExerciseId, setNewExerciseId] = React.useState(0);
    const resetNewExerciseId = () => setNewExerciseId(0);
    const [createExercise, {
      loading: createExerciseLoading,
      error: createExerciseError
    }] = useMutation(
      CREATEEXERCISE,
      {
        update(cache,  { data: {createExercise} }) {
          if(createExercise.id && createExercise.id.indexOf('1-') > -1) {
            setNewExerciseId(createExercise.id);
          }
        }
      }
    );
    const onCreateExercise = (exerciseName) => {
      setNewExerciseId(0);
      createExercise({
        variables: {
          name: exerciseName
        }
      })
    }

    let selection = []
    if( workout ) {
      const {splits} = (!workoutLoading && workout) ? workout : [];
      const splitExercises = splits && splits.length > 0 && splits.length > (split-1) ? splits[parseInt(split)-1].exercises : [];
      selection = splitExercises.map(planExercise => planExercise.exercise);
    }
    if( ownTest ) {
      const {testExercises} = ownTest;
      selection = testExercises && testExercises.map(testExercise => testExercise.exercise);
    }

    const {bu} = me;

    return(
      <WrappedComponent
        editmode={editmode}
        workoutId={workoutId}
        testId={testId}
        split={split}
        member={member}
        hasMore={hasMore}
        exercises={exercises ? exercises : []}
        total={total ? total : 0}
        loading={exercisesLoading}
        fetchMore={fetchMore}
        cursor={cursor ? cursor : "0"}
        initialLoading={initialLoading}
        setInitialLoading={setInitialLoading}
        onFetchExercises={onFetchExercises}
        setPageSize={setPageSize}
        filter={filter ? filter : filterInitialValues}
        setFilter={setFilter}
        filterVisible={filterVisible}
        setFilterVisible={setFilterVisible}
        currentSelection={selection}
        addExercisesToPlan={addExercisesToPlan}
        mutationLoading={mutationLoading}
        mutationError={mutationError}
        exerciseFolders={exerciseFolders}
        exerciseFoldersError={exerciseFoldersError}
        exerciseFoldersLoading={exerciseFoldersLoading}

        folderMode={folderMode}
        setFolderMode={setFolderMode}

        addExerciseToFolder={addExerciseToFolder}
        removeExerciseFromFolder={deleteExerciseFromFolder}

        createFolder={createFolder}
        createFolderLoading={createFolderLoading}
        createFolderError={createFolderError}
        createdFolder={createdFolder}
        setCreatedFolder={setCreatedFolder}

        deleteFolder={deleteFolder}
        deleteFolderLoading={deleteFolderLoading}
        deleteFolderError={deleteFolderError}
        deletedFolder={deletedFolder}
        setDeletedFolder={setDeletedFolder}

        changeFolderName={changeFolderName}
        changeFolderNameLoading={changeFolderNameLoading}
        changeFolderNameError={changeFolderNameError}
        folderNameChanged={folderNameChanged}
        onCloseFolderNameChangeDialog={onCloseFolderNameChangeDialog}

        onCreateExercise={onCreateExercise}
        createExerciseLoading={createExerciseLoading}
        createExerciseError={createExerciseError}
        newExerciseId={newExerciseId}
        resetNewExerciseId={resetNewExerciseId}

        addExercisesToTest={addExercisesToTest}
        addExercisesToTestLoading={addExercisesToTestLoading}
        addExercisesToTestError={addExercisesToTestError}

        defaultSettings={defaultSettings ? defaultSettings : defaultInitialValues}

        networkStatus={networkStatus}
        bu={bu}

        goBack={goBack}
        goToExercise={goToExercise}
      />
    )
  }

  return DataProvider;

}

export default withData;
