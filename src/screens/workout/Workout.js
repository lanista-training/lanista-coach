import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Tab, Icon, Placeholder } from 'semantic-ui-react';
import moment from 'moment';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {Stage, StyledWorkout, StyledTab, StyledExercise, StyledMenuItem, Dragable} from './styles';
import {useTransition, animated} from 'react-spring';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DefaultValuesSelector from './DefaultValuesSelector';
import NoteIcon from '@material-ui/icons/Note';

import { motion } from "framer-motion";

const SortableList = SortableContainer(({exercises, t, onSelectExercise, workout, selectedExecution, exercisePadding, disabled}) => {
  return (
    <div className="split-list">
      {
        exercises.map((value, index) => (
          value &&
          <SortableItem
            key={`exercise-${value.id}`}
            index={index}
            execution={value}
            t={t}
            onSelectExercise={onSelectExercise}
            workout={workout}
            selected={selectedExecution && value.id == selectedExecution.id}
            exercisePadding={exercisePadding}
            disabled={disabled}
          />
        ))
      }
    </div>
  );
});


const Split = ({splitIndex, exercises, t, onChangeExerciseOrder, onDeleteExercise, onSelectExercise, workout, selectedExecution, exercisePadding, disabled}) => {
  const [toDelete, setToDelete] = useState(0)
  return (
    <Tab.Pane>
      <SortableList
        exercises={exercises}
        axis="xy"
        helperClass='selected-exercise'
        distance={10}
        t={t}
        onSortEnd={({oldIndex, newIndex}) => {
          onChangeExerciseOrder(splitIndex, oldIndex, newIndex);
        }}
        onSortMove={ event => {
          const deleteLimit = document.getElementsByClassName("menu")[0].offsetTop
          //console.log("onSortMove")
          //console.log(event.clientY - deleteLimit)
          setToDelete(event.clientY - deleteLimit)
        }}
        onSelectExercise={onSelectExercise}
        workout={workout}
        selectedExecution={selectedExecution}
        exercisePadding={exercisePadding}

        disabled={disabled}
      />
    </Tab.Pane>
  )
}

const SortableItem = SortableElement(({execution, t, onSelectExercise, workout, selected, exercisePadding}) => (
  <Exercise execution={execution} t={t} onSelectExercise={onSelectExercise} workout={workout} selected={selected} exercisePadding={exercisePadding} />
));


const Exercise = ({execution, t, onSelectExercise, workout, selected, exercisePadding}) => {
  let style = {
    ...(selected ? {boxShadow: '0 0 15px 0 rgb(155,201,61)', border: '1px solid rgb(155,201,61)'} : {}),
    marginLeft: Math.abs(exercisePadding),
    marginBottom: Math.abs(exercisePadding),
  }

  return(
    <StyledExercise
      className={execution.selected ? 'selected-exercise' : ''}
      key={`styled-exercise-${execution.id}`}
      onClick={
        (event) => {
          onSelectExercise(event, execution);
        }
      }
      style={style}
    >
      <div className="exercise-images">
        <div className="exercise-start-image" style={{backgroundImage: "url(" + execution.exercise.start_image + ")"}}/>
        <div className="exercise-end-image" style={{backgroundImage: "url(" + execution.exercise.end_image + ")"}}/>
      </div>
      <div className="exercise-name">{execution.exercise.name}</div>
      { execution.hasIndications &&
        <div className="exercise-has-indications">
          <NoteIcon/>
        </div>
      }

      <div className="exercise-footer">
        <div className="exercise-sets"><span>{execution.rounds}</span> {t('sets')}</div>
        { execution.weight > 0 && (
          <div className="exercise-weight"><span>{execution.weight}</span> Kg</div>
        )}
        <div className="exercise-repetitions"><span>{execution.repetitions}</span> {getTrainingUnitText(execution.training_unit, t)}</div>
      </div>
    </StyledExercise>
  )
}

const getTrainingUnitText = (unit, t) => {
  switch(unit) {
    case 1:
      return t('sec');
    case 2:
      return t('min');
    default:
      return t('rep');
  }
}

