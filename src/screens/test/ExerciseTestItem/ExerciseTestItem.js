import React, { useState, useEffect, useRef } from 'react';
import TestValuesForm from './TestValuesForm';
import { TestItem } from './styles';
import Slider from "react-slick";

import { Icon } from 'semantic-ui-react';
import FormControl from '@material-ui/core/FormControl';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';

import LanistaButton from '../../../components/LanistaButton';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: true,
};

export default ({
  t,
  testItem,
  editable,
  comments,
  index,
  loadingCommentIndex,

  onCommentChange,
  onSaveComment,
  onSaveTestItem,

}) => {
  const [values, setValues] = useState([]);
  const [data, setData] = useState([]);

  const [resultsList, setResultsList] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creatingNewResult, setCreatingNewResult] = useState(-1);

  useEffect(() => {
    selectedList !== null && resultsList[selectedList] && setData(resultsList[selectedList].map(v => v.value));
  }, [selectedList]);

  useEffect(() => {
    // prepare form items
    if( testItem && testItem.values && testItem.values.length > 0 ) {
      const {values} = testItem;
      const valuesArray = JSON.parse(testItem.values);
      if( valuesArray && valuesArray.length > 0 ) {
        const newInputValues = new Array(valuesArray.length);
        valuesArray.map( (value, index) => {newInputValues[index] = 0} );
        setValues(valuesArray);
        setData(newInputValues);
        setResultsList(testItem.score);
        setSelectedList(null);
        if( creatingNewResult >= 0 && testItem.score.length > creatingNewResult ) {
          setSelectedList(testItem.score.length -1 );
          setCreatingNewResult(-1);
        }
      }
    }
  }, [testItem]);


  //
  //
  //
  const onAddValuesClick = () => {
    setCreatingNewResult(resultsList.length);
    const newResults = data.map((value, index) => ({
      name: values[index].name,
      type: values[index].type,
      value: parseFloat(value),
    }));
    const newResultsList = [...resultsList];
    newResultsList.push(newResults);
    console.log(resultsList, newResults);
    console.log(data)
    onSaveTestItem( index, newResultsList, data);
  }

  //
  //
  //
  const onChangeValuesClick = () => {
    const newResults = data.map((value, index) => ({
      name: values[index].name,
      type: values[index].type,
      value: parseFloat(value),
    }));
    const newResultsList = [...resultsList];
    newResultsList[selectedList] = newResults;
    onSaveTestItem( index, newResultsList );
  }

  //
  //
  //
  const onDeleteValuesClick = (deleteIndex) => {
    const newResultsList = [...resultsList];
    newResultsList.splice(deleteIndex, 1);
    onSaveTestItem( index, newResultsList );
  }

  //
  //
  //
  const onSelectListClick = (selectedListIndex) => {
    setSelectedList(selectedListIndex);
  }


  //
  //
  //
  const onValueChange = (inputValue, valueIndex) => {
    const tmp = [...data];
    tmp[valueIndex] = inputValue;
    setData(tmp);

  }

  return <TestItem >

    <div className="test-text-section">

      <div className="test-name">
        {testItem.name}
      </div>

      <div className="data-section">
        {showCreateForm &&
          <div className="form-section">
            <TestValuesForm
              t={t}
              values={values}
              data={data}
              onValuesChange={onValueChange}
            />

            <div className="add-values-button">
              <IconButton aria-label="add" onClick={onAddValuesClick}>
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        }


        <div className="lists-section hide-scrollbar">
          <div className="list-header-section">
            {values.map(value => <div className="header-value">{value.name}</div>)}
          </div>
          {resultsList.map( (result, index) => (
            <div
              className={selectedList == index ? "results-list selected-list" : "results-list"}
              key={'result-values-' + index}
              onClick={() => editable && onSelectListClick(index)}
            >
              <div className="set-title">{t("set") + " " +  (index + 1)  }</div>
              { selectedList != index &&
                result.map(i => <div className="result-values">
                  <div className="set-value">{i.value}</div>
                  <div className="set-value-unit">{t("value-unit-" + i.type)}</div>
                </div>)
              }
              { selectedList == index &&
                <div className="form-section">
                  <TestValuesForm
                    t={t}
                    values={values}
                    data={data}
                    onValuesChange={onValueChange}
                  />
                </div>
              }
              { selectedList == index &&
                <div className="buttons-section">
                    <LanistaButton onClick={() => onDeleteValuesClick(index)}>{t('delete')}</LanistaButton>
                    <LanistaButton onClick={() => onChangeValuesClick(index)} inverted>{t('change')}</LanistaButton>
                </div>
              }
            </div>
          ))}
          { selectedList === null && editable &&
            <div className="add-values-button">
              <IconButton aria-label="add" onClick={onAddValuesClick} disabled={!editable}>
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
            </div>
          }
        </div>
      </div>



      <div className="comment-section">
        <Icon name='sticky note outline icon' />
        <input
          className="comment-input"
          type="text"
          placeholder="Kommentar eingeben"
          value={comments[index]}
          onChange={(e) => onCommentChange(e, index)}
          onBlur={() => onSaveComment(index)}
          onKeyDown={(e) => e.keyCode == 13 && e.target.blur()}
          disabled={loadingCommentIndex == index}
          disabled={!editable}
        />
      </div>

    </div>


    <div className="test-image">
      <Slider {...settings}>
        <div className="slider-image">
          <div className="image" style={{backgroundImage: "url(" + testItem.exercise.end_image + ")"}}></div>
        </div>
        <div className="slider-image">
          <div className="image" style={{backgroundImage: "url(" + testItem.exercise.start_image + ")"}}></div>
        </div>
      </Slider>
    </div>

  </TestItem>
}
