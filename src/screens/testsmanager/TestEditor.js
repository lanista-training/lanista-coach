import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../lib/apollo';
import { OWNTEST } from "../../queries";
import { CHANGETEST, REMOVEEXERCISEFROMTEST, UPDATETESTEXERCISEVALUES } from "../../mutations";

import TextField from "@material-ui/core/TextField";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Button from "../../components/LanistaButton";

import {Stage} from "./styles";
import _ from 'lodash';
import moment from "moment";

const TestExercise = ({
  t,
  testExercise,
  onRemoveExerciseFromTest,
  onAddValueToTestExercise,
  onUpdateValueToTestExercise,
  onDeleteValueFromTestExercise,
}) => {

  const {values} = testExercise;
  const valuesList = values.length > 2 ? JSON.parse(values) : [];

  const [editing, setEditing] = useState(null);
  useEffect(() => {
    if(editing == 0) {
      setValueName('');
      setValueType(null);
    }
    if( editing > 0 ) {
      const {name, type} = valuesList[editing - 1];
      setValueName(name);
      setValueType(type);
    }

  }, [editing]);

  const [readyToSave, setReadyToSave] = useState(false);

  const [valueName, setValueName] = useState('');
  const [valueType, setValueType] = useState(null);

  useEffect(() => {
    if( valueName !== '' && valueType !== null ) {
      setReadyToSave(true);
    } else {
      setReadyToSave(false);
    }
  }, [valueName, valueType]);

  const onValueSelect = (index) => {
    setEditing(index + 1);
    const {name, type} = valuesList[index];
    setValueName(name);
    setValueType(type);
  }

  return <div className="test-exercise-card" key={"test-exercise-" + testExercise.id}>
    <div className="title-section">
      <div className="test-name">{testExercise.exercise.name}</div>
      <div className="image-section" style={{backgroundImage: 'url(' + testExercise.exercise.start_image + '), url(' + testExercise.exercise.end_image + ')'}}>

      </div>
    </div>
    { editing === null &&
      <>
        <div className="values-list hide-scrollbar">
          <Button
            className="add-value-button"
            startIcon={<ControlPointIcon />}
            onClick={() => setEditing(0)}
            inverted
          >
            {t("add-test-value")}
          </Button>
          {valuesList.length === 0 &&
            <div className="empty-values-list">{t("empty-values-list")}</div>
          }
          {valuesList.length !== 0 &&
            valuesList.map((value, index) => <Button
              className="value-button"
              onClick={() => setEditing(index + 1)}
            >
              {value.name}
            </Button>)
          }
        </div>
        <div className="commands-section">
          <Button
            onClick={() => onRemoveExerciseFromTest(testExercise.id)}
          >
            {t("delete-exercise")}
          </Button>
        </div>
      </>
    }
    { editing !== null &&
      <>
        <div className="value-form">
          <TextField
            id="value-name"
            label={t("value-name")}
            variant="outlined"
            value={valueName}
            onChange={event => setValueName(event.target.value)}
          />
          <FormControl variant="outlined">
            <InputLabel id="value-type-label">{t("value-type")}</InputLabel>
            <Select
              labelId="value-type-label"
              id="value-type"
              value={valueType}
              onChange={event => setValueType(event.target.value)}
            >
              <MenuItem value={1}>{t("value-type-" + 1)}</MenuItem>
              <MenuItem value={2}>{t("value-type-" + 2)}</MenuItem>
              <MenuItem value={3}>{t("value-type-" + 3)}</MenuItem>
              <MenuItem value={4}>{t("value-type-" + 4)}</MenuItem>
              <MenuItem value={5}>{t("value-type-" + 5)}</MenuItem>
              <MenuItem value={6}>{t("value-type-" + 6)}</MenuItem>
              <MenuItem value={7}>{t("value-type-" + 7)}</MenuItem>
              <MenuItem value={8}>{t("value-type-" + 8)}</MenuItem>
              <MenuItem value={9}>{t("value-type-" + 9)}</MenuItem>
              <MenuItem value={10}>{t("value-type-" + 10)}</MenuItem>
              <MenuItem value={11}>{t("value-type-" + 11)}</MenuItem>
              <MenuItem value={12}>{t("value-type-" + 12)}</MenuItem>
              <MenuItem value={13}>{t("value-type-" + 13)}</MenuItem>
              <MenuItem value={14}>{t("value-type-" + 14)}</MenuItem>
              <MenuItem value={15}>{t("value-type-" + 15)}</MenuItem>
              <MenuItem value={16}>{t("value-type-" + 16)}</MenuItem>
              <MenuItem value={17}>{t("value-type-" + 17)}</MenuItem>
              <MenuItem value={18}>{t("value-type-" + 18)}</MenuItem>
              <MenuItem value={19}>{t("value-type-" + 19)}</MenuItem>
              <MenuItem value={20}>{t("value-type-" + 20)}</MenuItem>
              <MenuItem value={21}>{t("value-type-" + 21)}</MenuItem>
              <MenuItem value={22}>{t("value-type-" + 22)}</MenuItem>
              <MenuItem value={23}>{t("value-type-" + 23)}</MenuItem>
              <MenuItem value={24}>{t("value-type-" + 24)}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="commands-section">
          <Button
            onClick={() => setEditing(null)}
          >
            {t("cancel")}
          </Button>
          { editing > 0 &&
            <Button
              onClick={() => {
                console.log("DELETE TEST VALUE")
                onDeleteValueFromTestExercise(testExercise, editing-1);
                setEditing(null);
              }}
            >
              {t("delete-test-value")}
            </Button>
          }
          <Button
            onClick={() => {
              if(editing > 0) {
                onUpdateValueToTestExercise(testExercise, {
                  name: valueName,
                  type: valueType,
                }, editing - 1);
              } else {
                onAddValueToTestExercise(testExercise, {
                  name: valueName,
                  type: valueType,
                });
              }
              setEditing(null);
            }}
            inverted={readyToSave}
            disabled={!readyToSave}
          >
            {editing > 0 ? t("change") : t("add")}
          </Button>
        </div>
      </>
    }
  </div>
}

