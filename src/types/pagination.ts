export type WithPagination<T> = {
  data: T[];
  meta: {
    total: number;
    current: number;
  };
};
