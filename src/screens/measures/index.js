import React, { useEffect, useState } from 'react';
import { useTranslate } from '../../hooks/Translation';
import _ from 'lodash';
import moment from "moment";
//import Router from 'next/router';
import Scene from "../../components/Scene";
import Measures from './Measures';
import CustomerHeader from "../../components/CustomerHeader";
import Dialog from "../../components/LanistaDialog";
import Button from "../../components/LanistaButton";

import {StyledDrawer, StyledDialog} from "./styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import DialogTitle from '@material-ui/core/DialogTitle';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';

import BodyDataForm from './BodyDataForm';
import CaliperForm from './CaliperForm';
import MeasurementsForm from './MeasurementsForm';

import withData from "./DataProvider";

import Help from '../../components/icons/Help';
import Tools from '../../components/icons/Tools';
import Back from '../../components/icons/Back';
import Plus from '../../components/icons/Plus';
import ListIcon from '../../components/icons/List';
import Chart from '../../components/icons/Chart';
import Export from '../../components/icons/Export';

const findLastCaliperValues = (records) => {
  let lastAbs = 0;
  let lastAuxiliar = 0;
  let lastChest = 0;
  let lastQuads = 0;
  let lastScapula = 0;
  let lastSprailium = 0;
  let lastTrizeps = 0;

  if( records && records.length > 0) {
    let allRecordsFound = false;
    for(var i = records.length - 1; i >= 0 && !allRecordsFound; i--) {
      lastAbs = !(lastAbs > 0) && records[i].abs ? records[i].abs : lastAbs;
      lastAuxiliar = lastAuxiliar === 0 && records[i].auxiliar ? records[i].auxiliar : lastAuxiliar;
      lastChest = lastChest === 0 && records[i].chest ? records[i].chest : lastChest;
      lastQuads = lastQuads === 0 && records[i].quads ? records[i].quads : lastQuads;
      lastScapula = lastScapula === 0 && records[i].scapula ? records[i].scapula : lastScapula;
      lastSprailium = lastSprailium === 0 && records[i].sprailium ? records[i].sprailium : lastSprailium;
      lastTrizeps = lastTrizeps === 0 && records[i].trizeps ? records[i].trizeps : lastTrizeps;
      if( lastAbs > 0 && lastAuxiliar > 0 && lastChest > 0 && lastQuads > 0 && lastScapula > 0 && lastSprailium > 0 && lastTrizeps > 0) {
        allRecordsFound = true;
      }
    }
  }

  return {
    abs: lastAbs,
    auxiliar: lastAuxiliar,
    chest: lastChest,
    quads: lastQuads,
    scapula: lastScapula,
    sprailium: lastSprailium,
    trizeps: lastTrizeps,
  }
}

const findLastMeasuresValues = (records) => {
  let lastArmRight = 0;
  let lastArmLeft = 0;
  let lastWaist = 0;
  let lastUmbilical = 0;
  let lastChest = 0;
  let lastSpinaIlicaAnt = 0;
  let lastWideHips = 0;
  let lastQuadsRight = 0;
  let lastQuadsLeft = 0;

  if( records && records.length > 0) {
    let allRecordsFound = false;
    for(var i = records.length - 1; i >= 0 && !allRecordsFound; i--) {
      lastArmRight = !(lastArmRight > 0) && records[i].arm_right ? records[i].arm_right : lastArmRight;
      lastArmLeft = lastArmLeft === 0 && records[i].arm_left ? records[i].arm_left : lastArmLeft;
      lastWaist = lastWaist === 0 && records[i].waist ? records[i].waist : lastWaist;
      lastUmbilical = lastUmbilical === 0 && records[i].umbilical ? records[i].umbilical : lastUmbilical;
      lastChest = lastChest === 0 && records[i].chest ? records[i].chest : lastChest;
      lastSpinaIlicaAnt = lastSpinaIlicaAnt === 0 && records[i].spina_ilica_ant ? records[i].spina_ilica_ant : lastSpinaIlicaAnt;
      lastWideHips = lastWideHips === 0 && records[i].wide_hips ? records[i].wide_hips : lastWideHips;
      lastQuadsRight = lastQuadsRight === 0 && records[i].quads_right ? records[i].quads_right : lastQuadsRight;
      lastQuadsLeft = lastQuadsLeft === 0 && records[i].quads_left ? records[i].quads_left : lastQuadsLeft;
      if( lastArmRight > 0 && lastArmLeft > 0 && lastWaist > 0 && lastUmbilical > 0 && lastChest > 0 && lastSpinaIlicaAnt > 0 && lastWideHips > 0  && lastQuadsRight > 0  && lastQuadsLeft > 0) {
        allRecordsFound = true;
      }
    }
  }

  return {
    arm_right: lastArmRight,
    arm_left: lastArmLeft,
    waist: lastWaist,
    umbilical: lastUmbilical,
    chest: lastChest,
    spina_ilica_ant: lastSpinaIlicaAnt,
    wide_hips: lastWideHips,
    lastQuadsRight: lastQuadsRight,
    lastQuadsLeft: lastQuadsLeft,
  }

}

