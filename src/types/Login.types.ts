export interface ILoginState {
  isLogin: boolean;
  isUserIdStored: boolean;
  userId: string;
  userName: string;
}

export interface ILoginResponse {
  message: string;
  result: string;
  id: string;
  user_id: string;
  user_pw: string;
  user_name: string;
  user_phone: string;
  trade_cd: string;
  tradesub_cd: string;
  company: string;
  del_it: string;
  reg_date: string;
  update_date: string;
}

export interface IRegistResponse {
  result: string;
  message: string;
  count: number;
  fail: number;
  success_list: string[];
  fail_list: string[];
}
