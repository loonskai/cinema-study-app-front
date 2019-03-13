import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { mainColor } from '../../../constants';

export const FormControlStyled = styled(FormControl)<any>`
  && {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
`;

export const InputLabelStyled = styled(InputLabel)<any>`
  &&.focused {
    color: ${mainColor};
  }
`;

export const OutlinedInputStyled = styled(OutlinedInput)<any>`
  && {
    min-width: 14.375rem;
  }
  &&.outlined fieldset {
    border-color: ${mainColor};
  }
`;
