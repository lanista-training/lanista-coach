import React, { useEffect, useState, useRef } from 'react';
import moment from "moment";

import { ModalForm, GraphSection, RatingSlider } from './styles';

import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Button from '../../components/LanistaButton';
import LanistaField from '../../components/LanistaField';
import LanistaTime from '../../components/LanistaTime';

import DotsIcon1 from '../../components/icons/DotsIcon1';
import DotsIcon2 from '../../components/icons/DotsIcon2';
import DotsIcon3 from '../../components/icons/DotsIcon3';
import DotsIcon4 from '../../components/icons/DotsIcon4';
import DotsIcon5 from '../../components/icons/DotsIcon5';
import DotsIcon6 from '../../components/icons/DotsIcon6';

import HistoryIcon from '@material-ui/icons/History';
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const CustomizedLabel = ({x, y, stroke, value, t}) => {
  return <text x={x} y={y-10} dy={-4} fill="black" fontSize={15} textAnchor="middle">{(value)}</text>;
}

const renderGraphSection = (graphData, t) => {

  const curatedDate = graphData.map(item => ({...item, label: moment(new Date(parseInt(item.date))).format("DD-MMMM-YYYY") }) );
  const available = graphData && graphData.length > 1;

  return(
    <GraphSection>
      {available ?
        <ResponsiveContainer>
          <LineChart
            data={curatedDate.reverse()}
            margin={{
              top: 50, right: 70, left: 70, bottom: 5,
            }}
          >
            <XAxis dataKey="label"/>
            <Line yAxisId="left" type="monotone" dataKey="value" name={t('score')}  strokeWidth={2} stroke="black" connectNulls label={<CustomizedLabel t={t} />}/>
          </LineChart>
        </ResponsiveContainer>
        :
        (<div className="no-data">{t("no_data_for_graph")}</div>)}
    </GraphSection>
  )
}

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


