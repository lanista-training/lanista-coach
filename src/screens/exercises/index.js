import React, { Component } from 'react';
import _ from 'lodash';
import moment from "moment";
import Router from 'next/router';
import { Query } from "react-apollo";
import Scene from "../../components/Scene";
import Exercises from './Exercises';
import ExercisesHeader from "../../components/ExercisesHeader";
import { EXERCISES } from "../../queries";
import ExercisesFilter from "../../components/ExercisesFilter";
import { DataConsumer } from '../../components/DataProvider'

class ExercisesWithLocalData extends Component {
  render () {
    return (
      /* Then we use our context through render props */
      <DataConsumer>
        {({ filter, setFilter }) => {
          return(
            <ExercisesWithRemoteData filter={filter} setFilter={setFilter}/>
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
      currentScrollPosition: 0,
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
      }
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
  };

  componentDidMount() {
    this.onChangeLanguage("de");
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

  showExercise(exerciseId) {
    console.log("showExercise")
    Router.push({
      pathname: '/exercise',
      query: { exercise: exerciseId }
    });
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

  render() {
    const {filter} = this.props
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
          console.log("filter.plugin")
          console.log(filter.plugin)
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
                  exercises={result.exercises}
                  filtering={filtering}
                  isFilterOn={data ? (data.length != data.length) : false}
                  onRequestPage={(page) => this.onFetchExercises(fetchMore, data, page)}
                  loading={loading}
                  error={error}
                  hasMore={hasMore}
                  setPageSize={(newPageSize) => this.setState({pageSize: newPageSize})}
                  onShowExercise={this.showExercise}
                  t={this.t}
                />
              }
            </Scene>
          )
        }}
      </Query>
    )
  }
}

export default ExercisesWithLocalData;
