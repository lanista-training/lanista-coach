import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const StyledButton = styled(Button)`
  border-radius: 15px!important;
  background: ${props => props.inverted ? 'black!important' : 'transparent'};
  min-width: 100px!important;
  span {
    color: ${props => props.inverted ? 'white' : 'black'};
  }
  .MuiCircularProgress-svg {
    color: ${props => props.inverted ? 'white' : 'black'};
  }
`;
