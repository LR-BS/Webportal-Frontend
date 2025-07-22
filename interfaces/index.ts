export interface PaginationResponse<TData extends object> {
  data?: TData[] | undefined;
  currentPage: number;
  filtered: number;
  totalCount: number;
}
