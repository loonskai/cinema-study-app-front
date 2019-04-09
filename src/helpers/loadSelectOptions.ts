// import api from '../ApiService';
import cinemaService from '../services/Cinema';
import hallService from '../services/Hall';
import Cinema from '../classes/Cinema';

import { Dispatch, SetStateAction } from 'react';
import apiService from '../services/Api';
import movieService from '../services/Movie';

export interface Option {
  value: string | number;
  label: string;
}

// SELECT OPTIONS
export const loadAllCinemaOptions = async (
  optionsSetFunc: Dispatch<SetStateAction<Option[] | null>>
): Promise<void> => {
  try {
    const data = await cinemaService.getAll();
    if (!data) {
      throw Error('Unable to load cinema');
    }
    const customizedOptions = data.map((cinema: Cinema) => ({
      value: cinema.id,
      label: cinema.title
    }));
    optionsSetFunc(customizedOptions);
  } catch (error) {
    console.error(error);
    optionsSetFunc([]);
  }
};

export const loadRowCategoryOptions = async (optionsSetFunc?: any) => {
  try {
    const res = await apiService.getRowCategories();
    if (!res) {
      throw Error('Unable to load row categories');
    }
    const customizedOptions = res.data.map(
      (category: { id: number; title: string }) => ({
        value: category.id,
        label: category.title
      })
    );
    if (!optionsSetFunc) {
      return customizedOptions;
    }
    optionsSetFunc(customizedOptions);
  } catch (error) {
    console.error(error);
    optionsSetFunc([]);
  }
};

export const loadTimeOptions = (optionsSetFunc: any) => {
  const options = [] as Array<{ label: string; value: string }>;
  for (let i = 0; i <= 23; i++) {
    const label = i.toString().length > 1 ? `${i}:00` : `0${i}:00`;
    options.push({
      label,
      value: label
    });
  }
  optionsSetFunc(options);
};

// SUGGESTIONS
export const loadMovieSuggestions = async (optionsSetFunc: any) => {
  try {
    const movies = await movieService.getAll();
    const formatedMovies =
      movies &&
      movies.map(movie => ({
        label: movie.title
      }));
    optionsSetFunc(formatedMovies);
  } catch (error) {
    console.error(error);
  }
};

export const loadCitySuggestions = async (optionsSetFunc: any) => {
  try {
    const {
      data: cities
    }: { data: string[] | null } = await apiService.getCities();
    const formatedCitites = cities && cities.map(city => ({ label: city }));
    optionsSetFunc(formatedCitites);
  } catch (error) {
    console.error(error);
  }
};

/* export const loadCinemaByCityOptions = async (
  city: any,
  optionsSetFunc: any
) => {
  try {
    const cinemas: any = await api.loadAllCinemas();
    const filteredCinemas = cinemas.filter(
      (cinema: any) => cinema.city === city
    );
    const customizedOptions = filteredCinemas.map((cinema: any) => ({
      label: cinema.name,
      value: cinema.id
    }));
    optionsSetFunc(customizedOptions);
  } catch (error) {
    console.error(error);
  }
}; */

/* export const loadHallsByCinemaOptions = async (
  cinemaId: any,
  optionsSetFunc: any
) => {
  try {
    const halls: any = await api.loadHallsByCinema(cinemaId);
    const customizedOptions = halls.map((hall: any) => ({
      label: hall.name,
      value: hall.id
    }));
    optionsSetFunc(customizedOptions);
  } catch (error) {
    console.error(error);
  }
}; */

// DYNAMIC CHECKBOX LISTS
/* export const loadCategoryCheckboxesByHall = async (
  hallId: number,
  optionsSetFunc: any
) => {
  try {
    const hallCategories: any = await api.loadRowCategories(hallId);
    const checkboxOptions = hallCategories.reduce((acc: any, category: any) => {
      acc[category.id] = {
        label: category.title,
        value: false
      };
      return acc;
    }, {});
    optionsSetFunc(checkboxOptions);
  } catch (error) {
    console.error(error);
  }
}; */
