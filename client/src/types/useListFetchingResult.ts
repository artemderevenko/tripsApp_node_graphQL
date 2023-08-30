export interface IUseListFetchingResult {
  fetchData: () => Promise<void>,
  isFetching: boolean
}