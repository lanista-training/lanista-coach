import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';

export const ExercisesHeader  = styled.div`
  font-size: 22px;
  line-height: 21px;
  text-align: right;
  width: 100%;
  display: flex;
  flex-flow: row-reverse;
  .MuiLinearProgress-root {
    width: 100%;
    position: absolute;
    top: 59px;
  }
  .text-search-wrapper {
    padding-left: 1em;
    display: flex;
    align-items: center;
    .text-search {
      background: #fff;
      display: flex;
      border: 1px solid #dfe1e5;
      box-shadow: none;
      height: 39px;
      width: 100%;
      border-radius: 24px;
      z-index: 3;
      height: 44px;
      margin: 0 auto;
      padding-left: 15px;
      padding-right: 15px;
      display: flex;
      align-items: center;
      .input-area {
        display: flex;
        align-items: center;
        padding-right: 10px;
      }
      .search-button {
        margin-left: 10px;
      }
      .MuiDivider-vertical {
        height: 34px;
      }
      :hover {
        box-shadow: 0 4px 6px 0 rgba(32,33,36,0.28);
        border: 0;
      }
      input {
        background-color: transparent;
        border: none;
        margin: 0;
        padding: 0;
        color: rgba(0,0,0,.87);
        word-wrap: break-word;
        outline: none;
        display: flex;
        flex: 100%;
        -webkit-tap-highlight-color: transparent;
        height: 34px;
        font-size: 16px;
        ::placeholder {
          color: rgb(151, 151, 151);
        }
      }
    }
  }
`;

export const SearchInfo  = styled.div`
  margin-top: 25px;
  -webkit-letter-spacing: -1px;
  -moz-letter-spacing: -1px;
  -ms-letter-spacing: -1px;
  -webkit-letter-spacing: -1px;
  -moz-letter-spacing: -1px;
  -ms-letter-spacing: -1px;
  -webkit-letter-spacing: -1px;
  -moz-letter-spacing: -1px;
  -ms-letter-spacing: -1px;
  letter-spacing: -1px;
  font-size: 26px;
  color: #4c4c4c;
  width: 20%;
  text-align: right;
  padding-right: 1em;
  font-weight: 900;
  font-size: 24px;
  margin: auto;
  span {
    font-weight: 100;
    font-size: 20px;
  }
`;

export const FiltersWrapper  = styled.div`
  width: 60%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none!important;
  }
`;

export const Filters  = styled.div`
  text-align: left;
  width: auto;
  display: -webkit-box;;
  padding: 0.65em;
`;

export const StyledBodyPin =  styled.div`
  width: auto!important;
  text-transform: none;
  background: rgb(155, 201, 61);
  color: white;
  border-radius: .28571429rem;
  box-shadow: none;
  line-height: 1.9em;
  font-size: 0.8em;
  padding: 0 1em;
  margin: 0 0.5em;
  display: flex;
  .MuiSvgIcon-root {
    position: relative;
    top: 4px;
  }
  .pin-ttext {
    padding-left: 0.5em;
  }
  i {
    font-size: .92857143em;
    opacity: .5;
    width: auto;
    font-family: Icons;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    speak: none;
    margin-left: 0.5em;
    ::before {
      content: "\f056";
      background: 0 0!important;
    }
  }
`;

export const StyledFolderPin =  styled.div`
  width: auto!important;
  text-transform: none;
  background: #34acfb;
  color: white;
  border-radius: .28571429rem;
  box-shadow: none;
  line-height: 1.9em;
  font-size: 0.8em;
  padding: 0 1em;
  margin: 0 0.5em;
  display: flex;
  .MuiSvgIcon-root {
    position: relative;
    top: 4px;
  }
  .pin-ttext {
    padding-left: 0.5em;
  }
  i {
    font-size: .92857143em;
    opacity: .5;
    width: auto;
    font-family: Icons;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    speak: none;
    margin-left: 0.5em;
    ::before {
      content: "\f056";
      background: 0 0!important;
    }
  }
`;

export const StyledTypePin =  styled.div`
  width: auto!important;
  text-transform: none;
  background: #5603AD;
  color: white;
  border-radius: .28571429rem;
  box-shadow: none;
  line-height: 1.9em;
  font-size: 0.8em;
  padding: 0 1em;
  margin: 0 0.5em;
  display: flex;
  .MuiSvgIcon-root {
    position: relative;
    top: 4px;
  }
  .pin-ttext {
    padding-left: 0.5em;
  }
  i {
    font-size: .92857143em;
    opacity: .5;
    width: auto;
    font-family: Icons;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    speak: none;
    margin-left: 0.5em;
    ::before {
      content: "\f056";
      background: 0 0!important;
    }
  }
`;

export const StyledSearchPin =  styled.div`
  width: auto!important;
  text-transform: none;
  background: #e8e8e8;
  border-radius: .28571429rem;
  box-shadow: none;
  line-height: 1.5em;
  font-size: 1em;
  padding: 0 1em;
  margin: 0 0.5em;
  i {
    font-size: .92857143em;
    opacity: .5;
    width: auto;
    font-family: Icons;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    speak: none;
    margin-left: 0.5em;
    ::before {
      content: "\f056";
      background: 0 0!important;
    }
  }
`;

export const StyledPopper =  styled(Popper)`
  .suggestions-area {
    background: white;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    border-bottom: solid;
    border-left-style: solid;
    border-right-style: solid;
    border-width: 1px;
    border-color: #e4e4e4;
    width: 190px;
    margin-left: -22px;
  }
`;
