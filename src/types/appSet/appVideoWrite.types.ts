export interface IAppVideoWriteResponse {
  result: string;
  message: string;
  count: number;
  fail: number;
  success_list: string[] | [];
  fail_list: string[] | [];
}

export type IAppVideoModifyVariables = {
  id: number;
  htmlContent: string;
};
