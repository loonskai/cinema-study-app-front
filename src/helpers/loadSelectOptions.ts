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

export const loadCategoryCheckboxesByHall = async (
  hallId: number,
  optionsSetFunc: any
) => {
  try {
    const data: any = await api.loadRowCategories(hallId);
    if (data) {
      const customizedOptions = data.reduce(
        (acc: any, category: string, index: number) => {
          // Creates object { 1: { label: 'VIP', value: false }, ... } and attaches it to rowCategories in SeatsContainer
          acc[index + 1] = {
            label: category,
            value: false
          };
          return acc;
        },
        {}
      );
      optionsSetFunc(customizedOptions);
    }
  } catch (error) {
    console.error(error);
  }
};
