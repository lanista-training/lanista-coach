import * as React from "react"
import styled from 'styled-components'
import BodyFilter from '../BodyFilter'
import { Tab, Search } from 'semantic-ui-react'

const FilterPanel = styled(Tab)`
  height: 100%;
  width: 99.9%;
  .menu {
    border: none!important;
    width: 100%;
    padding: 1.5em 0;
    height: 5em;
    overflow: hidden;
    .item {
      padding: 0!important;
      width: 16vw!important;
      -webkit-transition: font-size 0.3s ease;
      -moz-transition: font-size 0.3s ease;
      -o-transition: font-size 0.3s ease;
      -ms-transition: font-size 0.3s ease;
      text-align: center!important;
      display: block!important;
    }
    .active {
      font-size: 2em!important;
      border: none!important;
      background: transparent!important;
      padding: 0!important;
    }
  }
  .tab {
    padding: 0!important;
    background: transparent!important;
    border: none!important;
  }
`;
const PinSelectionList  = styled.div`
  padding-top: 2em!important;
  display: flex;
  padding: 0;
  flex-wrap: wrap;
  list-style: none;
  overflow-y: auto;
`;
const Filter  = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 5em!important;
`;
const StyledSearchPin =  styled.div`
  width: auto!important;
  text-transform: none;
  background: #e8e8e8;
  border-radius: .28571429rem;
  box-shadow: none;
  line-height: 2em;
  font-size: 1.3em;
  padding: 0 1em;
  margin: 1em;
  i {
    font-size: .92857143em;
    opacity: .5;
    width: auto;
    font-family: Icons;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    speak: none;
    margin-left: 0.5em;
    ::before {
      content: "\f055";
      background: 0 0!important;
    }
  }
`;
const StyledSearchInput =  styled.div`
  .ui.search {
    display: flex;
    flex-flow: column;
    justify-items: center;
    align-items: center;
    padding: 5em;
    text-align: center;
    .input{
      font-size: 1em;
      width: 20vw;
    }
    .results {
      position: initial!important;
    }
  }
`;
const StyledNoPluginMessage =  styled.div`
  font-size: 1.5em;
  font-weight: 700;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column-reverse;
  -ms-flex-flow: column-reverse;
  flex-flow: column-reverse;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  line-height: 3.5em;
  opacity: .5;
  i {
    font-size: 5em;
    font-family: Lanista;
    font-style: normal;
    text-align: center;
    margin-top: 25vh;
    ::before {
      content: '\\e90b';
      background: 0 0!important;
    }
  }
`;

const SearchPin = ({name, translation, onClick}) => <StyledSearchPin onClick={() => onClick(name)}>
    {translation}
    <i/>
  </StyledSearchPin>

const NoPluginMessage = ({text}) => <StyledNoPluginMessage>
    {text}
    <i/>
  </StyledNoPluginMessage>

export default ({
  setFilter,
  filterStyles,
  onBodyPartSelection,
  onExerciseTypeSelection,
  onExerciseToolSelection,
  onExerciseTextSelection,
  onExerciseTextChange,
  textFilterValue,
  typeFiltersState,
  toolFiltersState,
  exercises,
  loading,
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
            {!typeFiltersState.bodyweight && <SearchPin name="bodyweight" translation={t("bodyweight")} onClick={() => onExerciseTypeSelection("bodyweight")}/>}
            {!typeFiltersState.machine && <SearchPin name="machine" translation={t("machine")} onClick={() => onExerciseTypeSelection("machine")}/>}
            {!typeFiltersState.freeweights && <SearchPin name="freeweights" translation={t("freeweights")} onClick={() => onExerciseTypeSelection("freeweights")}/>}
            {!typeFiltersState.cable && <SearchPin name="cable" translation={t("cable")} onClick={() => onExerciseTypeSelection("cable")}/>}
            {!typeFiltersState.stretch && <SearchPin name="stretch" translation={t("stretch")} onClick={() => onExerciseTypeSelection("stretch")}/>}
            {!typeFiltersState.cardio && <SearchPin name="cardio" translation={t("cardio")} onClick={() => onExerciseTypeSelection("cardio")}/>}
            {!typeFiltersState.specials && <SearchPin name="specials" translation={t("specials")} onClick={() => onExerciseTypeSelection("specials")}/>}
            {!typeFiltersState.unilateral && <SearchPin name="unilateral" translation={t("unilateral")} onClick={() => onExerciseTypeSelection("unilateral")}/>}
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
          </PinSelectionList>)
      }
    },
    {
      menuItem: t('textsearch'),
      pane: {
        key: 'textsearch',
        content: (
          <StyledSearchInput>
            <Search
              loading={loading}
              onResultSelect={onExerciseTextSelection}
              onSearchChange={(event, text) => onExerciseTextChange(text.value)}
              results={exercises}
              value={textFilterValue}
            />
          </StyledSearchInput>
        )
      }
    },
    {
      menuItem: t('plugins'),
      pane: {
        key: 'plugins',
        content: (<NoPluginMessage text={t('No plugins loaded')}/>)
      }
    },
  ]

  return (
    <Filter>
      <FilterPanel panes={panes} renderActiveOnly={false}/>
    </Filter>
  )
};
