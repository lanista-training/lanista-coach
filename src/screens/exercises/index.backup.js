import React, { Component } from 'react';
import _ from 'lodash';
import moment from "moment";
import Router from 'next/router';
import { Query } from "react-apollo";
import Scene from "../../components/Scene";
import Exercises from './Exercises';
import ExercisesHeader from "../../components/ExercisesHeader";
import { ADDEXERCISESTOPLAN } from "../../mutations";
import { EXERCISES, WORKOUT } from "../../queries";
import { withApollo } from '../../lib/apollo';
import { useMutation, useQuery } from '@apollo/react-hooks';
import ExercisesFilter from "../../components/ExercisesFilter";
import { DataConsumer } from '../../components/DataProvider';
import SelectionOverviewPanel from '../../components/SelectionOverviewPanel';
import withData from "./DataProvider";

const ExercisesWithLocalData = ({editmode, workout, split}) => {
  const [addExercisesToPlan, { loading: mutationLoading, error: mutationError }] = useMutation(
    ADDEXERCISESTOPLAN,
    {
      update(cache,  { data: { addExercisesToPlan } }) {
        if( addExercisesToPlan ) {
          const {workoutId, split, exercises} = addExercisesToPlan
          let {workout} = cache.readQuery({
            query: WORKOUT,
            variables: {
              workoutId: workoutId,
            },
          });
          let newExercises = []
          workout.splits[split-1].exercises.map(exercise => newExercises.push(exercise))
          exercises.map(exercise => newExercises.push(exercise))
          workout.splits[split-1].exercises = newExercises
          cache.writeQuery({
            query: WORKOUT,
            variables: {
              workoutId: workoutId,
            },
            data: { workout: workout },
          });
        }

      }
    }
  );
  if(editmode) {
    const { loading, error, data } = useQuery(WORKOUT, {
      variables: {
        workoutId: workout
      },
      fetchPolicy: 'cache-only',
    });
    const {splits} = (!loading && data && data.workout) ? data.workout : [];
    const splitExercises = splits && splits.length > 0 && splits.length > split ? splits[split-1].exercises : [];
    const selection = splitExercises.map(planExercise => planExercise.exercise)
    return (
      <DataConsumer>
        {({ filter, setFilter }) => {
          return(
            <ExercisesWithRemoteData
              filter={filter}
              setFilter={setFilter}
              editmode={editmode}
              workout={workout}
              split={split}
              selection={selection}
              addExercisesToPlan={addExercisesToPlan}
              mutationLoading={mutationLoading}
              mutationError={mutationError}
            />
          )
        }}
      </DataConsumer>
    )
  } else {
    return (
      /* Then we use our context through render props */
      <DataConsumer>
        {({ filter, setFilter }) => {
          return(
            <ExercisesWithRemoteData
              filter={filter}
              setFilter={setFilter}
              editmode={editmode}
            />
          )
        }}
      </DataConsumer>
    )
  }
}