export default ({
  t,
  data,
  onClose,

  onSave,
  onDelete,
  loading,
  error,

}) => {

  const [showScale, setShowScale] = React.useState(false);

  const {id, creation_date, creator} = data ? data : {};
  const {first_name, last_name, photoUrl} = creator ? creator : {};

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
    setRequestDeletion(false);
    setEditing(false);
    setHistory(false);
    onClose();
  };

  const [editing, setEditing] = useState( id == undefined );
  const toggleEditing = () => setEditing(!editing);

  const [history, setHistory] = useState( false );
  const toggleHistory = () => setHistory(!history);

  const [requestDeletion, setRequestDeletion] = useState(false);
  const toggleRequestDeletion = () => setRequestDeletion(!requestDeletion);

  const [readyToSave, setReadyToSave] = useState(false);

  const [descriptionValue, setDescriptionValue] = useState('');
  const [descriptionEditing, setDescriptionEditing] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingEditing, setRatingEditing] = useState(false);
  const [warningFlagValue, setWarningFlagValue] = useState(false);
  const [warningFlagEditing, setWarningFlagEditing] = useState(false);
  const [startDateValue, setStartDateValue] = useState(0);
  const [endDateValue, setEndDateValue] = useState(0);
  const [timeEditing, setTimeEditing] = useState(false);

  useEffect(() => {
    const {description, warning_flag, rating, start_date, end_date} = data;
    setDescriptionValue(description);
    setWarningFlagValue(warning_flag);
    setStartDateValue(start_date > 0 ? new Date(parseInt(start_date)) : start_date );
    setEndDateValue(end_date > 0 ? new Date(parseInt(end_date)) : end_date);
    setRatingValue((rating && rating.length > 0) ? rating[0].value : null);

    setDescriptionEditing(false);
    setRatingEditing(false);
    setTimeEditing(false);
    setWarningFlagEditing(false);
    setReadyToSave(false);

  }, [data, editing]);

  useEffect(() => {
    if( descriptionEditing ) {
      setRatingEditing(false);
      setTimeEditing(false);
      setWarningFlagEditing(false);
    }
  }, [descriptionEditing]);

  useEffect(() => {
    if( ratingEditing ) {
      setDescriptionEditing(false);
      setTimeEditing(false);
      setWarningFlagEditing(false);
    }
  }, [ratingEditing]);

  useEffect(() => {
    if( timeEditing ) {
      setDescriptionEditing(false);
      setRatingEditing(false);
      setWarningFlagEditing(false);
    }
  }, [timeEditing]);

  useEffect(() => {
    if( warningFlagEditing ) {
      setDescriptionEditing(false);
      setRatingEditing(false);
      setTimeEditing(false);
    }
  }, [warningFlagEditing]);

  useEffect(() => {
    const { description, rating, warning_flag, start_date, end_date } = data;

    if( description !=  descriptionValue || rating !=  ratingValue || warning_flag!= warningFlagValue || start_date != startDateValue || end_date != endDateValue) {
      setReadyToSave(true);
    } else {
      setReadyToSave(false);
    }
    if( ratingEditing ) onSaveButtonClick();
    if( timeEditing ) onSaveButtonClick();
    if( warningFlagEditing ) onSaveButtonClick();
  }, [descriptionValue, ratingValue, warningFlagValue, startDateValue, endDateValue]);

  useEffect(() => {
    if( !loading ) {
      setEditing(false);
      setReadyToSave(false);
      if( (id === undefined && readyToSave) || requestDeletion ) {
        handleClose();
      }
    }
  }, [loading])

  const onSaveButtonClick = () => {
    onSave({
      itemId: data.id,
      description: descriptionValue,
      rating: ratingValue,
      warningFlag: warningFlagValue,
      startDate: startDateValue > 0 ? startDateValue : startDateValue + '',
      endDate: endDateValue > 0 ? endDateValue : endDateValue + '',
    });
  };

  const onDeleteButtonClick = () => {
    onDelete(data.id);
  };

  const [value, setValue] = React.useState(0);

  return <ModalForm
    id={'lifestyle-' + id}
    open={true}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'center',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'center',
      horizontal: 'center',
    }}
  >
    <div className={editing ? 'finding-form editing' : 'finding-form'}>
      <div className="header-section">
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
                disabled={loading}
                onBlur={() => readyToSave ? onSaveButtonClick() : setDescriptionEditing(false)}
                emptyText={t("no_description")}
              />
            </div>
            <div
              className={history ? "rating-section inverted" : ratingEditing ? "rating-section editing" : "rating-section"}
              onClick={(e) => {
                e.target.nodeName != 'LABEL' && e.target.nodeName != 'INPUT' && setRatingEditing(!ratingEditing)
              }}
            >
              <div className="rating-text">{t("frequency")}</div>
              { ratingValue === null && !showScale &&
                <Button onClick={() => setShowScale(true)}>
                  {t("NEW_VALUE")}
                </Button>
              }
              { (ratingValue !== null || showScale) &&
                <Slider
                  defaultValue={0}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks={marks}
                  min={0}
                  max={10}
                  value={ratingValue}

                  readOnly={!ratingEditing && !editing}
                  onChange={(event, newValue) => {
                    console.log("onChange", newValue);
                    setRatingValue(newValue);
                  }}
                  disabled={loading || !ratingEditing || editing}
                />
              }
            </div>
            { history &&
              <div className="history-section">
                {renderGraphSection(data.rating, t)}
              </div>
            }
            { !history &&
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
                    disabled={loading}
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
                    disabled={(!editing && !warningFlagEditing) || loading}
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
      </div>
      <div className="buttons-section">
        <Button onClick={handleClose} color="primary">
          {t("close")}
        </Button>
        {requestDeletion && data.id > 0 &&
          <Button
            onClick={requestDeletion ? onDeleteButtonClick : toggleRequestDeletion}
            color="primary"
            inverted={requestDeletion}
            loading={loading}
          >
            {t("delete")}
          </Button>
        }
        {editing && !readyToSave && !history &&
          <Button
            onClick={editing ? onSaveButtonClick : toggleEditing}
            color="primary"
            autoFocus
            inverted={readyToSave}
            disabled={editing && !readyToSave}
            loading={loading}
          >
            {editing ? t("save") : t("edit")}
          </Button>
        }
      </div>
    </div>
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setRequestDeletion(newValue == 1);
      }}
    >
      <BottomNavigationAction icon={<HomeIcon />} />
      <BottomNavigationAction icon={<DeleteIcon />} />
    </BottomNavigation>
  </ModalForm>
}
