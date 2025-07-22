export type ResponseViewModel<T> = {
  data: T;
  message?: string;
  status?: 'success' | 'error';
};
