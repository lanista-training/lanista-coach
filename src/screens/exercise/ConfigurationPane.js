import React, { useEffect, useRef, useState } from 'react';
import { Tab, Icon, TextArea, Form } from 'semantic-ui-react';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import BodyFilter from "../../components/BodyFilter";
import SetConfigurationField from './SetConfigurationField';
import BasicConfigurationField from './BasicConfigurationField';
import {SettingsPanel} from './styles';

import PrintIcon from '@material-ui/icons/Print';

export default ({t, settings, onSettingsChange, onSyncSettings, editable}) => {

  const {setsConfiguration} = settings;

  const [hasToSync, setHasToSync] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [isBasicConfigurationActive, setIsBasicConfigurationActive] = useState(false);
  const toggleIsBasicConfigurationsActive = (needSync = false) => {
    setIsBasicConfigurationActive(!isBasicConfigurationActive);
    //setSelectedItem(null);
    setHasToSync(needSync);
  }

  useEffect(() => {
    hasToSync && onSyncSettings();
  }, [hasToSync]);



  const setRows = [];

  const [editIndications, setEditIndications] = useState(false);
  const toggleSetEditIndications = () => setEditIndications(!editIndications);
  const onIndicationsChange = (event) => {
    onSettingsChange( {
      ...settings,
      indications: event.target.value && event.target.value.length > 0 ? event.target.value : null,
    });
  }

  const onSaveIndications = () => {
    onSyncSettings();
    toggleSetEditIndications();
  }

  for(var i = 0; i < setsConfiguration.length; i++) {
    setRows.push(
      <SetConfigurationField
        t={t}
        key={"set-configuration-" + i}
        setOrder={i}
        settings={settings}
        basicWeight={settings.weight}
        basicTraining={settings.training}
        onSettingsChange={onSettingsChange}
        onSyncSettings={onSyncSettings}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        editable={editable}
      />
    )
  }

  return (
    <Tab.Pane >
      <SettingsPanel>
        <div className="exercise-indications">
          <div className="input-fields">
            <TextArea
              placeholder="Keine Anweisungen für den Kunde eingetragen."
              rows="2"
              value={settings.indications}
              onChange={onIndicationsChange}
              onBlur={onSaveIndications}
              onFocus={toggleSetEditIndications}
              disabled={!editable}
            />
            <div className="description-warnings">
              {t("print-information")} <PrintIcon fontSize="inherit" />
            </div>
          </div>
        {editIndications && editable &&
          <Fab color="primary" aria-label="add">
            <SendIcon />
          </Fab>
        }
        </div>
        <div className="sets-configuration">
          <BasicConfigurationField
            settings={settings}
            onSettingsChange={onSettingsChange}
            onSyncSettings={onSyncSettings}
            isActive={isBasicConfigurationActive}
            toggleIsActive={toggleIsBasicConfigurationsActive}
            editable={editable}
            t={t}
          />
          <div className="sets-list hide-scrollbar">
            {setRows}
          </div>
        </div>
      </SettingsPanel>
    </Tab.Pane>
  );

}
