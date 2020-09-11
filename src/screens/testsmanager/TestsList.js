import React, { useEffect, useState } from "react";
import {Stage} from "./styles";
import _ from "lodash";
import moment from "moment";

import Button from "../../components/LanistaButton";
import Dialog from "../../components/LanistaDialog";

import TextField from "@material-ui/core/TextField";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';

export default ({
  t,

  goToTest,

  tests,
  testsLoading,
  testsError,

  onDefineTest,
  defineTestLoading,
  defineTestError,

  onRemoveTest,
  removeTestLoading,
  removeTestError,

}) =>  {

  const [testName, setTestName] = useState('');
  const [error, setError] = useState(null);
  const onCreateTest = () => {
    if( testName.trim().length > 0 ) {
      onDefineTest(testName);
    } else {
      setError(t("name-to-short"));
    }
  }

  //
  // Delete test logic
  //
  const [testToDelete, setTestToDelete] = useState(0);
  const closeDeleteDialog = () => setTestToDelete(0);
  useEffect(() => {
    setTestToDelete(0);
  },[tests]);

  //
  // Buttons actions
  const onDeleteTestButtonClick = (testId) => {
    setTestToDelete(testId);
  }

  const onChangeTestButtonClick = (testId) => {
    goToTest(testId);
  }

  return(
    <Stage className="hide-scrollbar">
      <div className="create-section">
        <div className="create-form">
          <TextField
            id="test-name"
            label={t('test-name')}
            variant="outlined"
            value={testName}
            onChange={e => {
              setTestName(e.target.value);
              setError(null);
            }}
            error={error !== null}
            helperText={error}
          />
          <Button
            startIcon={<ControlPointIcon />}
            onClick={onCreateTest}
          >
            {t("create-test")}
          </Button>
        </div>
      </div>
      <div className="list-section">
        { ( testsLoading || defineTestLoading || removeTestLoading ) &&
          <div className="loading-section">
            <CircularProgress size={100} />
          </div>
        }
        { tests && tests.length === 0 &&
          <div className="empty-list-section">
            {t("empty-list-text")}
          </div>
        }
        { tests && tests.length !== 0 &&
          <div className="list-section">
            <div className="list-title">{t("available-tests")}</div>
            {
              tests.map(test => <div className="test-card">
                <div className="test-title-section">
                  <div className="test-name">{test.name}</div>
                  <div className="test-preview-images-section">
                    { test.previewImages && test.previewImages.length > 0 &&
                      test.previewImages.map(testImage => <Avatar src={testImage} />)
                    }
                  </div>
                </div>
                <div className="test-description">{test.description ? test.description : t("no-description")}</div>
                <div className="commands-section">
                  <Button
                    onClick={() => onDeleteTestButtonClick(test.id)}
                  >
                    {t("delete-test")}
                  </Button>
                  <Button
                    onClick={() => onChangeTestButtonClick(test.id)}
                  >
                    {t("change-test")}
                  </Button>
                </div>
              </div>)
            }
          </div>
        }
      </div>
      <Dialog
        open={testToDelete !== 0}
        onClose={closeDeleteDialog}
      >
        <DialogTitle>{t("delete-test-titel")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("delete-test-message")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDeleteDialog}
            disabled={removeTestLoading}
          >
            {t("back")}
          </Button>
          <Button
            onClick={() => onRemoveTest(testToDelete)}
            autoFocus
            disabled={removeTestLoading}
            loading={removeTestLoading}
          >
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Stage>
  )

}
