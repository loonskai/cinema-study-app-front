// import api from '../ApiService';
import cinemaService from '../services/Cinema';
import Cinema from '../classes/Cinema';

import { Dispatch, SetStateAction } from 'react';

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

/* export const loadAllCategoryOptions = async (optionsSetFunc: any) => {
  try {
    const data: any = await api.loadRowCategories();
    if (data) {
      const customizedOptions = data.map((category: any) => ({
        label: category.title,
        value: category.title
      }));
      optionsSetFunc(customizedOptions);
    }
  } catch (error) {
    console.error(error);
  }
}; */

/* export const loadTimeOptions = (optionsSetFunc: any) => {
  const options = [] as any;
  for (let i = 0; i <= 23; i++) {
    const label = i.toString().length > 1 ? `${i}:00` : `0${i}:00`;
    options.push({
      label,
      value: label
    });
  }
  optionsSetFunc(options);
}; */

// SUGGESTIONS
/* export const loadCitySuggestions = async (optionsSetFunc: any) => {
  try {
    const cities: any = await api.loadCities();
    const formatedCitites = cities.map((city: any) => ({ label: city }));
    optionsSetFunc(formatedCitites);
  } catch (error) {
    console.error(error);
  }
}; */
/* 
export const loadMovieSuggestions = async (optionsSetFunc: any) => {
  try {
    const movies: any = await api.loadMoviesList();
    const formatedMovies = movies.map((movie: any) => ({
      label: movie.original_title
    }));
    optionsSetFunc(formatedMovies);
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
