export interface IAppInfoListData {
  id: string;
  app_ver: string;
  program: string;
  apk_url: string;
  company: string;
  reg_date: string;
  update_date: string;
  user_id: string;
}

export interface IAppInfoListResponse {
  message: string;
  result: string;
  list: IAppInfoListData[];
}

export interface IAppInfoRegistResponse {
  message: string;
  result: string;
  count: number;
  fail: number;
  success_list: string[];
  fail_list: string[];
}

export interface IAppInfoDeleteResponse {
  message: string;
  result: string;
  count: number;
  fail: number;
  success_list: string[];
  fail_list: string[];
}

export interface IAppInfoEdit {
  [program: string]: {
    app_ver: string;
    apk_url: string;
  };
}