const Panel = ({
  tabIndex,
  setTabIndex,

  memberId,

  tests,
  testsLoading,
  testsError,

  member,
  memberLoading,
  memberError,

  saveValues,
  saveValuesLoading,
  saveValuesError,

  createTest,
  createTestLoading,
  createTestError,

  generateMeasuresPdf,
  generateMeasuresPdfLoading,
  generateMeasuresPdfError,

  sendMeasuresPdf,
  sendMeasuresPdfLoading,
  sendMeasuresPdfError,

  goBack,
  goToTest,
  goToSetup,

}) => {
  const {t} = useTranslate("measures");

  //
  // Share Measure Drawler
  //
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);


  const handleTabChange = (e, { activeIndex }) => {
    setTabIndex(activeIndex);
  }

  const closeCreateTestmenu = () => {
    setShowCreateTestMenu(false);
  }

  /*
  const goToTest = (testData) => {
    Router.push({
      pathname: '/test',
      query: {
        memberId: memberId,
        testType: testData.testtype,
        testId: testData.id,
      }
    });
  }
  */

  const changeDataPresentation = () => {
    setShowDataAsChart(!showDataAsChart);
  }

  const getCommandsRight = () => {
    if( tabIndex == 3 ){
      return ([{
        icon: <Plus/>,
        text: t("create_test"),
        type: 'type-1',
        typex: 'Ionicons',
        name: 'new measure',
        onTap: () => {
          console.log("Create Test");
          setShowCreateTestMenu(true);
        }
      }]);
    } else {
      return ([{
        icon: <Plus/>,
        text: t('create_measure'),
        type: 'type-1',
        typex: 'Ionicons',
        name: 'new measure',
        onTap: () => {
          console.log("Create Measure");
          handleCreateMeasuresDialogOpen();
        }
      }, {
        icon: showDataAsChart ? <ListIcon/> : <Chart/>,
        text: showDataAsChart ? t("show_as_list") : t("show_as_chart"),
        type: 'type-1',
        typex: 'Ionicons',
        name: 'folder',
        onTap: () => {
          changeDataPresentation();
        }
      }, {
        icon: <Export/>,
        text: t("export_document"),
        type: 'type-1',
        typex: 'Ionicons',
        name: 'last',
        onTap: () => {
          toggleDrawer();
        }
      }]);
    }

  }

  const getCommandsLeft = () => {
    return ([{
        icon: <Back/>,
        iosname: 'tools-inactive',
        text: '',
        type: 'type-1',
        typex: 'Ionicons',
        name: 'back',
        style: {color: '#34acfb'},
        onTap: () => {
          goBack();
        }
    }]);
  }

  const [processing, setProcessing] = useState(false);
  const [showDataAsChart, setShowDataAsChart] = useState(true);
  const [showCreateTestMenu, setShowCreateTestMenu] = useState(false);

  //
  // create measures dialog
  //
  const [createMeasuresDialogOpen, setCreateMeasuresDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const handleCreateMeasuresDialogOpen = () => {
    setCreateMeasuresDialogOpen(true);
  };
  const handleCreateMeasuresDialogClose = () => {
    setCreateMeasuresDialogOpen(false);
  };

  useEffect(() => {
    if( selectedRecord === null ) {

    } else {
      handleCreateMeasuresDialogOpen();
    }
  }, [selectedRecord]);

  useEffect(() => {
    !createMeasuresDialogOpen && setSelectedRecord(null);
  }, [createMeasuresDialogOpen]);

  const getForm = () => {
    if( tabIndex == 0 ) {
      const {calipers} = member;
      const lastRecord = calipers && calipers.length > 0 ? {...calipers[selectedRecord === null ? calipers.length - 1 : selectedRecord]} : null;
      if( selectedRecord === null && lastRecord ) {
        lastRecord.target_date = null;
      }
      return <>
        <DialogTitle id="alert-dialog-title">{t("body data")}</DialogTitle>
        <DialogContent>
          <BodyDataForm
            t={t}
            lastRecord={lastRecord}
            onClose={handleCreateMeasuresDialogClose}
            onSave={onSaveValues}
            loading={saveValuesLoading}
            error={saveValuesError}
          />
        </DialogContent>
      </>
  } else if( tabIndex == 1 ) {
      const {calipers} = member;
      const lastRecord = calipers && calipers.length > 0 ? selectedRecord === null ? findLastCaliperValues(calipers) : calipers[selectedRecord] : null;
      if( selectedRecord === null && lastRecord ) {
        lastRecord.target_date = null;
      }
      return <>
        <DialogTitle id="alert-dialog-title">{t("caliper")}</DialogTitle>
        <DialogContent>
          <CaliperForm
            t={t}
            lastRecord={lastRecord}
            onClose={handleCreateMeasuresDialogClose}
            onSave={onSaveValues}
            loading={saveValuesLoading}
            error={saveValuesError}
          />
        </DialogContent>
      </>
  } else if( tabIndex == 2 ) {
      const {measures} = member;
      const lastRecord = measures && measures.length > 0 ? selectedRecord === null ? findLastMeasuresValues(measures) : measures[selectedRecord] : null;
      //if( selectedRecord === null ) {
      //  lastRecord.target_date = null;
      //}
      return <>
        <DialogTitle id="alert-dialog-title">{t("body circumferences")}</DialogTitle>
        <DialogContent>
          <MeasurementsForm
            t={t}
            lastRecord={lastRecord}
            onClose={handleCreateMeasuresDialogClose}
            onSave={onSaveValues}
            loading={saveValuesLoading}
            error={saveValuesError}
          />
        </DialogContent>
      </>
    }
  }

  const onSaveValues = (date, values, note) => {
    saveValues({
      variables: {
        date: date,
        data: values,
        memberId: memberId,
        note: note,
      }
    })
  }

  const onCreateTest = (testType) => {
    createTest({
      variables: {
        memberId: memberId,
        testType: testType,
      }
    })
  }

  const onGenerateMeasuresPdf = () => {
    generateMeasuresPdf({
      variables: {
        memberId: memberId,
      }
    })
  }

  const onSendMeasuresPdf = () => {
    sendMeasuresPdf({
      variables: {
        memberId: memberId,
      }
    });
    setGeneratingPdf(true);
  }
  const [generatingPdf, setGeneratingPdf] = useState(false);


  return (
    <Scene
      commandsLeft={getCommandsLeft()}
      commandsRight={getCommandsRight()}
      processing={processing}
      headerChildren={
        <CustomerHeader
          firstName={member ? member.first_name : ''}
          lastName={member ? member.last_name : ''}
          photoUrl={member ? member.photoUrl : ''}
          editable={false}
        />
      }
      t={t}
      goToSetup={goToSetup}
    >
      <Measures
        customer={member ? member : {}}
        t={t}
        showDataAsChart={showDataAsChart}
        goToTest={goToTest}

        activeIndex={tabIndex}
        handleTabChange={handleTabChange}
        showCreateTestMenu={showCreateTestMenu}
        closeCreateTestmenu={closeCreateTestmenu}

        testsTypes={tests}
        setSelectedRecord={setSelectedRecord}

        onCreateTest={onCreateTest}
        createTestLoading={createTestLoading}
        createTestError={createTestError}
      />


      { createMeasuresDialogOpen &&
        <Dialog
          open={createMeasuresDialogOpen}
          onClose={handleCreateMeasuresDialogClose}
        >
          {getForm()}
        </Dialog>
      }

      { generatingPdf &&
        <StyledDialog
          open={generatingPdf}
          onClose={() => setGeneratingPdf(false)}
        >
          { sendMeasuresPdfLoading && !sendMeasuresPdfError &&
            <>
              <CircularProgress color="inherit" />
              <div className="loading-message">{t("generating-email")}</div>
            </>
          }
          { !sendMeasuresPdfLoading && !sendMeasuresPdfError &&
            <>
              <CheckIcon />
              <div className="loading-message">{t("email-sent")}</div>
                <Button onClick={() => setGeneratingPdf(false)}>
                  OK
                </Button>
            </>
          }
        </StyledDialog>
      }

      <StyledDrawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer()}>
        <div
          role="presentation"
          onClick={() => toggleDrawer()}
          onKeyDown={() => toggleDrawer()}
        >
          <List>
            <div className="list-item-wrapper">
              <ListItem button key="new-plan" onClick={onGenerateMeasuresPdf}>
                <ListItemText primary={t("create_pdf")} />
              </ListItem>
            </div>
            <div className="list-item-wrapper">
              <ListItem button key="new-plan-from-templates" onClick={onSendMeasuresPdf}>
                <ListItemText primary={t("email_measures")} />
              </ListItem>
            </div>
          </List>
        </div>
      </StyledDrawer>


    </Scene>
  )
}

const PanelWithData = ({memberId, goBack, goToTest, goToSetup}) => {
  const MeasuresData = withData(Panel, {memberId, goBack, goToTest, goToSetup});
  return <MeasuresData/>
}

export default PanelWithData;