class ExercisesWithRemoteData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterTextCurrentValue: '',
      translations: [],
      initialLoading: true,
      filterVisible: false,
      bodyFiltersState: {
        shoulder: false,
        biceps: false,
        triceps: false,
        chest: false,
      	upperback: false,
        lowerback: false,
        abs: false,
        hip: false,
        frontfemoral: false,
        backfemoral: false,
        lowerleg: false,
      },
      typeFiltersState: {
        bodyweight: false,
        machine: false,
        freeweight: false,
        cable: false,
        stretch: false,
      	cardio: false,
        specials: false,
        unilateral: false,
      },
      toolFiltersState: {
        any: false,
        dumbbels: false,
        barbell: false,
        kettlebells: false,
        bank: false,
        others: false,
        ball: false,
        blast: false,
        jumber: false,
        foam: false,
        miniband: false,
      },
      filterStyles: {
        shoulder: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
        biceps: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
        triceps: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
        forearm: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
        chest: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
        upperback: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
        lowerback: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
        abs: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
        hip: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
        frontfemoral: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
        backfemoral: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
        lowerleg: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
      },
      selection: [],
    };
    this.goBack = this.goBack.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onFetchExercises = this.onFetchExercises.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.onBodyPartSelection = this.onBodyPartSelection.bind(this);
    this.onRemoveFilter = this.onRemoveFilter.bind(this);
    this.onExerciseTypeSelection = this.onExerciseTypeSelection.bind(this);
    this.onExerciseToolSelection = this.onExerciseToolSelection.bind(this);
    this.onExerciseTextSelection = this.onExerciseTextSelection.bind(this);
    this.onExerciseTextChange = this.onExerciseTextChange.bind(this);
    this.showExercise = this.showExercise.bind(this);
    this.onPluginSelection = this.onPluginSelection.bind(this);
    this.marcSelectedExercises = this.marcSelectedExercises.bind(this);
    this.removeItem = this.removeItem.bind(this);
  };

  componentDidMount() {
    this.onChangeLanguage("de");
    const {selection} = this.props
    if(selection){
      this.setState({
        selection: selection
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps.mutationLoading)
    console.log(this.props.mutationLoading)
    if(prevProps.mutationLoading && !this.props.mutationLoading) {
      this.goBack()
    }
  }

  goBack() {
    Router.back();
  }

  toggleFilter() {
    this.setState({
      filterVisible: !this.state.filterVisible
    })
  }

  onRemoveFilter(onRemoveFilter, filterToRemove) {
    if( onRemoveFilter == 'bodypart' ) this.onBodyPartSelection(filterToRemove)
    if( onRemoveFilter == 'exercisetype' ) this.onExerciseTypeSelection(filterToRemove)
    if( onRemoveFilter == 'tools' ) this.onExerciseToolSelection(filterToRemove)
    if( onRemoveFilter == 'text' ) this.onExerciseTextChange('')
    if( onRemoveFilter == 'plugin' ) this.onPluginSelection(filterToRemove)
  }

  onBodyPartSelection(id) {
    const {bodyFiltersState, filterStyles, filterVisible}  = this.state
    const {filter, setFilter} = this.props
    const {body} = filter
    const newFilter = _.remove(body, function(n) {
      return n != id;
    });
    if( !bodyFiltersState[id] ) {
      newFilter.push(id)
    }
    let newBodyFilterState = {...bodyFiltersState}
    newBodyFilterState[id] = !newBodyFilterState[id]
    let newFilterStyles = {...filterStyles}
    newFilterStyles[id] = (bodyFiltersState[id] ? {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"} : {"fill":"rgb(155, 201, 61)","fillRule":"nonzero"})
    this.setState({
      filterStyles: newFilterStyles,
      bodyFiltersState: newBodyFilterState,
    }, () => filterVisible && this.toggleFilter())
    setFilter({
      ...filter,
      body: newFilter
    })
  }

  onExerciseTypeSelection(id) {
    const {typeFiltersState, filterVisible}  = this.state
    const {filter, setFilter} = this.props
    const {type} = filter
    let newFilter = _.remove(type, function(n) {
      return n != id;
    });
    if( !typeFiltersState[id] ) {
      newFilter.push(id)
    }
    let newTypeFilterState = {...typeFiltersState}
    newTypeFilterState[id] = !newTypeFilterState[id]
    this.setState({
      typeFiltersState: newTypeFilterState,
    }, () => filterVisible && this.toggleFilter())
    setFilter({
      ...filter,
      type: newFilter
    })
  }

  onPluginSelection(selection) {
    const {filterVisible}  = this.state
    const {filter, setFilter} = this.props
    const {plugin} = filter

    let newFilter = _.remove(plugin, function(n) {
      return n != selection.name;
    });
    if( plugin.indexOf(selection.name) == -1 ) {
      newFilter.push(selection.name)
    }
    setFilter({
      ...filter,
      plugin: newFilter
    })
    filterVisible && this.toggleFilter()
  }

  onExerciseToolSelection(id) {
    const {toolFiltersState, filterVisible}  = this.state
    const {filter, setFilter} = this.props
    const {tool} = filter
    const newFilter = _.remove(tool, function(n) {
      return n != id;
    });
    if( !toolFiltersState[id] ) {
      newFilter.push(id)
    }
    let newToolFiltersState = {...toolFiltersState}
    newToolFiltersState[id] = !newToolFiltersState[id]
    this.setState({
      toolFiltersState: newToolFiltersState,
    }, () => filterVisible && this.toggleFilter())
    setFilter({
      ...filter,
      tool: newFilter
    })
  }

  onExerciseTextSelection(e, result) {
    this.toggleFilter()
    this.showExercise(result.result.id)
  }

  onExerciseTextChange(text) {
    const {filter, setFilter}  = this.props
    this.setState({
      filterTextCurrentValue: text,
    })
    setFilter({
      ...filter,
      text: text
    })
  }

  onFetchExercises(fetchMore, data) {
    const {pageSize, initialLoading} = this.state
    const {filter} = this.props
    const previousCursor = initialLoading ? "0" : data.exercises.cursor;
    fetchMore({
      variables: {
        after: previousCursor,
        pageSize: pageSize,
        bodyFilters: filter.body,
        typeFilters: filter.type,
        toolFilters: filter.tool,
        pluginFilters: filter.plugin,
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if( initialLoading ) {
          this.setState({initialLoading: false})
        }
        if (!fetchMoreResult) {
          this.setState({
            hasMore: false
          })
          return prev;
        } else {
          this.setState({
            hasMore: fetchMoreResult.exercises.hasMore
          })
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

  showExercise(exerciseId, exercises) {
    const {editmode} = this.props
    if(editmode) {
      const selectedExercise = exercises.find(exercise => exercise.id == exerciseId)
      let {selection} = this.state
      selection.push({...selectedExercise, selected: true})
      this.setState({
        selection: selection
      })
    } else {
      Router.push({
        pathname: '/exercise',
        query: { exercise: exerciseId }
      });
    }
  }

  removeItem(exerciseId) {
    console.log("REMOVIG ITEM")
    let {selection} = this.state
    const newSelection = []
    selection.map(exercise => {
      if(exercise.id != exerciseId) {
        newSelection.push(exercise)
      }
    })
    this.setState({
      selection: newSelection
    })
  }

  getCommandsRight() {
    const {filterVisible} = this.state
    return (filterVisible ? [] : [{
          icon: 'icon-search',
          text: 'search',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'search exercise',
          onTap: () => {
            this.toggleFilter();
          }
      }, {
        icon: 'icon-folder',
        text: 'folder',
        type: 'type-1',
        typex: 'Ionicons',
        name: 'folder',
        onTap: () => {
          console.log("Folder Options");
        }
      }, {
          icon: 'icon-user-exercise',
          text: 'user exercise',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'user exercise',
          onTap: () => {
            console.log("User exercises");
          }
      }, {
          icon: 'icon-time-back',
          text: 'recently used',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'refresh',
          onTap: () => {
            console.log("Recently used");
          }
      }]);
  }

  getCommandsLeft() {
    const {filterVisible} = this.state
    const {editmode} = this.props
    return (filterVisible ? [{
          icon: 'icon-back',
          text: 'Back',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          className: 'search-back-button',
          onTap: () => {
            this.toggleFilter();
          },
      }, {}, {}, {}, {}] : [{
          //icon: CustomerIcon,
          icon: 'icon-back',
          text: 'Back',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          onTap: () => {
            // save the changes first
            if(editmode) {
              const {addExercisesToPlan, workout, split} = this.props
              const {selection} = this.state
              const newExercises = []
              const currentSplitLength = this.props.selection.length
              let counter = 1
              selection.map((exercise, index) => {
                if(exercise.selected) {
                  newExercises.push({
                    id: exercise.id,
                    position: currentSplitLength + counter
                  })
                  counter++;
                }
              })
              addExercisesToPlan({
                variables: {
                  planId: workout,
                  split: parseInt(split),
                  exercises: JSON.stringify(newExercises),
                  settings: JSON.stringify({
                    training: 12,
                    weight: 0,
                    training: 8,
                    unit: 0,
                    sets: 3,
                  }),
                }
              })
              const _this = this
            } else {
              this.goBack();
            }
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
    const textWithoutNamespace = text ? text.split(":") : '';
    const translation = translations[textWithoutNamespace[textWithoutNamespace.length-1]];
    return (translation ? translation : text);
  }

  onChangeLanguage( language ) {
    const translations = require('../../../static/locales/' + language + '/exercises');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];

    this.setState({
      translations: {...translations, ...commonTranslations},
      currentLanguage: language,
      availableLanguages: originalLanguages.filter(word => word !== language)
    });
  }

  marcSelectedExercises(exercises) {
    const {selection} = this.state
    const selectedExercises = exercises.map(exercise => {
      if(selection.findIndex(item => item.id == exercise.id) > -1) {
        return {
          ...exercise, selected: true
        }
      } else {
        return exercise
      }
    })
    return selectedExercises
  }

  render() {
    const {filter, editmode} = this.props
    const {selection} = this.state
    const {
      processing,
      filtering,
      exercises,
      folderMenuVisible,
      closeFolderMenu,
      menuDirection,
      folderMenu,
      filterVisible,
      filterStyles,
      typeFiltersState,
      toolFiltersState,
    } = this.state;
    return(
      <Query
        query={EXERCISES}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
        variables={{
          pageSize: 40,
          after: "0",
          bodyFilters: filter.body,
          typeFilters: filter.type,
          toolFilters: filter.tool,
          pluginFilters: filter.plugin,
          textFilter: filter.text,
        }}
        onCompleted={ (data) => {
          this.setState({
            initialLoading: false,
          })
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          const hasMore = data && data.exercises ? data.exercises.hasMore : true
          const result = (data && data.exercises) ? data.exercises : {exercises: []}
          return (
            <Scene
              commandsLeft={this.getCommandsLeft()}
              commandsRight={this.getCommandsRight()}
              processing={processing}
              headerChildren={
                <ExercisesHeader
                  t={this.t}
                  total={data && data.exercises && data.exercises.total}
                  filter={filter}
                  onRemoveFilter={this.onRemoveFilter}
                />
              }
              t={this.t}
            >
              {
                filterVisible &&
                <ExercisesFilter
                  filterStyles={filterStyles}
                  onBodyPartSelection={this.onBodyPartSelection}
                  onExerciseTypeSelection={this.onExerciseTypeSelection}
                  onExerciseToolSelection={this.onExerciseToolSelection}
                  onExerciseTextSelection={this.onExerciseTextSelection}
                  onExerciseTextChange={this.onExerciseTextChange}
                  onPluginSelection={this.onPluginSelection}
                  typeFiltersState={typeFiltersState}
                  toolFiltersState={toolFiltersState}
                  pluginFiltersState={filter.plugin}
                  exercises={
                    (data && data.exercises)
                    ?
                      _.times(data.exercises.exercises.length > 10
                      ?
                        10
                      :
                        data.exercises.exercises.length, (i) =>
                        (
                          {
                            title: data.exercises.exercises[i].name,
                            id: data.exercises.exercises[i].id,
                          }
                        )
                      )
                    :
                      []
                  }
                  textFilterValue={filter && filter.text}
                  t={this.t}
                  loading={loading}
                />
              }
              {
                !filterVisible &&
                <Exercises
                  exercises={editmode ? this.marcSelectedExercises(result.exercises) : result.exercises}
                  filtering={filtering}
                  isFilterOn={data ? (data.length != data.length) : false}
                  onRequestPage={(page) => this.onFetchExercises(fetchMore, data, page)}
                  loading={loading}
                  error={error}
                  hasMore={hasMore}
                  setPageSize={(newPageSize) => this.setState({pageSize: newPageSize})}
                  onShowExercise={editmode ? (exerciseId) => this.showExercise(exerciseId, result.exercises) : this.showExercise}
                  t={this.t}
                />
              }
              {!filterVisible && editmode && <SelectionOverviewPanel selection={selection} removeItem={this.removeItem}/>}
            </Scene>
          )
        }}
      </Query>
    )
  }
}

export default withApollo(ExercisesWithLocalData);
