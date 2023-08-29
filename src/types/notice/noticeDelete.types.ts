export interface INoticeDeleteResponse {
  message: string;
  result: string;
  count: number;
  fail: number;
  success_list: string[] | [];
  fail_list: string[] | [];
}
