import * as React from "react";
import BodyFilter from '../BodyFilter';
import Plugins from '../Plugins';
import {FilterPanel, PinSelectionList, Filter, StyledSearchPin, StyledTypePin} from "./styles";


const SearchPin = ({name, translation, onClick}) => <StyledSearchPin onClick={() => onClick(name)}>
  {translation}
  <i/>
</StyledSearchPin>

const TypePin = ({name, translation, onClick}) => <StyledTypePin onClick={() => onClick(name)}>
  {translation}
  <i/>
</StyledTypePin>

export default ({
  filterTabIndex,
  handleTabChange,
  setFilter,
  filterStyles,
  onBodyPartSelection,
  onExerciseTypeSelection,
  onExerciseToolSelection,
  onExerciseTextChange,
  onPluginSelection,
  textFilterValue,
  typeFiltersState,
  toolFiltersState,
  pluginFiltersState,
  exercises,
  loading,
  onShowExercise,
  onCloseFilter,
  t}) => {

  const panes = [
    {
      menuItem: t('musslegroup'),
      pane: {
        key: 'musslegroup',
        content: (<BodyFilter
          filterStyles={filterStyles}
          onBodyPartSelection={onBodyPartSelection}
        />)
      }
    },
    {
      menuItem: t('exercisetype'),
      pane: {
        key: 'exercisetype',
        content: (
          <PinSelectionList>
            <div className="list-wrapper">
              {!typeFiltersState.bodyweight && <TypePin name="bodyweight" translation={t("bodyweight")} onClick={() => onExerciseTypeSelection("bodyweight")}/>}
              {!typeFiltersState.machine && <TypePin name="machine" translation={t("machine")} onClick={() => onExerciseTypeSelection("machine")}/>}
              {!typeFiltersState.freeweights && <TypePin name="freeweights" translation={t("freeweights")} onClick={() => onExerciseTypeSelection("freeweights")}/>}
              {!typeFiltersState.cable && <TypePin name="cable" translation={t("cable")} onClick={() => onExerciseTypeSelection("cable")}/>}
              {!typeFiltersState.stretch && <TypePin name="stretch" translation={t("stretch")} onClick={() => onExerciseTypeSelection("stretch")}/>}
              {!typeFiltersState.cardio && <TypePin name="cardio" translation={t("cardio")} onClick={() => onExerciseTypeSelection("cardio")}/>}
              {!typeFiltersState.specials && <TypePin name="specials" translation={t("specials")} onClick={() => onExerciseTypeSelection("specials")}/>}
              {!typeFiltersState.unilateral && <TypePin name="unilateral" translation={t("unilateral")} onClick={() => onExerciseTypeSelection("unilateral")}/>}
            </div>
          </PinSelectionList>
        )
      }
    },
    {
      menuItem: t('extras'),
      pane: {
        key: 'extras',
        content: (
          <PinSelectionList>
            <div className="list-wrapper">
              {!toolFiltersState.any && <SearchPin name="any" translation={t("any")} onClick={() => onExerciseToolSelection("any")}/>}
              {!toolFiltersState.dumbbels && <SearchPin name="dumbbels" translation={t("dumbbels")} onClick={() => onExerciseToolSelection("dumbbels")}/>}
              {!toolFiltersState.barbell && <SearchPin name="barbell" translation={t("barbell")} onClick={() => onExerciseToolSelection("barbell")}/>}
              {!toolFiltersState.kettlebells && <SearchPin name="kettlebells" translation={t("kettlebells")} onClick={() => onExerciseToolSelection("kettlebells")}/>}
              {!toolFiltersState.bank && <SearchPin name="bank" translation={t("bank")} onClick={() => onExerciseToolSelection("bank")}/>}
              {!toolFiltersState.others && <SearchPin name="others" translation={t("others")} onClick={() => onExerciseToolSelection("others")}/>}
              {!toolFiltersState.ball && <SearchPin name="ball" translation={t("ball")} onClick={() => onExerciseToolSelection("ball")}/>}
              {!toolFiltersState.blast && <SearchPin name="blast" translation={t("blast")} onClick={() => onExerciseToolSelection("blast")}/>}
              {!toolFiltersState.jumber && <SearchPin name="jumber" translation={t("jumber")} onClick={() => onExerciseToolSelection("jumber")}/>}
              {!toolFiltersState.foam && <SearchPin name="foam" translation={t("foam")} onClick={() => onExerciseToolSelection("foam")}/>}
              {!toolFiltersState.miniband && <SearchPin name="miniband" translation={t("miniband")} onClick={() => onExerciseToolSelection("miniband")}/>}
            </div>
          </PinSelectionList>)
      }
    },
    {
      menuItem: t('plugins'),
      pane: {
        key: 'plugins',
        content: <Plugins
          text={t('No plugins loaded')}
          onPluginSelection={onPluginSelection}
          pluginFiltersState={pluginFiltersState}
        />
      }
    },
  ]

  const onFilterClick = (event) => {
    event.target.classList.contains('column') && onCloseFilter();
  }

  return (
    <Filter onClick={onFilterClick}>
      <FilterPanel
        panes={panes}
        menu={{ fluid: true, vertical: true, tabular: 'right' }}
        renderActiveOnly={false}
        activeIndex={filterTabIndex}
        onTabChange={handleTabChange}
      />
    </Filter>
  )
};
