import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

import { mainColor } from '../../../constants';
import TextField from '../../fields/TextField/TextField';
import RoundButton from '../../buttons/RoundButton';

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
`;

const RowElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 0 0.3rem;
`;

const AddRows = ({ handleSubmit, prevRows }: any) => {
  const [seatsValues, setSeatsValues] = useState({
    category: '',
    quantity: ''
  });

  const handleChange = (e: any) => {
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
          <TextField
            name="category"
            label="Category"
            value={seatsValues.category}
            handleChange={handleChange}
            withoutSuggestions={true}
          />
        </RowElement>
        <RowElement>
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            value={seatsValues.quantity.toString()}
            handleChange={handleChange}
            withoutSuggestions={true}
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
                quantity: ''
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
                <RowElement style={{ fontWeight: 700 }}>{index + 1}</RowElement>
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

export default AddRows;
