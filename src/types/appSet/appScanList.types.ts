export interface IAppScanListData {
  scan_ymd2: string;
  tradesub_cd: string;
  tradesub_tel: string;
}

export interface IAppScanListResponse {
  result: string;
  message: string;
  list: IAppScanListData[];
}

export interface IAppScanCountListData {
  scanDate: string;
  userCount: number;
}

export interface IScanUserListState {
  [date: string]: IAppScanListData[];
}
