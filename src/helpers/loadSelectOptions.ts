import api from '../ApiService';

export const loadAllCinemaOptions = async (optionsSetFunc: any) => {
  try {
    const data: any = await api.loadAllCinemas();
    if (data) {
      const customizedOptions = data.map((cinema: any) => ({
        label: cinema.name,
        value: cinema.id
      }));
      optionsSetFunc(customizedOptions);
    }
  } catch (error) {
    console.error(error);
  }
};

export const loadCinemaByCityOptions = async (
  city: any,
  optionsSetFunc: any
) => {
  try {
    const data: any = await api.loadAllCinemas();
    console.log(data);
    if (data) {
      /* const customizedOptions = data.map((cinema: any) => ({
        label: cinema.name,
        value: cinema.id
      }));
      optionsSetFunc(customizedOptions); */
    }
  } catch (error) {
    console.error(error);
  }
};

export const loadAllCategoryOptions = async (optionsSetFunc: any) => {
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
};

export const loadCategoryCheckboxesByHall = async (
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
};

// SUGGESTIONS
export const loadCitySuggestions = async (optionsSetFunc: any) => {
  try {
    const cities: any = await api.loadCities();
    const formatedCitites = cities.map((city: any) => ({ label: city }));
    optionsSetFunc(formatedCitites);
  } catch (error) {
    console.error(error);
  }
};
