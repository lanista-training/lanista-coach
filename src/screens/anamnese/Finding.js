import React, { useEffect, useState, useRef } from 'react';
import { useTranslate } from '../../hooks/Translation';
import moment from "moment";
import { Pane, StyledFinding, FindingForm, GraphSection, RatingSlider, RatingPopover } from './styles';

import PlaceIcon from '@material-ui/icons/Place';
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';

import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Button from '../../components/LanistaButton';
import LanistaField from '../../components/LanistaField';
import LanistaTime from '../../components/LanistaTime';
import Popper from '@material-ui/core/Popover';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine} from 'recharts';

import NotesList from './NotesList';

//
// RATING FIELD
//
const Slider = withStyles({
  root: {
    color: 'black',
  },
  })(RatingSlider);

function valuetext(value) {
  return `${value}`;
}

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },
];


const AnamneseSwitch = withStyles({
  switchBase: {
    color: grey[300],
    '&$checked': {
      color: 'black',
    },
    '&$checked + $track': {
      backgroundColor: grey[500],
    },
  },
  checked: {},
  track: {},
})(Switch);


const CustomizedLabel = ({x, y, stroke, value, t}) => {
  return <text x={x} y={y-10} dy={-4} fill="black" fontSize={15} textAnchor="middle">{(value)}</text>;
}

const renderGraphSection = (
  graphData,
   t,
   selectedDate,
   setSelectedDate,
   therapies,
 ) => {

  const curatedDate = graphData && graphData.map(item => ({...item, label: moment(new Date(parseInt(item.date))).format("DD-MMMM-YYYY") }) );
  const available = graphData && graphData.length > 1;
  const onChartClick = (event) => {
    if( event ) {
      const {activePayload} = event;
      const {payload} = activePayload[0];
      const selectedDate = new Date(parseInt(payload.date))
      setSelectedDate(selectedDate)
    }
  }

  return(
    <GraphSection>
      {available ?
        <ResponsiveContainer>
          <LineChart
            data={curatedDate.reverse()}
            margin={{
              top: 50, right: 70, left: 70, bottom: 5,
            }}
            onClick={onChartClick}
          >
            <XAxis dataKey="label"/>
            <YAxis
              axisLine={false}
              type="number"
              hide
            />
            <Line
              type="monotone"
              dataKey="value"
              name={t('score')}
              strokeWidth={2}
              stroke="black"
              connectNulls
              label={<CustomizedLabel t={t} />
            }/>
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
        :
        (<div className="no-data">{t("no_data_for_graph")}</div>)}
    </GraphSection>
  )
}

const RatingButton = ({
  ratingEditing,
  setRatingEditing,
  ratingValue,
  setRatingValue,
  showScale,
  valuetext,
  marks,
  editing,
  saveFindingLoading,
}) => {

  const {t} = useTranslate("anamnese");
  const [anchorButtonEl, setButtonAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setButtonAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setButtonAnchorEl(null);
  };
  const open = Boolean(anchorButtonEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    handleClose();
  }, [saveFindingLoading]);

  return (
    <div
      className="rating-section-button"
    >
      <div className="button-content" onClick={handleClick}>
        <div className="rating-text">{t("intensity")}</div>
        {ratingValue === null ? t("NEW_VALUE") : ratingValue}
      </div>
      <RatingPopover
        id={id}
        open={open}
        anchorEl={anchorButtonEl}
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
        <Slider
          orientation="vertical"
          defaultValue={0}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={0}
          max={10}
          value={ratingValue}
          onChange={(event, newValue) => {
            console.log("onChange", newValue);
            setRatingValue(newValue);
          }}
        />
      </RatingPopover>
    </div>
  )
}

const StatusButton = ({
  onToggleAnamneseStatus,
  toggleAnamneseStatusLoading,
  toggleAnamneseStatusErro,
  status,
  id,
}) => {
  const {t} = useTranslate("anamnese");
  return (
    <div
      className={"rating-section-button status-switch"}
    >
      <div className="button-content">
        <div className="rating-text">{t("STATUS_FALSE")}</div>
        <AnamneseSwitch
          size="small"
          checked={status ? status : false}
          onChange={onToggleAnamneseStatus}
          name="checkedA"
        />
      <div className={status ? "rating-text active" : "rating-text"}>{t("STATUS_TRUE")}</div>
      </div>
    </div>
  )
}

