export interface INoticeModifyResponse {
  message: string;
  result: string;
  count: number;
  fail: number;
  success_list: string[] | [];
  fail_list: string[] | [];
}

export type INoticeModifyVariables = {
  id: number;
  htmlContent: string;
};
