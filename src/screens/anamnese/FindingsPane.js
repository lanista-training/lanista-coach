import React, { useEffect, useState, useRef } from 'react';
import moment from "moment";
import { Pane, StyledFinding, FindingForm, GraphSection } from './styles';

import PlaceIcon from '@material-ui/icons/Place';
import HistoryIcon from '@material-ui/icons/History';
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';

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

const customIcons = {
  1: {
    icon: <DotsIcon1 />,
  },
  2: {
    icon: <DotsIcon2 />,
  },
  3: {
    icon: <DotsIcon3 />,
  },
  4: {
    icon: <DotsIcon4 />,
  },
  5: {
    icon: <DotsIcon5 />,
  },
  6: {
    icon: <DotsIcon6 />,
  }
};

const COLORS = [];
COLORS['TRAINER'] = '#34acfb';
COLORS['PHYSIO'] = '#fe9500';
COLORS['DOCTOR'] = '#59d76e';

const StyledRating = withStyles({
  iconFilled: {
    color: 'black',
  },
  iconHover: {
    color: 'black',
  },
})(Rating);

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

function IconContainer( { value, ...other }) {
  return <span {...other}>{customIcons[value].icon}</span>;
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
}) => {

  const {first_name, last_name, photoUrl} = finding.creator;
  const {creation_date} = finding;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(null);
    cleanupPanel();
    setRequestDeletion(false);
    setEditing(false);
    setHistory(false);
  };

  const [editing, setEditing] = useState( finding.id == undefined );
  const toggleEditing = () => setEditing(!editing);

  const [history, setHistory] = useState( false );
  const toggleHistory = () => setHistory(!history);

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

  useEffect(() => {
    const {title, description, rating, warning_flag, visible, start_date, end_date} = finding;
    setTitleValue(title);
    setDescriptionValue(description);
    setWarningFlagValue(warning_flag);
    setVisibleValue(visible);
    setStartDateValue(start_date);
    setEndDateValue(end_date);
    const lastRating = (rating && rating.length > 0) ? rating[0].value : null;
    setRatingValue(lastRating);

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
      setEditing(true);
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
    const {title, description, rating, warning_flag, visible, start_date, end_date} = finding;
    if( title != titleValue || description !=  descriptionValue || rating !=  ratingValue || warning_flag!= warningFlagValue || visible != visibleValue || start_date != startDateValue || end_date != endDateValue ) {
      setReadyToSave(true);
    } else {
      setReadyToSave(false);
    }
    if( ratingEditing ) onSaveButtonClick();
    if( timeEditing ) onSaveButtonClick();
    if( warningFlagEditing ) onSaveButtonClick();
    if( visibleEditing ) onSaveButtonClick();
  }, [titleValue, descriptionValue, ratingValue, warningFlagValue, visibleValue, startDateValue, endDateValue]);

  useEffect(() => {
    if( !saveFindingLoading ) {
      setEditing(false);
      setReadyToSave(false);
      if( (finding.id === undefined && readyToSave) || requestDeletion ) {
        cleanupPanel();
        handleClose();
      }
    }
  }, [saveFindingLoading])

  const onSaveButtonClick = () => {
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
  };

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
        setOpen();
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
            {!requestDeletion &&
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
                  onBlur={() => readyToSave ? onSaveButtonClick() : setTitleEditing(false)}
                  onKeyDown={(e) => e.keyCode == 13 && (readyToSave ? onSaveButtonClick() : setTitleEditing(false))}
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
                <div className="description-section" onClick={() => setDescriptionEditing(true)}>
                  <LanistaField
                    name="description-field"
                    id={"description-field"}
                    editing={editing || descriptionEditing}
                    value={(descriptionValue && descriptionValue.length > 0) ? descriptionValue : (editing || finding.id === undefined) ? '' : t("no_description")}
                    autoFocus={true}
                    multiline={true}
                    rows={2}
                    label={t("description")}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                    disabled={saveFindingLoading}
                    onBlur={() => readyToSave ? onSaveButtonClick() : setDescriptionEditing(false)}
                  />
                </div>
                <div
                  className={history ? "rating-section inverted" : ratingEditing ? "rating-section editing" : "rating-section"}
                  onClick={(e) => {
                    console.log(e.target.nodeName)
                    e.target.nodeName != 'LABEL' && e.target.nodeName != 'INPUT' && setRatingEditing(!ratingEditing)
                  }}
                >
                  <div className="rating-text">{t("finding_rating_" + (ratingValue + 1))}</div>
                  <StyledRating
                    name="customized-icons"
                    value={ratingValue + 1}
                    IconContainerComponent={IconContainer}
                    max={6}
                    readOnly={!ratingEditing && !editing}
                    size="large"
                    onChange={(e) => {
                      setRatingValue(e.target.value - 1);
                    }}
                    disabled={saveFindingLoading}
                  />
                </div>
                { history &&
                  <div className="history-section">
                    {renderGraphSection(finding.rating, t)}
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
          </div>
          <div className="buttons-section">
            <Button onClick={handleClose} color="primary">
              {t("close")}
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
            {editing && !readyToSave && !history &&
              <Button
                onClick={editing ? onSaveButtonClick : toggleEditing}
                color="primary"
                autoFocus
                inverted={readyToSave}
                disabled={editing && !readyToSave}
                loading={saveFindingLoading}
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
            setHistory(newValue == 1);
            setRequestDeletion(newValue == 2);
          }}
        >
          <BottomNavigationAction icon={<HomeIcon />} />
          <BottomNavigationAction icon={<HistoryIcon />} />
          <BottomNavigationAction icon={<DeleteIcon />} />
        </BottomNavigation>
      </FindingForm>
    }
  </>
}