const Workout = ({
  workout,
  t,
  onShowExercise,
  onChangeExerciseOrder,
  onDeleteExercise,
  loading,
  error,
  defaultSettings,
  setDefaultSettings,
  editable,
  createSplit,
  activeSplitIndex,
  setActiveSplitIndex,
  onDeleteSplit,
  onCopySplit,
  onShiftSplitRight,
  onShiftSplitLeft,
  changePlan,

}) => {
  //
  // Default settings
  //
  const constraintsRef = useRef(null);
  const [showMiniDefaultSettings, setShowMiniDefaultSettings] = useState(false);

  // Exercise Menu Handling
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedExecution, setSelectedExecution] = React.useState(null);
  const onSelectExercise = (event, executionId) => {
    if(editable) {
      setAnchorEl(event.currentTarget);
      setSelectedExecution(executionId);
    } else {
      onShowExercise(executionId.exercise.id, workout && workout.member && workout.member.id, executionId.id);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedExecution(null);
  };

  // Split Menu Handling
  const [splitAnchorEl, setSplitAnchorEl] = React.useState(null);
  const onOpenSplitMenu = event => {
    if(editable) {
      setSplitAnchorEl(event.currentTarget);
    }
  };
  const handleCloseSplitMenu = () => {
    setSplitAnchorEl(null);
  };

  const panes = [];
  if( loading ) {
    panes.push(
      { menuItem: () => ( t("split") + ' ' + 1), render: () => {
        return (
          <Tab.Pane>
            <Placeholder style={{ height: 150, width: 150, borderRadius: 10 }}>
              <Placeholder.Image />
            </Placeholder>
          </Tab.Pane>
        )
      }}
    );
  } else {
    workout && workout.splits && workout.splits.map( ({exercises, name}) => {

      panes.push({
        menuItem: (ItemMenu, {active, index, onClick}) => {
          return (
            <ItemMenu active={active} index={index} onClick={(e, i) => {
                if(i.active) {
                  onOpenSplitMenu(e);
                } else {
                  onClick(e, i);
                }
              }
            }>
              {t("split") + ' ' + name}
            </ItemMenu>
          )
        },
        render: () => {
          return (
            <Split
              splitIndex={name}
              exercises={exercises}
              t={t}
              onChangeExerciseOrder={onChangeExerciseOrder}
              onDeleteExercise={onDeleteExercise}
              onSelectExercise={onSelectExercise}
              workout={workout}
              selectedExecution={selectedExecution}
              exercisePadding={exercisePadding}

              disabled={!editable}
            />
          )
        }
      })
    })
    if(editable) {
      panes.push({ menuItem: ("+"), render: () => {
        return (
          <Split
            splitIndex={workout.splits.length + 1}
            exercises={[]}
            t={t}
            onChangeExerciseOrder={onChangeExerciseOrder}
            onDeleteExercise={onDeleteExercise}
            onSelectExercise={onSelectExercise}
            workout={workout}
            selectedExecution={selectedExecution}
          />
        )
      }})
    }
  }

  const exerciseMinWidth = 200;
  const exerciseWidth = 180;
  const listWidth = window.innerWidth - exerciseMinWidth;
  const exercisesInARow = Math.floor( (listWidth) / exerciseMinWidth);
  const exercisePadding = ((exercisesInARow * exerciseWidth)  - listWidth) / (exercisesInARow + 1);

  return(
    <>
      <motion.div className="drag-area" ref={constraintsRef} style={{width: "100%", height: "100%"}}>
        <Stage ref={constraintsRef}>
        {
          workout && (<StyledWorkout>
            {
              <div className="info-section">
                <div className="workout-description" onClick={changePlan}>
                  { loading &&
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                    </Placeholder>
                  }
                  { !loading &&
                    (
                      workout.description &&
                      workout.description.length > 0
                      ?
                      workout.description.split('||').map((item, index) => <div className="description-content" key={"description-" + index}>{item}</div>)
                      :
                      t('no description available')
                    )
                  }
                </div>
                { loading &&
                  <div className="workout-infos">
                    <div className="creation-date">{t("created at")}: <span>
                      <Placeholder fluid style={{ width: "100px" }}>
                        <Placeholder.Header>
                          <Placeholder.Line />
                        </Placeholder.Header>
                      </Placeholder>
                      </span>
                    </div>
                    <div className="creator-fullname">{t("from trainer")}: <span>
                      <Placeholder fluid style={{ width: "100px" }}>
                        <Placeholder.Header>
                          <Placeholder.Line />
                        </Placeholder.Header>
                      </Placeholder>
                      </span>
                    </div>
                    <div className="creator-image">
                      <Placeholder style={{ height: "100%", width: "100%", borderRadius: "50%" }}>
                        <Placeholder.Image />
                      </Placeholder>
                    </div>
                  </div>
                }
                { !loading &&
                  <div className="workout-infos">
                    <div className="creation-date">{t("created at")}: <span>{moment(parseInt(workout.changed_date)).format("DD MMMM YYYY")}</span></div>
                    <div className="creator-fullname">{t("from trainer")}: <span>{workout.creator_full_name}</span></div>
                    <div className="creator-image" style={{backgroundImage: 'url(' + workout.creator_image + ')'}}></div>
                  </div>
                }
              </div>
            }
            <div className="exercises-section">
               <StyledTab
                 menu={{ secondary: true, pointing: true }}
                 panes={panes}
                 onTabChange={(e, data) => {
                   if( data.panes[data.activeIndex].menuItem == '+' ) {
                     createSplit();
                   } else {
                     setActiveSplitIndex(data.activeIndex);
                   }
                 }}
                 activeIndex={activeSplitIndex}
               />
            </div>
          </StyledWorkout>)
        }

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
              console.log("onClick", workout);
              onShowExercise(selectedExecution.exercise.id, workout && workout.member && workout.member.id, selectedExecution.id);
            }}>{t("open")}</MenuItem>
          <MenuItem onClick={() => {
              onDeleteExercise(selectedExecution.id);
              handleClose();
            }}>Löschen</MenuItem>
        </Menu>

        <Menu
          id="split-menu"
          anchorEl={splitAnchorEl}
          keepMounted
          open={Boolean(splitAnchorEl)}
          onClose={handleCloseSplitMenu}
        >
          <StyledMenuItem onClick={() => {
              onDeleteSplit();
              handleCloseSplitMenu();
            }
          }>
            <Icon name='trash alternate outline' />
            {t('DELETE_SPLIT')}
          </StyledMenuItem>

          <StyledMenuItem onClick={() => {
              onCopySplit();
              handleCloseSplitMenu();
            }
          }>
            <Icon name='copy outline' />
            {t('DUPLICATE_SPLIT')}
          </StyledMenuItem>
          {
            activeSplitIndex > 0 &&
            <StyledMenuItem onClick={() => {
                onShiftSplitLeft();
                handleCloseSplitMenu();
              }
            }>
              <Icon name='chevron left' />
              {t('SHIFT_SPLIT_TO_LEFT')}
            </StyledMenuItem>
          }
          {
            workout && activeSplitIndex < workout.splits.length-1 &&
            <StyledMenuItem onClick={() => {
                onShiftSplitRight();
                handleCloseSplitMenu();
              }
            }>
              <Icon name='chevron right' />
              {t('SHIFT_SPLIT_TO_RIGHT')}
            </StyledMenuItem>
          }


        </Menu>

        </Stage>
      </motion.div>
      {showMiniDefaultSettings &&
        <Dragable className="drag-section" drag dragConstraints={constraintsRef}>
          <DefaultValuesSelector/>
        </Dragable>
      }
    </>
  )
};

