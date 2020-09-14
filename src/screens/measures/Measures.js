import * as React from "react";
import PropTypes from 'prop-types';
import { PureComponent } from "react";
import styled from 'styled-components';
import _ from 'lodash';
import { Grid, Tab, Icon, Statistic, List, Image, Card } from 'semantic-ui-react';
import {TestCard, GraphSection, TestResults, TestType, TableContent, TableHeader, DataTable, StyledTab, Stage, TestSelectList, TestsSelectionPanel} from './styles';

import Button from '../../components/LanistaButton';
import CustomizedAxisTick from './CustomizedAxisTick';
import CustomTooltip from './CustomTooltip';

import CaliperPane from './CaliperPane';
import BodyDataPane from './BodyDataPane';
import MeasurementsPane from './MeasurementsPane';
import TestsPane from './TestsPane';

import Slider from "react-slick";

import IconButton from '@material-ui/core/IconButton';
import BackIcon from '../../components/icons/Back';
import ForwardIcon from '../../components/icons/Forward';
import RemoveIcon from '../../components/icons/Remove';

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="nav-button-back">
      <IconButton component="span" onClick={onClick}>
        <BackIcon fontSize="large"/>
      </IconButton>
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="nav-button-prev">
      <IconButton component="span" onClick={onClick}>
        <ForwardIcon fontSize="large"/>
      </IconButton>
    </div>
  );
}

const Measures = ({
  customer,
  t,
  showDataAsChart,
  goToTest,
  goCreateTest,
  activeIndex,
  handleTabChange,
  showCreateTestMenu,
  closeCreateTestmenu,
  testsTypes,
  setSelectedRecord,

  onCreateTest,
  createTestLoading,
  createTestError,
}) =>  {

  const prepareTestData = (rawData) => {
    if( rawData ) {
      const testTypes = _.groupBy(rawData, (test) => test.name)
      return testTypes
    } else {
      return []
    }
  }

  const {measures, calipers, gender, birthday, tests} = customer
  prepareTestData(tests);

  const panes = [
    {
      menuItem: { key: 'weight',  content: t('body data') },
      render: () => <BodyDataPane t={t} showDataAsChart={showDataAsChart} calipers={calipers} setSelectedRecord={setSelectedRecord}/>
    },
    {
      menuItem: { key: 'caliper',  content: t('caliper') },
      render: () => <CaliperPane t={t} showDataAsChart={showDataAsChart} calipers={calipers} setSelectedRecord={setSelectedRecord} gender={gender} birthday={birthday}/>
    },
    {
      menuItem: { key: 'anamnese',  content: t('body circumferences') },
      render: () => <MeasurementsPane t={t} showDataAsChart={showDataAsChart} measures={measures} setSelectedRecord={setSelectedRecord}/>
    },
    {
      menuItem: { key: 'measures',  content: t('testings') },
      render: () => <TestsPane t={t} tests={tests} goToTest={goToTest}/>
    },
  ]

  const extra = (
    <a>
      <Icon name='user' />
      16 Friends
    </a>
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    className: 'test-type',
    nextArrow: <PrevArrow />,
    prevArrow: <NextArrow />,
  };

  return(
    <Stage>
      <StyledTab
        menu={{
          fluid: true,
          text: true,
        }}
        panes={panes}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
      <TestsSelectionPanel anchor="bottom" open={showCreateTestMenu} onClose={closeCreateTestmenu}>
        <div className="header-section">
          <IconButton component="span" onClick={closeCreateTestmenu}>
            <RemoveIcon />
          </IconButton>
        </div>
        <TestSelectList>
          <Slider {...settings}>
            {testsTypes && testsTypes.map((test, index) => {
              return (<div className="test-type">
                <TestCard index={index}>
                  <div className="test-image" style={{backgroundImage: 'url(' + test.imageUrl + ')'}}></div>
                  <div className="test-content">
                    <div className="test-label">{test.name}</div>
                    <div className="test-description">{test.description}</div>
                  </div>
                  <div onClick={() => {
                      onCreateTest(test.id);
                      closeCreateTestmenu();
                    }} className="test-select-button">
                    Select Test
                  </div>
                </TestCard>
              </div>)
            })}
          </Slider>
        </TestSelectList>
      </TestsSelectionPanel>
    </Stage>
  );
};

Measures.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * Function to translate content
  */
  customer: PropTypes.object,

  /**
   * Function to translate content
  */
  showDataAsChart: PropTypes.func,

  /**
   * Function to translate content
  */
  goToTest: PropTypes.func,

  /**
   * Function to translate content
  */
  goCreateTest: PropTypes.func,

  /**
   * Function to translate content
  */
  activeIndex: PropTypes.number,

  /**
   * Function to translate content
  */
  handleTabChange: PropTypes.func,

  /**
   * Function to translate content
  */
  showCreateTestMenu: PropTypes.func,

  /**
   * Function to translate content
  */
  closeCreateTestmenu: PropTypes.func,

  /**
   * Function to translate content
  */
  testsTypes: PropTypes.number,

  /**
   * Function to translate content
  */
  setSelectedRecord: PropTypes.func,

  /**
   * Function to translate content
  */
  onCreateTest: PropTypes.func,

  /**
   * Function to translate content
  */
  createTestLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  createTestError: PropTypes.object,
};

export default Measures;
