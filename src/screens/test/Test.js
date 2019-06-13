import * as React from "react";
import styled from 'styled-components';
import _ from 'lodash';
import { Icon } from 'semantic-ui-react';
import moment from "moment";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

const Stage = styled.div`
  padding-top: 8em!important;
  max-width: 85vw;
  display: block!important;
  margin-right: auto!important;
  margin-left: auto!important;
  height: 98vh;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;
const LastItem = styled.div`
  height: 8em;
`;
const TestItem = styled.div`
  padding-top: 1em;
  display: flex;
  .test-text-section {
    width: 60%;
    padding-top: 2em;
  }
  .test-name {
    font-size: 1.2em;
    font-weight: 700;
    line-height: 1.5;
  }
  .test-selection {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: left;
  }
  .test-select-item {
    line-height: 3em;
    text-align: center;
    background: white;
  }
  .test-selection-wrapper {
    border: 1px solid black;
    width: auto;
    border-radius: 5px;
    overflow: hidden;
  }
  .test-image {
    width: 25%;
    background-repeat: no-repeat;
    background-position: right;
    background-size: auto 100%;
    height: 14em;
    margin-left: 10%;
  }
  .comment-section {
    padding-top: 1em;
    font-size: 1.1em;
    .comment-input {
      background-color: transparent;
      color: initial;
      border: none;
      margin-left: 1em;
      ::placeholder {
        color: #bbbbbb;
        opacity: 1;
      }
    }
  }
`;


class Test extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null,
      comments: [],
    }
    this.renderSelectField = this.renderSelectField.bind(this)
    this.extractData = this.extractData.bind(this)
    this.onCommentChange = this.onCommentChange.bind(this)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if( prevProps.test !== this.props.test ) {
      this.extractData(this.props.test)
    }
  }

  handleTabChange(e, { activeIndex }) {
     this.setState({ activeIndex })
  }

  extractData() {
    const {test} = this.props
    let comments = []
    console.log( "extractData" )
    console.log( test )

    test.map((testItem, index) => {
      comments.push(testItem.comment)
    })

    this.setState({comments: comments})
  }

  onCommentChange(e, index) {
    const {comments} = this.state
    let result = [...comments]
    result[index] = e.target.value
    this.setState({
      comments: result
    })
  }

  renderSelectField(data, top, selection) {
    return (
      <div className="test-selection" style={{borderTop: (top ? '1px solid black' : '')}}>
      {
        data.map((selectItem, index) => {
          return (
            <div className="test-select-item" style={{width: ( (100 / data.length) + '%'), borderRight: index == data.length - 1 ? '' : '1px solid black', backgroundColor: (index + 1 == selection  ? 'grey' : ''), color: (index + 1 == selection  ? 'white' : '')}}>{selectItem}</div>
          )
        })
      }
      </div>
    )
  }

  render() {
    const {test, testType} = this.props
    const {comments} = this.state

    return(
      <Stage>
      {
        test.map((testItem, index) => {
          const selectionItems = testItem.scale.split("|")
          const score = testItem.score
          return(
            <TestItem key={index}>
              <div className="test-text-section">
                <div className="test-name">
                  {testItem.name}
                </div>
                <div className="test-selection-wrapper">
                  {this.renderSelectField(selectionItems, false, score[0])}
                  {testItem.type == 2 && this.renderSelectField(selectionItems, true, score[1])}
                </div>
                <div className="comment-section">
                  <Icon name='sticky note outline icon' />
                  <input
                    className="comment-input"
                    type="text"
                    placeholder="Kommentar eingeben"
                    value={comments[index]}
                    onChange={(e) => this.onCommentChange(e, index)}
                  />
                </div>
              </div>
              <div className="test-image" style={{backgroundImage: "url(http://lanista-training.com/app/resources/images/tests/" + (parseInt(testType) + 1) + "_" + testItem.id + ".jpg)"}}></div>
            </TestItem>
          )
        })
      }
        <LastItem/>
      </Stage>
    );
  }
};

export default Test;
