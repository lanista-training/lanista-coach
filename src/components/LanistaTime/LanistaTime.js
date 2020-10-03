import React, { useState, useEffect, useRef } from 'react';
import {InputField, StyledButtonGroup, TimeBlockSection} from "./styles";
import LanistaButton from '../../components/LanistaButton';
import moment from "moment";

import Button from '@material-ui/core/Button';

import WatchLaterIcon from '@material-ui/icons/WatchLater';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NestedMenuItem from 'material-ui-nested-menu-item';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const getTimeRageMenuItems = () => {
  const items = [];
  for( var i = 1; i < 32; i++) {
    items.push(<MenuItem value={i}>{i}</MenuItem>);
  }
  return items;
}

const getValue = (t, start, end) => {
  if( start == end ) {
    if( start == -1 ) {
      return t('allways');
    } else if( start == 0 ) {
      return t('no_data');
    }
    else {
      return moment(start).fromNow();
    }
  } else {
    if( start == -1 && end == 0 ) return t("chronic");
    if( end == -1 && start == 0 ) return t("chronic");
    const startValue = start == -1 ? t("chronic") : start == 0 ? t('no_data') : moment(start).fromNow();
    const endValue = end == -1 ? t("chronic") : end == 0 ? t('no_data') : moment(end).fromNow();
    return startValue + " - " + endValue;
  }
}

