import * as React from "react";
import { Icon } from 'semantic-ui-react';
import {
  ExercisesHeader,
  SearchInfo,
  FiltersWrapper,
  Filters,
  StyledSearchPin,
  StyledFolderPin,
  StyledBodyPin,
  StyledTypePin,
  StyledPopper,
} from './styles';
import FolderIcon from '@material-ui/icons/Folder';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ClearIcon from '@material-ui/icons/Clear';
import LinearProgress from '@material-ui/core/LinearProgress';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import useDebounce from './use-debounce';

const SearchBodyPartPin = ({name, translation, onClick}) => <StyledBodyPin onClick={() => onClick('bodypart', name)}>
    {translation}
    <i/>
  </StyledBodyPin>

const SearchExerciseTypePin = ({name, translation, onClick}) => <StyledTypePin onClick={() => onClick('exercisetype', name)}>
    {translation}
    <i/>
  </StyledTypePin>

const SearchExerciseToolPin = ({name, translation, onClick}) => <StyledSearchPin onClick={() => onClick('tools', name)}>
  {translation}
  <i/>
</StyledSearchPin>

const SearchTextPin = ({name, translation, onClick}) => <StyledSearchPin onClick={() => onClick('text', name)}>
  {translation}
  <i/>
</StyledSearchPin>

const SearchPluginPin = ({name, onClick}) => <StyledSearchPin onClick={() => onClick('plugin', {name: name})}>
  {name}
  <i/>
</StyledSearchPin>

const SearchFolderPin = ({name, id, onClick}) => <StyledFolderPin onClick={() => onClick('folder', {id: id})}>
  <FolderIcon/>
  <div className="pin-text">{name}</div>
  <i/>
</StyledFolderPin>

export default ({
  t,

  loading,
  total,

  filter,

  onRemoveFilter,
  onTextFilterChange,

  suggestions,
  setSearch,
}) => {

  const [searchTerm, setSearchTerm] = React.useState(filter.text);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);


  //
  // Suggestions
  //
  const inputEl = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //
  // Lock suggestoins
  //
  const [lock, setLock] = React.useState(true);

  React.useEffect(() => {
    if( suggestions &&  suggestions.length > 0 ) {
      if( suggestions.length == 1 && suggestions[0] == filter.text ) {
        setAnchorEl(null)
      } else {
        setAnchorEl(inputEl.current);
      }
    } else {
      setAnchorEl(null)
    }
  }, [suggestions]);


  React.useEffect(
    () => {
      onTextFilterChange(debouncedSearchTerm);
    },
    [debouncedSearchTerm]
  );

  return (
    <ExercisesHeader>
      <SearchInfo>
        {total} <span>{t('exercises')}</span>
      </SearchInfo>
      <FiltersWrapper>
        <Filters>
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
        {
          filter.plugin.map((item, index) =>
            <SearchPluginPin key={index} name={item} onClick={onRemoveFilter}/>
          )
        }
        </Filters>
      </FiltersWrapper>
      <div className="text-search-wrapper">
        <div className="text-search" ref={inputEl}>
          <div className="input-area">
            <input
              placeholder={t("textsearch")}
              inputProps={{ 'aria-label': 'search exercises lanista' }}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              autoFocus={true}
              onKeyUp={() => {
                console.log("onkeyup")
                setLock(false);
              }}
            />
            <ClearIcon onClick={() => setSearchTerm('')}/>
          </div>
          <Divider orientation="vertical" />
          <SearchIcon className="search-button"/>
        </div>
        <StyledPopper
          id={id}
          open={open && !lock}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div className="suggestions-area">
            <List component="nav" aria-label="search suggestions">
              {
                suggestions.map((suggestion, index) => (
                    <ListItem key={index} button onClick={() => {
                      setSearchTerm(suggestion);
                      setLock(true);
                      handleClose();
                    }}>
                      <ListItemText primary={suggestion} />
                    </ListItem>
                  )
                )
              }
            </List>
          </div>
        </StyledPopper>
      </div>
      {loading && <LinearProgress color="secondary"/>}
    </ExercisesHeader>
  )
};
