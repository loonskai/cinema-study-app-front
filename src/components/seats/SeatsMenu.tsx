import React from 'react';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// import SelectField from '../fields/SelectField/SelectField';
import { greyColor, whiteColor, mainColor } from '../../constants';

const Container = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem 0;
  background: ${whiteColor};
  border-radius: 0.3125rem;
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
  // onHallChange,
  onOptionsChange,
  options
}: // hallId
any) => {
  const renderCategoriesCheckboxes = (options: any) => {
    const keys = Object.keys(options);
    if (!options || !keys.length) return 'No options';
    return keys.map(key => (
      <FormControlLabel
        key={key}
        control={
          <StyledCheckbox
            checked={options[key].value}
            value={key}
            classes={{ checked: 'checked' }}
            onChange={(e: any) => {
              onOptionsChange(e.target.value);
            }}
          />
        }
        label={options[key].label}
      />
    ));
  };

  return (
    <Container>
      {/*       <Row>
        <SelectField
          id="hall"
          type="select"
          options={options}
          label="Choose Hall"
          value={hallSelected}
          handleChange={onHallChange}
        />
      </Row> */}
      {/* {hallSelected && ( */}
      <Row>
        Choose seat options:
        <CheckboxContainer>
          {renderCategoriesCheckboxes(options)}
        </CheckboxContainer>
      </Row>
      {/* )} */}
    </Container>
  );
};

export default SeatsMenu;