const Panel = ({

  t,

  testId,

}) =>  {

  //
  // Test data
  //
  const {
    data: ownTestData,
    loading: ownTestLoading,
    error: ownTestError,
    refetch,
  } = useQuery(OWNTEST, {
    variables: {
      testId: testId,
    },
    fetchPolicy: 'network-only'
  });
  const {ownTest} = ownTestData ? ownTestData : {};

  //
  // Change data
  //
  const [changeTest, { loading: changeTestLoading, error: changeTestError }] = useMutation(
    CHANGETEST,
    {
      update(cache,  { data: { changeTest } }) {
        if( changeTest.id !== null ) {
          refetch();
        }
      }
    }
  );

  //
  // Remoe exercise from
  //
  const [removeExerciseFromTest, { loading: removeExerciseFromTestLoading, error: removeExerciseFromTestError }] = useMutation(
    REMOVEEXERCISEFROMTEST,
    {
      update(cache,  { data: { removeExerciseFromTest } }) {
        if( removeExerciseFromTest.id !== null ) {
          refetch();
        }
      }
    }
  );

  //
  // Save exercise values
  //
  const [updateTestExerciseValues, { loading: updateTestExerciseValuesLoading, error: updateTestExerciseValuesError }] = useMutation(
    UPDATETESTEXERCISEVALUES,
    {
      update(cache,  { data: { updateTestExerciseValues } }) {
        if( updateTestExerciseValues.id !== null ) {
          refetch();
        }
      }
    }
  );

  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  useEffect(() => {
    if( ownTest ) {
      const {name, description} = ownTest;
      setNameValue(name);
      setDescriptionValue(description);
    }
  }, [ownTest]);

  const [error, setError] = useState(null);

  const onChangeTest = () => {
    changeTest({
      variables: {
        testId: testId,
        name: nameValue,
        description: descriptionValue,
      }
    })
  }

  const onRemoveExerciseFromTest = (testExerciseId) => {
    removeExerciseFromTest({
      variables: {
        testExerciseId: testExerciseId
      }
    })
  }

  const testExercises = ownTest ? ownTest.testExercises : [];

  const onAddExerciseButtonClick = () => {
    Router.push({
      pathname: '/exercises',
      query: {
        editmode: true,
        test: ownTest.id
      }
    });
  }

  const onAddValueToTestExercise = (testExercise, newValueObject) => {
    const {values, id} = testExercise;
    const newValues = values.length > 0 ? JSON.parse(values) : [];
    newValues.push(newValueObject);

    updateTestExerciseValues({
      variables: {
        testExerciseId: id,
        newValues: JSON.stringify(newValues),
      }
    })
  }

  const onUpdateValueToTestExercise = (testExercise, newValueObject, index) => {
    const {values, id} = testExercise;
    const newValues = values.length > 0 ? JSON.parse(values) : [];
    newValues[index] = newValueObject;

    updateTestExerciseValues({
      variables: {
        testExerciseId: id,
        newValues: JSON.stringify(newValues),
      }
    })
  }

  const onDeleteValueFromTestExercise = (testExercise, index) => {
    const {values, id} = testExercise;
    const newValues = values.length > 0 ? JSON.parse(values) : [];
    newValues.splice(index, 1);

    updateTestExerciseValues({
      variables: {
        testExerciseId: id,
        newValues: JSON.stringify(newValues),
      }
    })
  }

  return(
    <Stage className="hide-scrollbar">
      { ownTestLoading &&
        <div className="loading-section">
          ...loading
        </div>
      }
      { !ownTestLoading &&
        <>
          <div className="update-section">
            <div className="update-form">
              <TextField
                id="test-name"
                label={t('test-name')}
                variant="outlined"
                value={nameValue}
                onChange={e => {
                  setNameValue(e.target.value);
                }}
                error={error !== null}
                helperText={error}
                disabled={changeTestLoading}
                autoFocus
              />
              <TextField
                id="test-description"
                label={t('test-description')}
                variant="outlined"
                value={descriptionValue}
                multiline
                rowsMax={2}
                onChange={e => {
                  setDescriptionValue(e.target.value);
                }}
                error={error !== null}
                helperText={error}
                disabled={changeTestLoading}
              />
              <Button
                onClick={onChangeTest}
                disabled={changeTestLoading}
                loading={changeTestLoading}
              >
                {t("save-test")}
              </Button>
            </div>
          </div>
          <div className="list-section">
            { ( ownTestLoading || changeTestLoading || removeExerciseFromTestLoading ) &&
              <div className="loading-section">
                <CircularProgress size={100} />
              </div>
            }
            { testExercises && testExercises.length === 0 &&
              <div className="empty-list-section">
                {t("empty-exercise-list-text")}
              </div>
            }
            { testExercises && testExercises.length !== 0 &&
              <div className="list-section">
                <div className="list-title">{t("exercises-in-test")}</div>
                {
                  testExercises.map(testExercise => <TestExercise
                    t={t}
                    testExercise={testExercise}
                    onRemoveExerciseFromTest={onRemoveExerciseFromTest}
                    onAddValueToTestExercise={onAddValueToTestExercise}
                    onUpdateValueToTestExercise={onUpdateValueToTestExercise}
                    onDeleteValueFromTestExercise={onDeleteValueFromTestExercise}
                  />)
                }
              </div>
            }
            <div className="add-exercise-section">
              <Button
                startIcon={<ControlPointIcon />}
                onClick={onAddExerciseButtonClick}
              >
                {t("add-exercise")}
              </Button>
            </div>
          </div>
        </>
      }
    </Stage>
  )

}

export default withApollo(Panel);
