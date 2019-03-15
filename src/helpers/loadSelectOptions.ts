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

export const loadAllCategoryOptions = async (optionsSetFunc: any) => {
  try {
    const data: any = await api.loadRowCategories();
    if (data) {
      const customizedOptions = data.map((category: any) => ({
        label: category,
        value: category
      }));
      optionsSetFunc(customizedOptions);
    }
  } catch (error) {
    console.error(error);
  }
};
