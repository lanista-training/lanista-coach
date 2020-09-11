import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

import {Gallery} from './styles';

import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import OpenWithIcon from '@material-ui/icons/OpenWith';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Slider from "react-slick";

// Hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Fab
      size="small"
      onClick={onClick}
      className={className}>
        <NavigateNextIcon />
    </Fab>
  );

}

const SamplePrevArrow  = (props) => {
  const { className, style, onClick } = props;
  return (
    <Fab
      size="small"
      onClick={onClick}
      className={className}>
        <ArrowBackIosIcon />
    </Fab>
  );
}

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));


export default ({t, onClose}) => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [position, setPosition] = React.useState(null);
  const size = useWindowSize();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onExpand = (event) => {
    const {width, height} = size;
    const newPosition = {x: 10, y: ((height-60)*-1)};
    console.log(newPosition)
    setPosition(position ? null : newPosition);
  }

  return (
    <Draggable
      defaultPosition={{x: 160, y: (window.innerHeight / 2 * -1) - 65}}
      allowAnyClick={true}
      handle="#draggable-dialog-title"
      position={position}
      disabled={position !== null}
    >
      <Gallery width={position === null ? 600 : size.width - 20} height={position === null ? 400 : size.height - 125}>
        <div className="header" >
          <IconButton aria-label="expand" size="large" onClick={onExpand}>
            <OpenWithIcon fontSize="inherit" />
          </IconButton>
          <div className="dragable-area" id="draggable-dialog-title"></div>
          <IconButton aria-label="close" size="large" onClick={onClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div className="panel-wrapper">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab id="tab-1" label={t("body")} {...a11yProps(0)} />
            <Tab label={t("heart")} {...a11yProps(1)} />
            <Tab label={t("shoulder")} {...a11yProps(2)} />
            <Tab label={t("elbow")} {...a11yProps(3)} />
            <Tab label={t("hand")} {...a11yProps(4)} />
            <Tab label={t("spine")} {...a11yProps(5)} />
            <Tab label={t("hips")} {...a11yProps(6)} />
            <Tab label={t("knee")} {...a11yProps(7)} />
            <Tab label={t("food")} {...a11yProps(8)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Slider {...sliderSettings}>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/bodyMuskels.png)'}}></div>
              </div>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/bodyBones.png)'}}></div>
              </div>
            </Slider>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Slider {...sliderSettings}>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/01Herz.jpg)'}}></div>
              </div>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/02Herz.jpg)'}}></div>
              </div>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/03Herz.jpg)'}}></div>
              </div>
            </Slider>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Slider {...sliderSettings}>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/04Schulter.jpg)'}}></div>
              </div>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/05Schulter.jpg)'}}></div>
              </div>
            </Slider>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/06Ellenbogen.jpg)'}}></div>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/07Hand.jpg)'}}></div>
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Slider {...sliderSettings}>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/07WS.jpg)'}}></div>
              </div>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/08WS.jpg)'}}></div>
              </div>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/09WK.jpg)'}}></div>
              </div>
            </Slider>
          </TabPanel>
          <TabPanel value={value} index={6}>
            <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/10Huefte.jpg)'}}></div>
          </TabPanel>
          <TabPanel value={value} index={7}>
            <Slider {...sliderSettings}>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/11Knie.jpg)'}}></div>
              </div>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/12Knie.jpg)'}}></div>
              </div>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/13Knie.jpg)'}}></div>
              </div>
            </Slider>
          </TabPanel>
          <TabPanel value={value} index={8}>
            <Slider {...sliderSettings}>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/14Fuss.jpg)'}}></div>
              </div>
              <div className="anatomy-image-wrapper">
                <div className="anatomy-image" style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/anatomy/15Fuss.jpg)'}}></div>
              </div>
            </Slider>
          </TabPanel>
        </div>
      </Gallery>
    </Draggable>
  )

}
