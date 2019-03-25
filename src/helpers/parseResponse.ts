import { ResType } from '../interfaces/Api';
import { AxiosError } from 'axios';

export default {
  error: (error: AxiosError): ResType<Error> => {
    return {
      message:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
      error: true
    };
  },

  success: <T>(data: T): ResType<T> => ({
    data,
    success: true
  })
};
