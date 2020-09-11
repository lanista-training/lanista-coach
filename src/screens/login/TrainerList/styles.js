import styled from 'styled-components';

export const TrainerList = styled.div`
  text-align: center;
  .trainer-item {
    height: 177px;
    width: 187px;
    transition: 100ms linear 0s;
    display: inline-table;
    .photo-section {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: auto;
      margin-left: auto;
      z-index: 1;
      position: relative;
      background-size: cover;
      border-style: solid!important;
      border-width: 2px!important;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 27px 0px;
    }
    .first-name {
      height: 15px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .last-name {
      height: 15px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
`;

export const TrainerLogin = styled.div`
  text-align: center;
  .photo-section {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: auto;
    margin-left: auto;
    z-index: 1;
    position: relative;
    background-size: cover;
    border-style: solid!important;
    border-width: 2px!important;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 27px 0px;
  }
  .MuiOutlinedInput-root {
    margin-top: 3em;
  }
  .buttons-section {
    display: flex;
    flex-flow: column;
    height: 6em;
    justify-content: space-between;
    margin-top: 3em;
  }
  input, fieldset {
    border-radius: 15px;
  }
  input {
    width: 15em;
  }
`;

export const StyledLink = styled.div`
 font-size: 16px;
 text-align: center;
 margin-top: 1em;
 a {
   /* shows an example of how we can use themes */
   color: black;
   font-weight: 100;
   font-size: 14px;
 }
 a:hover {
   /* shows an example of how we can use themes */
   color: ${props => props.theme.colors.primary};
 }
`;
