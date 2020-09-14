import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from "moment";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {Stage, LastItem, TestItem} from './styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LanistaTestItem from './LanistaTestItem';
import ExerciseTestItem from './ExerciseTestItem';

import Button from '@material-ui/core/Button';

const Test = ({
  t,
  testId,
  test,
  testType,

  editable,

  onSaveTestItem,
  saveTestResultsLoading,
  saveTestResultsError,

  onDeleteTestRecord,
  deleteTestRecordLoading,
  deleteTestRecordError,

  onSaveTestComments,
  saveTestCommentsLoading,
  saveTestCommentsError,

  open,
  handleClose,
}) => {
  const [comments, setComments] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingCommentIndex, setLoadingCommentIndex] = useState(null);

  useEffect(() => {
    if( test && loadingCommentIndex === null ) {
      extractData(test)
    }
  }, [test]);

  useEffect(() => {
    !saveTestCommentsLoading && setLoadingCommentIndex(null);
  }, [saveTestCommentsLoading]);

  const onCommentChange = (e, index) => {
    let result = [...comments];
    result[index] = e.target.value
    setComments(result);
  }

  const onSaveComment = (index) => {
    if( test[index].comment !== comments[index] ) {
      setLoadingCommentIndex(index);
      onSaveTestComments(comments.join('|'));
    }
  }

  const extractData = () => {
    let tmp = [];
    test.map((testItem, index) => {
      tmp.push(testItem.comment)
    });
    setComments(tmp);
  }

  let baseline = 0;

  return(
    <Stage>
      {
        test.map((testItem, index) => {
          const result = (
            testItem.type != 100
            ?
            <LanistaTestItem
              testItem={testItem}
              editable={editable}
              t={t}
              comments={comments}
              index={index}
              loadingCommentIndex={loadingCommentIndex}
              baseline={baseline}
              onSaveTestItem={onSaveTestItem}
              onCommentChange={onCommentChange}
              onSaveComment={onSaveComment}
            />
            :
            <ExerciseTestItem
              t={t}

              testItem={testItem}
              editable={editable}
              comments={comments}
              index={index}
              loadingCommentIndex={loadingCommentIndex}

              onSaveTestItem={onSaveTestItem}
              onCommentChange={onCommentChange}
              onSaveComment={onSaveComment}
            />
          );
          baseline = baseline + (testItem.type == 2 ? 2 : 1);
          return result;
        })
      }
      <LastItem/>
      { open &&
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t("delete_dialog_title")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("delete_dialog_description")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {t("delete_cancel")}
            </Button>
            <Button onClick={() => onDeleteTestRecord(testId)} color="primary" autoFocus>
              {t("delete_ok")}
            </Button>
          </DialogActions>
        </Dialog>
      }
    </Stage>
  );
};

Test.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * Function to translate content
  */
  testId: PropTypes.number,

  /**
   * Function to translate content
  */
  test: PropTypes.object,

  /**
   * Function to translate content
  */
  testType: PropTypes.string,

  /**
   * Function to translate content
  */
  editable: PropTypes.bool,

  /**
   * Function to translate content
  */
  onSaveTestItem: PropTypes.func,

  /**
   * Function to translate content
  */
  saveTestResultsLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  saveTestResultsError: PropTypes.object,

  /**
   * Function to translate content
  */
  onDeleteTestRecord: PropTypes.func,

  /**
   * Function to translate content
  */
  deleteTestRecordLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  deleteTestRecordError: PropTypes.object,

  /**
   * Function to translate content
  */
  onSaveTestComments: PropTypes.func,

  /**
   * Function to translate content
  */
  saveTestCommentsLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  saveTestCommentsError: PropTypes.object,

  /**
   * Function to translate content
  */
  open: PropTypes.bool,

  /**
   * Function to translate content
  */
  handleClose: PropTypes.func,
};

export default Test;
