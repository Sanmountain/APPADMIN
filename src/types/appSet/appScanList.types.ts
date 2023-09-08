export interface IAppScanListData {
  scan_ymd2: string;
  count: string;
}

export interface IAppScanListResponse {
  result: string;
  message: string;
  list: IAppScanListData[];
}

export interface IExcelFilter {
  year: string;
  month: string;
}

export interface IUserCount {
  scan_ymd2: string;
  count: string;
}

export interface IAppScanUserExcelResponse {
  result: string;
  message: string;
  slx: string[];
  kb: string[];
  uplogis: string[];
  slxCount: IUserCount[];
  kbCount: IUserCount[];
  uplogisCount: IUserCount[];
}
