import * as React from "react";
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react'

const ExercisesHeader  = styled.div`
  font-size: 22px;
  line-height: 21px;
  text-align: right;
  width: 100%;
  display: flex;
  flex-flow: row-reverse;
`;
const SearchInfo  = styled.div`
  margin-top: 25px;
  -webkit-letter-spacing: -1px;
  -moz-letter-spacing: -1px;
  -ms-letter-spacing: -1px;
  -webkit-letter-spacing: -1px;
  -moz-letter-spacing: -1px;
  -ms-letter-spacing: -1px;
  -webkit-letter-spacing: -1px;
  -moz-letter-spacing: -1px;
  -ms-letter-spacing: -1px;
  letter-spacing: -1px;
  font-size: 26px;
  color: #4c4c4c;
  width: 17vw;
  text-align: right;
  padding-right: 1em;
`;
const FiltersWrapper  = styled.div`
  width: 76vw;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none!important;
  }
`;
const Filters  = styled.div`
  text-align: left;
  width: auto;
  display: -webkit-box;;
  padding: 0.8em;
`;
const StyledSearchPin =  styled.div`
  width: auto!important;
  text-transform: none;
  background: #e8e8e8;
  border-radius: .28571429rem;
  box-shadow: none;
  line-height: 1.5em;
  font-size: 1em;
  padding: 0 1em;
  margin: 0 0.5em;
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
      content: "\f056";
      background: 0 0!important;
    }
  }
`;



const SearchBodyPartPin = ({name, translation, onClick}) => <StyledSearchPin onClick={() => onClick('bodypart', name)}>
    {translation}
    <i/>
  </StyledSearchPin>

const SearchExerciseTypePin = ({name, translation, onClick}) => <StyledSearchPin onClick={() => onClick('exercisetype', name)}>
    {translation}
    <i/>
  </StyledSearchPin>

const SearchExerciseToolPin = ({name, translation, onClick}) => <StyledSearchPin onClick={() => onClick('tools', name)}>
  {translation}
  <i/>
</StyledSearchPin>

const SearchTextPin = ({name, translation, onClick}) => <StyledSearchPin onClick={() => onClick('text', name)}>
  {translation}
  <i/>
</StyledSearchPin>



export default ({total, t, filter, onRemoveFilter}) => (
  <ExercisesHeader>
    <SearchInfo>
      {total} {t('exercises')}
    </SearchInfo>
    <FiltersWrapper>
      <Filters>
      {
        (filter.text && filter.text.length > 0) && (<SearchTextPin key="exercise-text-pin" name={filter.text} translation={filter.text} onClick={onRemoveFilter}/>)
      }
      {
        filter.body.map((item, index) =>
          <SearchBodyPartPin key={index} name={item} translation={t(item)} onClick={onRemoveFilter}/>
        )
      }
      {
        filter.type.map((item, index) =>
          <SearchExerciseTypePin key={index} name={item} translation={t(item)} onClick={onRemoveFilter}/>
        )
      }
      {
        filter.tool.map((item, index) =>
          <SearchExerciseToolPin key={index} name={item} translation={t(item)} onClick={onRemoveFilter}/>
        )
      }
      </Filters>
    </FiltersWrapper>
  </ExercisesHeader>
);
