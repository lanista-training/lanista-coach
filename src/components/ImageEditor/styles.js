import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isDragActive) {
      return '#2196f3';
  }
  return '#eeeeee';
}

export const ImageEditor = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;

  .commands {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
  }
  .crop-container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #eaeaea;
    border-radius: 15px;
    overflow: hidden;
  }
  .controls {
    width: 100%;
    padding-top: 20px;
    background-color: rgb(250, 250, 250);
    .image-controlls {
      display: flex;
      .slider-container {
        flex: 1;
        padding: 2px 20px;
        .MuiSlider-root {
          color: black;
        }
      }
    }
  }
  .image-section {
    display: flex;
    flex-flow: row;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    -webkit-box-shadow: 0 2px 25px 0 rgba(34,36,38,.05) inset;
    box-shadow: 0 2px 25px 0 rgba(34,36,38,.05) inset;
    border-radius: 15px;
    z-index: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-flow: column;
  }
  .empty-image {
    position: absolute;
    top: calc(50% - 1em);
    font-size: 1em;
    margin-right: auto!important;
    margin-left: auto!important;
    display: block!important;
  }
  .loading-image {
    position: absolute;
    z-index: 2;
    width: 100%;
    background: #ffffff54;
    display: flex;
    align-items: center;
    justify-content: center;
    .MuiCircularProgress-root {
      width: 100px;
      height: 100px;
      margin-top: -15%;
    }
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  border-width: 1px!important;
  border-radius: 25px!important;
  padding: 10px 15px!important;
  width: 13em;
  background: ${props => props.inverted ? 'black!important' : 'transparent'};
  border-color: ${props => props.inverted ? 'black!important' : 'initial'};
  span {
    color: ${props => props.inverted ? 'white' : 'black'};;
  }
`;

export const StyledDropContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  min-height: ${props => props.containerHeight}px;
  width: ${props => props.containerWidth}px;
  margin-right: auto;
  margin-left: auto;
  border-radius: 20px;
  z-index: 1;
`;

export const StyledCropContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  img {
    width: ${props => props.containerWidth}px;
    height: ${props => props.containerHeight}px;
  }
`;

export const StyledDialog = styled(Dialog)`
  .MuiAppBar-root {
    background-color: Black;
  }
  .buttons-section {
    width: 350px;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
`;
