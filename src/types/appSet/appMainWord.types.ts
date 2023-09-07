export interface IAppMainWordResponse {
  message: string;
  result: string;
  id: number;
  word: string;
  reg_date: string;
  update_date: string;
  company: string;
}

export interface IAppMainWordWriteResponse {
  result: string;
  message: string;
  count: number;
  fail: number;
  success_list: string[] | [];
  fail_list: string[] | [];
}