const Finding = ({
  t,
  finding,
  top,
  left,
  color,
  open,
  setOpen,

  onSaveFinding,
  saveFindingLoading,
  saveFindingError,

  onCreateFinding,

  onDeleteFinding,

  cleanupPanel,

  onSaveAnamneseNote,
  saveAnamneseNoteLoading,
  saveAnamneseNoteError,

  onDeleteAnamneseNote,
  deleteAnamneseNoteLoading,
  deleteAnamneseNoteError,

  onToggleAnamneseStatus,
  toggleAnamneseStatusLoading,
  toggleAnamneseStatusError,

}) => {

  const [showScale, setShowScale] = React.useState(false);

  const {first_name, last_name, photoUrl} = finding.creator;
  const {creation_date} = finding;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(null);
    cleanupPanel();
    setSettings(false);
    setCreateNoteMode(false);
  };

  const editing = finding.id == undefined;

  const [settings, setSettings] = useState( false );
  const toggleSettings = () => setSettings(!settings);

  const [note, setNote] = useState('');
  const [createNoteMode, setCreateNoteMode] = useState( false );
  const toggleCreateNoteMode = () => setCreateNoteMode(!createNoteMode);
  const [readyToSaveNote, setReadyToSaveNote] = useState( false );
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [requestDeletion, setRequestDeletion] = useState(false);
  const toggleRequestDeletion = () => setRequestDeletion(!requestDeletion);

  const [readyToSave, setReadyToSave] = useState(false);

  const [titleValue, setTitleValue] = useState('');
  const [titleEditing, setTitleEditing] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [descriptionEditing, setDescriptionEditing] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingEditing, setRatingEditing] = useState(false);
  const [warningFlagValue, setWarningFlagValue] = useState(false);
  const [warningFlagEditing, setWarningFlagEditing] = useState(false);
  const [visibleValue, setVisibleValue] = useState(false);
  const [visibleEditing, setVisibleEditing] = useState(false);
  const [startDateValue, setStartDateValue] = useState(0);
  const [endDateValue, setEndDateValue] = useState(0);
  const [timeEditing, setTimeEditing] = useState(false);
  const [statusValue, setStatusValue] = useState(false);

  const [titleErrorMessage, setTitleErrorMessage] = useState(null);

  useEffect(() => {
    const {title, description, rating, warning_flag, visible, start_date, end_date, status} = finding;
    setTitleValue(title);
    setDescriptionValue(description);
    setWarningFlagValue(warning_flag);
    setVisibleValue(visible);
    setStartDateValue(start_date);
    setEndDateValue(end_date);
    const lastRating = (rating && rating.length > 0) ? rating[0].value : null;
    setRatingValue(lastRating);
    setStatusValue(status)

    setTitleEditing(false);
    setDescriptionEditing(false);
    setRatingEditing(false);
    setTimeEditing(false);
    setWarningFlagEditing(false);
    setVisibleEditing(false);
    setReadyToSave(false);

    if( finding.id > 0 ) {
      finding.id == undefined && console.log("editing finding")
    } else {
      setAnchorEl(pinEl.current);
      setOpen(true);
    }
  }, [finding, editing]);

  useEffect(() => {
    if( titleEditing ) {
      setDescriptionEditing(false);
      setRatingEditing(false);
      setTimeEditing(false);
      setWarningFlagEditing(false);
      setVisibleEditing(false);
    }
  }, [titleEditing]);

  useEffect(() => {
    if( descriptionEditing ) {
      setTitleEditing(false);
      setRatingEditing(false);
      setTimeEditing(false);
      setWarningFlagEditing(false);
      setVisibleEditing(false);
    }
  }, [descriptionEditing]);

  useEffect(() => {
    if( ratingEditing ) {
      setTitleEditing(false);
      setDescriptionEditing(false);
      setTimeEditing(false);
      setWarningFlagEditing(false);
      setVisibleEditing(false);
    }
  }, [ratingEditing]);

  useEffect(() => {
    if( timeEditing ) {
      setTitleEditing(false);
      setDescriptionEditing(false);
      setRatingEditing(false);
      setWarningFlagEditing(false);
      setVisibleEditing(false);
    }
  }, [timeEditing]);

  useEffect(() => {
    if( warningFlagEditing ) {
      setTitleEditing(false);
      setDescriptionEditing(false);
      setRatingEditing(false);
      setTimeEditing(false);
      setVisibleEditing(false);
    }
  }, [warningFlagEditing]);

  useEffect(() => {
    if( visibleEditing ) {
      setTitleEditing(false);
      setDescriptionEditing(false);
      setRatingEditing(false);
      setTimeEditing(false);
      setWarningFlagEditing(false);
    }
  }, [visibleEditing]);

  useEffect(() => {
    console.log("open");
    setValue(0);
    setSettings(false);
    setRequestDeletion(false);
  }, [open]);

  useEffect(() => {
    const {title, description, rating, warning_flag, visible, start_date, end_date, status} = finding;
    setTitleErrorMessage(null);
    if( (rating && rating[0].value != ratingValue ) || warning_flag!= warningFlagValue || visible != visibleValue || start_date != startDateValue || end_date != endDateValue || status != statusValue ) {
      titleValue !== "" && onSaveButtonClick();
      //onSaveButtonClick();
    } else if(title != titleValue || description !=  descriptionValue) {
      setReadyToSave(true);
    } else {
      setReadyToSave(false);
    }
  }, [titleValue, descriptionValue, ratingValue, warningFlagValue, visibleValue, startDateValue, endDateValue, statusValue]);

  useEffect(() => {
    if( !saveFindingLoading ) {
      if( requestDeletion ) {
        cleanupPanel();
        handleClose();
      }
    }
  }, [saveFindingLoading])

  useEffect(() => {
    saveAnamneseNoteLoading && setCreateNoteMode(false);
  }, [saveAnamneseNoteLoading]);

  const onSaveButtonClick = () => {
    if( titleValue.length === 0 ) {
      setTitleErrorMessage(t("title is mandatory"));
    } else {
      if( finding.id > 0 ) {
        onSaveFinding({
          id: finding.id,
          title: titleValue,
          description: descriptionValue,
          rating: ratingValue,
          warningFlag: warningFlagValue,
          visible: visibleValue,
          startDate: startDateValue,
          endDate: endDateValue,
        });
      } else {
        const {x, y} = finding.position;
        onCreateFinding({
          title: titleValue,
          xPosition: x,
          yPosition: y,
          description: descriptionValue,
          rating: ratingValue,
          warningFlag: warningFlagValue,
          visible: visibleValue,
          startDate: startDateValue,
          endDate: endDateValue,
        });
      }
    }
  };

  const onSaveAnamneseNoteButtonClick = () => {
    onSaveAnamneseNote(finding.id, note, selectedDate);
  }

  const onDeleteButtonClick = () => {
    onDeleteFinding({
      id: finding.id,
    });
  };

  const pinEl = useRef(null);

  const [value, setValue] = React.useState(0);

  return <>
    <StyledFinding
      aria-label="finding"
      aria-describedby={'finding-' + finding.id}
      top={top}
      left={left}
      color={color}
      onClick={(event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true);
      }}
      ref={pinEl}
    >
      <PlaceIcon />
    </StyledFinding>
    {open &&
      <FindingForm
        id={'finding-' + finding.id}
        open={open}
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
        <div className={editing ? 'finding-form editing' : 'finding-form'}>
          <div className="header-section">
            {!requestDeletion  &&
              <div className="title-section" onClick={() => setTitleEditing(true)}>
                <LanistaField
                  name="title-field"
                  id={"title-field"}
                  editing={editing || titleEditing}
                  value={titleValue}
                  autoFocus={true}
                  label={t("name")}
                  onChange={(e) => setTitleValue(e.target.value)}
                  disabled={saveFindingLoading}
                  onKeyDown={(e) => e.keyCode == 13 && (readyToSave ? onSaveButtonClick() : setTitleEditing(false))}
                  emptyText={t("name")}
                  error={titleErrorMessage !== null}
                  helperText={titleErrorMessage}
                />
              </div>
            }
            <div className="author-section">
              <div className="text-section">
                <div className="name-section">{first_name} {last_name}</div>
                <div className="date-section">{moment(new Date(Number(creation_date))).format("DD. MMM YYYY")}</div>
              </div>
              <div className="avatar-section" style={{backgroundImage: 'url(' + photoUrl + ')'}}/>
            </div>
          </div>
          <div className="content-section">
            { !requestDeletion &&
              <>
                { !settings &&
                  <>
                    <div className="description-section" onClick={() => setDescriptionEditing(true)}>
                      <LanistaField
                        name="description-field"
                        id={"description-field"}
                        editing={editing || descriptionEditing}
                        value={(descriptionValue && descriptionValue.length > 0) ? descriptionValue : ''}
                        multiline={true}
                        rows={2}
                        label={t("description")}
                        onChange={(e) => setDescriptionValue(e.target.value)}
                        disabled={saveFindingLoading}
                        emptyText={t("no_description")}
                      />
                    </div>
                    { !editing &&
                      <div className="form-row">
                        <RatingButton
                          ratingEditing={ratingEditing}
                          setRatingEditing={setRatingEditing}
                          ratingValue={ratingValue}
                          setRatingValue={setRatingValue}
                          showScale={showScale}
                          valuetext={valuetext}
                          marks={marks}
                          editing={editing}
                          saveFindingLoading={saveFindingLoading}
                        />
                        <StatusButton
                          status={statusValue}
                          onToggleAnamneseStatus={() => onToggleAnamneseStatus(finding.id)}
                          toggleAnamneseStatusLoading={toggleAnamneseStatusLoading}
                          toggleAnamneseStatusError={toggleAnamneseStatusError}
                        />
                      </div>
                    }
                  </>
                }


                { !settings && !editing &&
                  <div className="history-section">
                    {renderGraphSection(finding.rating, t, selectedDate, setSelectedDate, finding ? finding.notes : [])}
                  </div>
                }
                { settings &&
                  <>
                    <div className={ timeEditing ? "time-section editing" : "time-section" } onClick={(e) => {
                      !timeEditing && setTimeEditing(true)
                    }}>
                      <div className="time-text" onClick={() => timeEditing && setTimeEditing(false)}>{t("time_entry")}</div>
                      <LanistaTime
                        t={t}
                        name="time-fields"
                        startValue={startDateValue}
                        endValue={endDateValue}
                        readOnly={!editing || !timeEditing}
                        onStartChange={setStartDateValue}
                        onEndChange={setEndDateValue}
                        disabled={saveFindingLoading}
                        editable={timeEditing || editing}
                      />
                    </div>
                    <div className={ warningFlagEditing ? "editing importance-section" : "importance-section" } onClick={(e) => {
                      !warningFlagEditing && setWarningFlagEditing(true)
                    }}>
                      <div
                        className="importance-text"
                        onClick={() => warningFlagEditing && setWarningFlagEditing(false)}
                      >
                        {t("importance_rating_" + (warningFlagValue ? 'yes'  : 'no'))}
                      </div>
                      <AnamneseSwitch
                        checked={warningFlagValue}
                        name="warniing-flat"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        size="small"
                        disabled={(!editing && !warningFlagEditing) || saveFindingLoading}
                        onChange={(e) => setWarningFlagValue(e.target.checked)}
                      />
                    </div>
                  </>
                }
              </>
            }

            { requestDeletion &&
              <div className="request-deletion">
                <div>{t("delete_finding")}</div>
              </div>
            }

            { !settings && !editing &&
              <div className="notes-list-section hide-scrollbar">
                <NotesList
                  createNoteMode={createNoteMode}
                  notes={finding ? finding.notes : []}
                  readyToSaveNote={readyToSaveNote}
                  setReadyToSaveNote={setReadyToSaveNote}

                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}

                  note={note}
                  setNote={setNote}

                  onSaveAnamneseNote={onSaveAnamneseNote}
                  saveAnamneseNoteLoading={saveAnamneseNoteLoading}
                  saveAnamneseNoteError={saveAnamneseNoteError}

                  onDeleteAnamneseNote={onDeleteAnamneseNote}
                  deleteAnamneseNoteLoading={deleteAnamneseNoteLoading}
                  deleteAnamneseNoteError={deleteAnamneseNoteError}
                />
              </div>
            }
          </div>

          <div className="buttons-section">
            <Button onClick={createNoteMode ? toggleCreateNoteMode : handleClose} color="primary">
              {createNoteMode ? t("cancel") : t("close")}
            </Button>
            {requestDeletion && finding.id > 0 &&
              <Button
                onClick={requestDeletion ? onDeleteButtonClick : toggleRequestDeletion}
                color="primary"
                inverted={requestDeletion}
                loading={saveFindingLoading}
              >
                {t("delete")}
              </Button>
            }
            { editing && !settings &&
              <Button
                onClick={onSaveButtonClick}
                color="primary"
                autoFocus
                inverted={readyToSave}
                disabled={!readyToSave}
                loading={saveFindingLoading}
              >
                {editing ? t("save") : t("edit")}
              </Button>
            }
            { !settings && !editing && !requestDeletion &&
              <Button
                onClick={createNoteMode ? onSaveAnamneseNoteButtonClick : toggleCreateNoteMode}
                color="primary"
                inverted={readyToSaveNote}
                loading={saveAnamneseNoteLoading}
              >
                {createNoteMode ? t("SAVE_PHYSIO_TREATMENT") : t("PHYSIO_TREATMENT")}
              </Button>
            }
          </div>
        </div>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            if( !editing ){
              setValue(newValue);
              setSettings(newValue == 1);
              setRequestDeletion(newValue == 2);
            } else {
              return false;
            }
          }}
        >
          <BottomNavigationAction icon={<HomeIcon />} />
          <BottomNavigationAction icon={<SettingsIcon />} />
          <BottomNavigationAction icon={<DeleteIcon />} />
        </BottomNavigation>
      </FindingForm>
    }
  </>
}

export default Finding;
