import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styled from 'styled-components';
import { mainColor } from './../../constants';

export const FormControlStyled = styled(FormControl)<any>`
  && {
    margin-top: 16px;
    margin-bottom: 8px;
  }
`;

export const InputLabelStyled = styled(InputLabel)<any>`
  &&.focused {
    color: ${mainColor};
  }
`;

export const OutlinedInputStyled = styled(OutlinedInput)<any>`
  && {
    min-width: 230px;
  }
  &&.outlined fieldset {
    border-color: ${mainColor};
  }
`;
