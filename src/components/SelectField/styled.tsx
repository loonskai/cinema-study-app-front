import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styled from 'styled-components';

export const FormControlStyled = styled(FormControl)`
  && {
    margin-top: 16px;
    margin-bottom: 8px;
  }
`;

export const InputLabelStyled = styled(InputLabel)`
  &&.focused {
    color: #009688;
  }
`;

export const OutlinedInputStyled = styled(OutlinedInput)`
  && {
    min-width: 230px;
  }
  &&.outlined fieldset {
    border-color: #009688;
  }
`;
