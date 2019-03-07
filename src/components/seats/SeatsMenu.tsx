import React from 'react';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import SelectField from '../fields/SelectField/SelectField';
import { greyColor, whiteColor, mainColor } from '../../constants';

const Container = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem 0;
  background: ${whiteColor};
  border-radius: 5px;
  box-shadow: 0px 0px 0px 1px ${greyColor};
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 0.3rem 1rem;
`;

const CheckboxContainer = styled.div`
  padding: 0 1rem;
`;

const StyledCheckbox = styled(Checkbox)<any>`
  &&.checked {
    color: ${mainColor};
  }
`;

const SeatsMenu = ({
  onHallChange,
  onOptionsChange,
  options,
  hallSelected
}: any) => {
  const handleCheckboxChange = (e: any) => {
    onOptionsChange(e.target.value);
  };

  const renderOptions = (options: any) => {
    const keys = Object.keys(options);
    if (!options || keys.length === 0) return 'No options';
    return keys.map(key => (
      <FormControlLabel
        key={key}
        control={
          <StyledCheckbox
            checked={options[key].value}
            value={key}
            classes={{ checked: 'checked' }}
            onChange={handleCheckboxChange}
          />
        }
        label={options[key].label}
      />
    ));
  };

  return (
    <Container>
      <Row>
        <SelectField
          id="hall"
          type="select"
          entity="hall"
          label="Choose Hall"
          value={hallSelected}
          handleChange={onHallChange}
        />
      </Row>
      <Row>
        Choose seat options:
        <CheckboxContainer>{renderOptions(options)}</CheckboxContainer>
      </Row>
    </Container>
  );
};

export default SeatsMenu;
