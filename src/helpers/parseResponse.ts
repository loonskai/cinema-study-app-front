import { ResErrorType, ResSuccessType } from '../interfaces/Api';

export const parseError = (message: string): ResErrorType => ({
  message,
  error: true
});

export default {
  error: (message: string): ResErrorType => ({
    message,
    error: true
  }),

  success: <T>(data: T): ResSuccessType<T> => ({
    data,
    success: true
  })
};
