export default interface IPagination<T> {
  page: number;
  total: number;
  data: T[];
  nroPages: number;
}
