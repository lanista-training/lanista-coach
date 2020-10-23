import React, { useState, useEffect, useRef } from 'react';
import { TestItem } from './styles';

import { Icon } from 'semantic-ui-react';

import Button from '@material-ui/core/Button';

const renderSelectField = (data, top, selection, baseline, line, onSaveTestItem, editable, itemType) => {
  return (
    <div className="test-selection" style={{borderTop: (top ? '1px solid black' : '')}}>
    {itemType == 2 && <div className="test-side">{line == 1 ? "L" : "R"}</div>}
    {
      data.map((selectItem, index) => {
        return (
          <div className="test-select-item" style={{width: 'calc((100% - ' + (itemType == 2 ? '30px' : '0px') + ') / ' + data.length + ')', borderRight: index == data.length - 1 ? '' : '1px solid black', backgroundColor: (index + 1 == selection  ? 'grey' : ''), color: (index + 1 == selection  ? 'white' : '')}}>
            <Button disabled={!editable} onClick={() => onSaveTestItem(baseline + line, index + 1)} className={index + 1 == selection  ? 'selected' : ''}>{selectItem}</Button>
          </div>
        )
      })
    }
    </div>
  )
};

export default ({
  t,
  testItem,
  editable,
  comments,
  index,
  loadingCommentIndex,
  baseline,
  onSaveTestItem,
  onCommentChange,
  onSaveComment
}) => {

  console.log('editable')
  console.log(editable)

  const selectionItems = testItem.scale.split("|");
  const score = testItem.score;

  return <TestItem>
    <div className="test-text-section">

      <div className="test-name">
        {testItem.name}
      </div>


      <div className="test-selection-wrapper">
        {renderSelectField(selectionItems, false, score[0], baseline, 0, onSaveTestItem, editable, testItem.type)}
        {testItem.type == 2 && renderSelectField(selectionItems, true, score[1], baseline, 1, onSaveTestItem, editable, testItem.type)}
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
          disabled={loadingCommentIndex == index || !editable}
        />
      </div>

    </div>

    <div className="test-image" style={{backgroundImage: "url(" + testItem.imageUrl + ")"}}></div>

  </TestItem>
}
