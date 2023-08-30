export interface IAppScanDetailListData {
  scan_ymd2: string;
  tradesub_cd: string;
  tradesub_tel: string;
}

export interface IAppScanDetailListResponse {
  result: string;
  message: string;
  list: IAppScanDetailListData[];
}
