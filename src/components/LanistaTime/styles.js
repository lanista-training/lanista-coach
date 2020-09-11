import styled from 'styled-components';
import NestedMenuItem from 'material-ui-nested-menu-item';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Menu from '@material-ui/core/Menu';

export const InputField = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: transparent;
  align-items: center;
  .value-section {
    flex: 1;
    text-align: ${props => props.editing ? 'center' : 'right'};;
  }
`;

export const StyledButtonGroup = styled(ButtonGroup)`
  .MuiButton-outlinedPrimary {
    color: #000000!important;
    border: 1px solid rgba(0, 0, 0, 0.5)!important;
  }
  .selected {
    background: black!important;
    color: white!important;
  }
`;

export const TimeBlockSection = styled.div`
  padding: 2em;
  .MuiFormControl-root {
    margin-right: 1em;
  }
  .select-section {
    display: flex;
    justify-content: space-between;
  }
  .buttons-section {
    padding-top: 2em;
    min-width: 15em;
    display: flex;
    justify-content: space-between;
  }
`;