export default ({
  me,

  id,

  t,
  findings,

  onSaveFinding,
  saveFindingLoading,
  saveFindingError,

  onCreateFinding,
  createFindingLoading,
  createFindingError,

  onDeleteFinding,
  deleteFindingLoading,
  deleteFindingError,
}) => {

  const [openFirst, setOpenFirst] = useState(id);

  const [imageRadio, setImageRadio] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);

  const [open, setOpen] = useState(null);

  const ref = useRef();

  useEffect(() => {

    if( ref.current ) {
      let newImageRadio = ref.current.offsetHeight/630;
      setImageRadio(newImageRadio);
      setMarginLeft((ref.current.offsetWidth - (750*newImageRadio))/2);
    }
  }, []);

  const onImagePanelClick = (e) => {
    if(e.target.id == "body-image") {
      let rect = e.target.getBoundingClientRect();
      const xPosition = e.clientX - rect.x;
      const yPosition = e.clientY - rect.y;
      const tmp = [...findings];
      tmp.push({
        position: {
          x: (xPosition - marginLeft)/imageRadio - (10),
          y: yPosition/imageRadio + (10),
        },
        creator: {
          first_name: me.first_name,
          id: me.id,
          last_name: me.last_name,
          photoUrl: me.photoUrl,
          role: me.role,
        },
        creation_date: (new Date()).getTime(),
        description: "",
        last_change: (new Date()).getTime(),
        rating: null,
        title: "",
        visible: false,
        warning_flag: false,
      })
      setFindingsOnScreen(tmp);
    }
  }

  const [findingsOnScreen, setFindingsOnScreen] = useState([]);

  useEffect(() => {
    if(findings && findings.length > 0 ) {
      setFindingsOnScreen(findings.slice(0));
    }
  }, [findings]);

  useEffect(() => {
    if(openFirst && findingsOnScreen && findingsOnScreen.length > 0 ) {
      const findingIndex = findingsOnScreen.findIndex(f => f.id == openFirst);
      //setOpen(findingIndex);
      setOpenFirst(undefined);
    }
  }, [findingsOnScreen]);

  const cleanupPanel = () => {
    setFindingsOnScreen(findings.slice(0));
  }

  return <Pane>
    <div className="image-wrapper">
      <div id="body-image" className="body-image" ref={ ref } onClick={onImagePanelClick}>
        {findingsOnScreen.map((finding, index) => {
          const {x, y} = finding.position;
          return <Finding
            t={t}
            finding={finding}
            top={y*imageRadio}
            left={(x*imageRadio) + marginLeft}
            color={COLORS[finding.creator.role]}
            setOpen={() => setOpen(index == open ? null : index)}
            open={index == open}

            onSaveFinding={onSaveFinding}
            saveFindingLoading={saveFindingLoading || createFindingLoading || deleteFindingLoading}
            saveFindingError={saveFindingError || createFindingError || deleteFindingError}

            onCreateFinding={onCreateFinding}

            onDeleteFinding={onDeleteFinding}

            cleanupPanel={cleanupPanel}
          />
        })}
      </div>
    </div>
  </Pane>
}
