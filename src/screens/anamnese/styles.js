import styled from 'styled-components';
import {  Tab } from 'semantic-ui-react';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';

export const Stage = styled.div`
  padding-top: 6em!important;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;

export const StyledTab = styled(Tab)`
  width: 100%;
  height: 100%;
  .ui.grid {
    margin: initial!important;
  }
  .ui.grid .column {
    margin: 0!important;
    padding: 0!important;
  }
  .item {
    font-family: Roboto;
    font-size: 1.1em!important;
    font-weight: initial!important;
    color: #b1b1b1!important;
    text-align: center!important;
    display: initial!important;
    margin: 0!important;
    padding-left: 1em!important;
    min-width: 8.5em;
    line-height: 2em!important;
  }
  .item.active {
    color: black!important;
    font-weight: 700!important;
  }
  .tab {
    border: none!important;
    background-color: transparent;
    padding: 0!important;
    overflow: hidden;
    height: 100%;
  }
`;

export const StyledAnamneseList = styled.div`
  height: 100%;
  .anamnese-input-field {
    input {
      width: 100%;
      background-color: #efefef;
      -webkit-text-fill-color: initial!important;
      min-height: 2.5em;
      border-width: 0;
      -webkit-appearance: none;
      border-radius: 5px;
      padding: 1em;
      ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: grey;
        opacity: 0.5; /* Firefox */
      }
    }
  }
  .anamnese-list {
    width: 100%;
    height: 100%;
    margin-top: 1em;
    background-color: #efefef;
    border-radius: 5px;
    overflow: scroll;
    padding-bottom: 4em;
    .empty-list {
      padding-top: 24%;
      text-align: center;
    }
    .selected {
      background: #00000026;
    }
    .anamnese-item {
      min-height: 85px !important;
      display: block;
      padding: 1em;
      border-bottom: #b6b6b6 !important;
      border-bottom-style: dotted!important;
      border-bottom-width: 1px!important;
      .anamnese-info {
        float: left;
        .anamnese-description {
          font-size: 1.4em;
          line-height: 1.4em;
          font-weight: 700;
          width: 595px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .anamnese-intensity {
          line-height: 3em;
          span {
            font-weight: 900;
          }
        }
      }
      .anamnese-extra-info {
        float: right;
        color: #4aacd8;
        text-align: right;
        .anamnese-creation-date{
          font-size: 1.4em;
          line-height: 1.4em;
        }
        .anamnese-creator{
          display: flex;
          align-items: center;
          width: 70px;
          line-height: 16px;
          margin-left: auto;
          .MuiSvgIcon-root {
            color: orange;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .loading-section {
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Pane = styled(Tab.Pane)`
  width: 100%!important;
  height: calc((100vh - 130px) - 7em)!important;
  max-width: 750px!important;
  max-height: 675px!important;
  margin-right: auto!important;
  margin-left: auto!important;
  .image-wrapper {
    align-items: center;
    height: 100%;
    align-content: center;
    text-align: center;
    .body-image {
      height: 100%;
      width: 100%;
      background-image: url(https://lanistacoach.s3.amazonaws.com/static/img/front_side_back_skele.jpg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: auto 100%;
    }
  }
`;

export const StyledFinding = styled(IconButton)`
  position: absolute!important;
  top: ${props => props.top ? (props.top - 55) : 0}px;
  left: ${props => props.left ? (props.left - 20) : 0}px;
  color: ${props => props.color ? props.color : 'black'}!important;
  svg {
    font-size: 2em;
  }
`;

export const FindingForm = styled(Popover)`
  .MuiPopover-paper {
    border-radius: 15px;
    overflow: visible;
    .editing.rating-section {
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
      border: none!important;
    }
    .editing.time-section {
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
      border: none!important;
    }
    .editing.importance-section {
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
      border: none!important;
    }
    .editing.visibility-section {
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
      border: none!important;
    }
    .finding-form.editing {
      .rating-section, .importance-section, .visibility-section, .time-section {
        box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
        border: none!important;
      }
    }
    .finding-form {
      width: 595px;
      padding: 2em;
      .header-section {
        display: flex;
        justify-content: space-between;
        .title-section {
          flex: 1;
          display: flex;
          font-weight: 900;
          font-size: 1.4em;
          .MuiFormControl-root {
            width: 100%;
            margin-right: 1em!important;
          }
        }
      }
      .MuiOutlinedInput-input {
        padding: 10px 13px!important;
      }
      .MuiOutlinedInput-multiline {
        padding: 10px 13px!important;
      }
      .content-section {
        padding-top: 1em;
        .description-section {
          padding-bottom: 1em;
          font-size: 1em;
          font-weight: 100;
          color: #7d7d7d!important;
          .MuiFormControl-root  {
            width: 100%;
          }
        }
        .rating-section, .importance-section, .visibility-section, .time-section {
          display: flex;
          justify-content: space-between;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 40px;
          padding: 1em 1.5em;
          margin-top: 1em;
          align-items: center;
          font-weight: 100;
          .time-text {
            margin-right: 2em;
          }
          .rating-text, .time-text, .importance-text, .visibility-text{
            font-weight: 500;
          }
        }
        .rating-section.inverted {
          background: #00000047;
          color: white;
        }
      }
      .history-section {

      }
      .author-section {
        display: flex;
        color: #a0a0a0;
        flex: 1;
        .text-section {
          flex: 1;
          text-align: right;
          line-height: 1em;
          margin-right: 0.4em;
          align-self: center;
          .name-section {
            font-weight: 900;
            font-size: 1.1em;
          }
          .date-section {
            font-weight: 100;
            font-size: 0.9em;
          }
        }
        .avatar-section {
          width: 2.5em;
          height: 2.5em;
          background-size: cover;
          border-radius: 50%;
          box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
        }
      }
      .buttons-section {
        padding-top: 3em;
        display: flex;
        justify-content: space-between;
      }
      .request-deletion {
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4em;
      }
    }
  }
  .MuiBottomNavigation-root {
    position: absolute;
    top: calc(50% - 75px);
    right: -35px;
    height: 150px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    background-color: #0000007a;
    color: white;
    border-radius: 30px;
    .MuiBottomNavigationAction-root {
      min-width: 50px!important;
    }
    .MuiBottomNavigationAction-root.Mui-selected {
      color: white;
    }
  }
`;

export const GraphSection = styled.div`
  width: 100%;
  height: 200px;
  .no-data {
    display: flex;
    align-items: center;
    height: 100%;
    text-align: center;
    justify-content: center;
    color: #c5c5c5;
  }
`;

export const ModalForm = styled(Popover)`
  .MuiPopover-paper {
    border-radius: 15px;
    overflow: visible;
    .editing.rating-section {
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
      border: none!important;
    }
    .editing.time-section {
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
      border: none!important;
    }
    .editing.importance-section {
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
      border: none!important;
    }
    .editing.visibility-section {
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
      border: none!important;
    }
    .finding-form.editing {
      .rating-section, .importance-section, .visibility-section, .time-section {
        box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
        border: none!important;
      }
    }
    .finding-form {
      width: 595px;
      padding: 2em;
      .header-section {
        display: flex;
        flex-flow: column-reverse;
        justify-content: space-between;
        .title-section {
          flex: 1;
          display: flex;
          font-weight: 900;
          font-size: 1.4em;
          .MuiFormControl-root {
            width: 100%;
            margin-right: 1em!important;
          }
        }
      }
      .content-section {
        padding-top: 2em;
        .description-section {
          padding-bottom: 1em;
          font-weight: normal;
          font-size: 1.1em;
          .MuiFormControl-root  {
            width: 100%;
          }
        }
        .rating-section, .importance-section, .visibility-section, .time-section {
          display: flex;
          justify-content: space-between;
          border: 1px solid rgba(0, 0, 0, 0.23);
          border-radius: 40px;
          padding: 1em 1.5em;
          margin-top: 1em;
          align-items: center;
          font-weight: 100;
          .time-text {
            margin-right: 2em;
          }
        }
        .rating-section.inverted {
          background: #00000047;
          color: white;
        }
      }
      .history-section {

      }
      .author-section {
        display: flex;
        color: #a0a0a0;
        .text-section {
          flex: 1;
          text-align: right;
          line-height: 1em;
          margin-right: 0.4em;
          align-self: center;
          .name-section {
            font-weight: 900;
            font-size: 1.1em;
          }
          .date-section {
            font-weight: 100;
            font-size: 0.9em;
          }
        }
        .avatar-section {
          width: 2.5em;
          height: 2.5em;
          background-size: cover;
          border-radius: 50%;
          box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
        }
      }
      .buttons-section {
        padding-top: 3em;
        display: flex;
        justify-content: space-between;
      }
      .request-deletion {
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4em;
      }
    }
  }
  .MuiBottomNavigation-root {
    position: absolute;
    top: calc(50% - 75px);
    right: -35px;
    height: 150px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    background-color: #0000007a;
    color: white;
    border-radius: 30px;
    .MuiBottomNavigationAction-root {
      min-width: 50px!important;
    }
    .MuiBottomNavigationAction-root.Mui-selected {
      color: white;
    }
  }
`;