Workout.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * Function to translate content
  */
  workout: PropTypes.object,

  /**
   * Function to translate content
  */
  onShowExercise: PropTypes.func,

  /**
   * Function to translate content
  */
  onChangeExerciseOrder: PropTypes.func,

  /**
   * Function to translate content
  */
  onDeleteExercise: PropTypes.func,

  /**
   * Function to translate content
  */
  loading: PropTypes.bool,

  /**
   * Function to translate content
  */
  error: PropTypes.object,

  /**
   * Function to translate content
  */
  defaultSettings: PropTypes.object,

  /**
   * Function to translate content
  */
  setDefaultSettings: PropTypes.func,

  /**
   * Function to translate content
  */
  editable: PropTypes.bool,

  /**
   * Function to translate content
  */
  createSplit: PropTypes.func,

  /**
   * Function to translate content
  */
  activeSplitIndex: PropTypes.number,

  /**
   * Function to translate content
  */
  setActiveSplitIndex: PropTypes.func,

  /**
   * Function to translate content
  */
  onDeleteSplit: PropTypes.func,

  /**
   * Function to translate content
  */
  onCopySplit: PropTypes.func,

  /**
   * Function to translate content
  */
  onShiftSplitRight: PropTypes.func,

  /**
   * Function to translate content
  */
  onShiftSplitLeft: PropTypes.func,

  /**
   * Function to translate content
  */
  changePlan: PropTypes.func,
};

export default Workout;
