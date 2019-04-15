import { ResType } from '../interfaces/Api';
import { AxiosError } from 'axios';

export const parseErrorMessage = (error: AxiosError): string =>
  error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message;

export default {
  error: (error: AxiosError): ResType<Error> => {
    return {
      message: parseErrorMessage(error),
      error: true
    };
  },

  success: <T>(data: T): ResType<T> => ({
    data,
    success: true
  })
};