export default ({t, startValue, endValue, onStartChange, onEndChange, editable}) => {

  const [menuStartPosition, setMenuStartPosition] = useState(null);
  const [menuEndPosition, setMenuEndPosition] = useState(null);
  const onOpenStartMenu = (event) => {
    if( menuStartPosition ) {
      return;
    }
    event.preventDefault();
    setMenuStartPosition({
      top: event.pageY,
      left: event.pageX,
    })
  }
  const onOpenEndMenu = (event) => {
    if( menuEndPosition ) {
      return;
    }
    event.preventDefault();
    setMenuEndPosition({
      top: event.pageY,
      left: event.pageX,
    })
  }
  const handleItemClick = (event) => {
    setMenuStartPosition(null);
    setMenuEndPosition(null);
  }

  const [startRangeUnit, setStartRangeUnit] = useState('w');
  const [startRangeValue, setStartRangeValue] = useState(2);
  const [endRangeUnit, setEndRangeUnit] = useState('w');
  const [endRangeValue, setEndRangeValue] = useState(2);

  const handleStartDateChange = (date) => {
    const newValue = date > 0 ? moment(date).format('YYYY-MM-DD') : date;
    onStartChange(newValue);
    endValue == -1 && onEndChange(newValue);
    setMenuStartPosition(null);
  };
  const handleEndDateChange = (date) => {
    const newValue = date > 0 ? moment(date).format('YYYY-MM-DD') : date;
    onEndChange(newValue);
    setMenuEndPosition(null);
  };

  return (
    <InputField editing={editable}>
      <div className="start-section">
        <LanistaButton
          variant="outlined"
          className="start-button"
          endIcon={startValue == 0 ? <AccessTimeIcon/> : <WatchLaterIcon />}

          aria-controls="simple-menu"
          aria-haspopup="true"

          onClick={onOpenStartMenu}
          style={{display: editable ? 'flex' : 'none'}}
        >
          {t("start")}
        </LanistaButton>
        <Menu
          open={!!menuStartPosition}
          anchorReference="anchorPosition"
          anchorPosition={menuStartPosition}
        >
          <NestedMenuItem
            parentMenuOpen={!!menuStartPosition}
            label={t("for") + '...'}
          >
            <TimeBlockSection>
              <div className="select-section">
                <FormControl variant="outlined">
                  <Select
                    id="time-block-selection"
                    value={startRangeValue}
                    onChange={(event) => setStartRangeValue(event.target.value)}
                    menuStyle={{ maxHeight: 100, overflow: 'auto' }}
                  >
                    {getTimeRageMenuItems()}
                  </Select>
                </FormControl>
                <StyledButtonGroup
                  orientation="vertical"
                  color="primary"
                  aria-label="vertical outlined button group"
                >
                  <Button className={startRangeUnit== 'd' ? 'selected' : ''} onClick={() => setStartRangeUnit("d")}>{t("days")}</Button>
                  <Button className={startRangeUnit== 'w' ? 'selected' : ''} onClick={() => setStartRangeUnit("w")}>{t("weeks")}</Button>
                  <Button className={startRangeUnit== 'M' ? 'selected' : ''} onClick={() => setStartRangeUnit("M")}>{t("months")}</Button>
                  <Button className={startRangeUnit== 'y' ? 'selected' : ''} onClick={() => setStartRangeUnit("y")}>{t("years")}</Button>
                </StyledButtonGroup>
              </div>
              <div className="buttons-section">
                <LanistaButton onClick={() => setMenuStartPosition(null)}>{t("cancel")}</LanistaButton>
                <LanistaButton onClick={() => handleStartDateChange(moment().subtract(startRangeValue, startRangeUnit))}>{t("ok")}</LanistaButton>
              </div>
            </TimeBlockSection>
          </NestedMenuItem>
          <NestedMenuItem
            parentMenuOpen={!!menuStartPosition}
            label={t("date")}
          >
            <MenuItem onClick={() => console.log("ON CLICK")}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="dd/MM/yyyy"
                  value={startValue > 1 ? startValue : new Date()}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </MenuItem>
          </NestedMenuItem>
          <MenuItem onClick={() => handleStartDateChange(new Date())}>{t("today")}</MenuItem>
          <MenuItem onClick={() => handleStartDateChange(-1)}>{t("allways")}</MenuItem>
          <MenuItem onClick={() => handleStartDateChange(0)}>{t("no_data")}</MenuItem>
        </Menu>
      </div>
      <div className="value-section">
        {getValue(t, startValue, endValue)}
      </div>
      <div className="end-section">
        <LanistaButton
          variant="outlined"
          className="emd-button"
          startIcon={endValue == 0 ? <AccessTimeIcon/> : <WatchLaterIcon />}
          onClick={onOpenEndMenu}
          style={{display: editable ? 'flex' : 'none'}}
        >
          {t("end")}
        </LanistaButton>
        <Menu
          open={!!menuEndPosition}
          anchorReference="anchorPosition"
          anchorPosition={menuEndPosition}
        >
          <NestedMenuItem
            parentMenuOpen={!!menuEndPosition}
            label={t("vor") + '...'}
          >
            <TimeBlockSection>
              <div className="select-section">
                <FormControl variant="outlined">
                  <Select
                    id="time-block-selection"
                    value={endRangeValue}
                    onChange={(event) => setEndRangeValue(event.target.value)}
                    menuStyle={{ maxHeight: 100, overflow: 'auto' }}
                  >
                    {getTimeRageMenuItems()}
                  </Select>
                </FormControl>
                <StyledButtonGroup
                  orientation="vertical"
                  color="primary"
                  aria-label="vertical outlined button group"
                >
                  <Button className={endRangeUnit== 'd' ? 'selected' : ''} onClick={() => setEndRangeUnit("d")}>{t("days")}</Button>
                  <Button className={endRangeUnit== 'w' ? 'selected' : ''} onClick={() => setEndRangeUnit("w")}>{t("weeks")}</Button>
                  <Button className={endRangeUnit== 'M' ? 'selected' : ''} onClick={() => setEndRangeUnit("M")}>{t("months")}</Button>
                  <Button className={endRangeUnit== 'y' ? 'selected' : ''} onClick={() => setEndRangeUnit("y")}>{t("years")}</Button>
                </StyledButtonGroup>
              </div>
              <div className="buttons-section">
                <LanistaButton onClick={() => setMenuEndPosition(null)}>{t("cancel")}</LanistaButton>
                <LanistaButton onClick={() => handleEndDateChange(moment().subtract(endRangeValue, endRangeUnit))}>{t("ok")}</LanistaButton>
              </div>
            </TimeBlockSection>
          </NestedMenuItem>
          <NestedMenuItem
            parentMenuOpen={!!menuEndPosition}
            label={t("date")}
          >
            <MenuItem onClick={() => console.log("ON CLICK")}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="dd/MM/yyyy"
                  value={endValue > 1 ? endValue : new Date()}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </MenuItem>
          </NestedMenuItem>
          <MenuItem onClick={() => handleEndDateChange(new Date())}>{t("today")}</MenuItem>
          <MenuItem onClick={() => handleEndDateChange(-1)}>{t("never")}</MenuItem>
          <MenuItem onClick={() => handleEndDateChange(0)}>{t("no_data")}</MenuItem>
        </Menu>
      </div>
    </InputField>
  )
}
