import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';

import { loadRowCategoryOptions } from '../../../helpers/loadSelectOptions';
import TextField from '../../fields/TextField/TextField';
import SelectField from '../../fields/SelectField/SelectField';
import RoundButton from '../../buttons/RoundButton';
import { mainColor } from '../../../constants';

interface Props {
  handleSubmit: (newRow: { category: string; quantity: string }) => void;
  prevRows: Array<{ category: string; quantity: string }>;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem 0;
`;

const Title = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const Row = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const RowElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 0 0.3rem;
`;

const NewRowController = (props: Props) => {
  const { handleSubmit, prevRows } = props;
  const [seatsValues, setSeatsValues] = useState({
    category: '',
    quantity: '',
    lastInSection: false
  });
  const [categoryOptions, setCategoryOptions] = useState(null);

  useEffect(() => {
    if (!categoryOptions) {
      loadRowCategoryOptions(setCategoryOptions);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSeatsValues({
      ...seatsValues,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container>
      <Title>Add seat rows</Title>
      <Row>
        <RowElement>
          <SelectField
            id="category"
            type="select"
            options={categoryOptions}
            label="Row Category"
            value={seatsValues.category}
            handleChange={(value: string) => {
              setSeatsValues({
                ...seatsValues,
                category: value
              });
            }}
          />
        </RowElement>
        <RowElement>
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            value={seatsValues.quantity.toString()}
            handleChange={handleChange}
          />
        </RowElement>
        <RowElement>
          <FormControlLabel
            control={
              <Checkbox
                checked={seatsValues.lastInSection}
                onChange={() =>
                  setSeatsValues(prevSeatsValues => ({
                    ...seatsValues,
                    lastInSection: !prevSeatsValues.lastInSection
                  }))
                }
                value="checkedB"
                color="primary"
              />
            }
            label="Last in section"
          />
        </RowElement>
        <RowElement>
          <RoundButton
            icon={<AddIcon />}
            bgColor={mainColor}
            handleClick={() => {
              handleSubmit(seatsValues);
              setSeatsValues({
                category: '',
                quantity: '',
                lastInSection: false
              });
            }}
            disabled={!seatsValues.category || !seatsValues.quantity}
          />
        </RowElement>
      </Row>
      {!!prevRows.length && (
        <Fragment>
          <Row>
            <RowElement>Row Number</RowElement>
            <RowElement>Category</RowElement>
            <RowElement>Quantity</RowElement>
          </Row>
          {prevRows.map(
            (row: { category: string; quantity: string }, index: number) => (
              <Row key={index.toString()}>
                <RowElement>{index + 1}</RowElement>
                <RowElement>{row.category}</RowElement>
                <RowElement>{row.quantity}</RowElement>
              </Row>
            )
          )}
        </Fragment>
      )}
    </Container>
  );
};

export default NewRowController;
