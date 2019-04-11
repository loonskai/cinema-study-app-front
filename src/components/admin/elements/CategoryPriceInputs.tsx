import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import apiService from '../../../services/Api';
import { RowCategoryAPIType } from '../../../interfaces/Api';

export interface PriceObj {
  id: number;
  price: number | string;
}

interface Props {
  hallID: number;
  prices: { [key: string]: PriceObj } | null;
  handleSetPrices: any;
}

const Container = styled.div``;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
`;

const CategoryInfo = styled.div``;

const CategoryPriceInputs: React.FC<Props> = ({
  hallID,
  prices,
  handleSetPrices
}) => {
  const [categories, setCategories] = useState<RowCategoryAPIType[] | null>(
    null
  );

  useEffect(() => {
    if (!categories) {
      loadCategories();
    }
  }, [hallID]);

  const loadCategories = async () => {
    try {
      const res = await apiService.getRowCategories({ hallID });
      if (!res.data || res.error) {
        throw Error('Unable to load row categories');
      }
      const prices = res.data.reduce(
        (acc, category) => {
          acc[category.title] = {
            id: category.id,
            price: 0
          };
          return acc;
        },
        {} as { [key: string]: PriceObj }
      );
      setCategories(res.data);
      handleSetPrices(prices);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!prices || +e.target.value < 0) {
      return;
    }
    const updatedPrices = {
      ...prices,
      [e.target.name]: {
        id: prices[e.target.name].id,
        price: +e.target.value
      }
    };
    handleSetPrices(updatedPrices);
  };

  return (
    <Container>
      Prices:
      {categories &&
        categories.map(category => (
          <CategoryContainer>
            <CategoryInfo>
              <div>Category: {category.title}</div>
              <div>ID: {category.id}</div>
            </CategoryInfo>
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              margin="none"
              name={category.title}
              value={prices ? prices[category.title].price : ''}
              onChange={prices && handleChange}
            />
          </CategoryContainer>
        ))}
    </Container>
  );
};

export default CategoryPriceInputs;
