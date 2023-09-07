export interface IAppProductData {
  id: number;
  tradesub_tel: string;
  tradesub_cd: number;
  product_name: string;
  product_category: string;
  mac_address: string;
  company: string;
  reg_date: string;
  update_date: string;
}

export interface IAppProductResponse {
  result: string;
  message: string;
  startPage: number;
  endPage: number;
  lastPage: number;
  currentPage: number;
  list: IAppProductData[];
}

export interface IFilterOption {
  tradeSubTelephone: string;
  tradeSubCode: number | null;
  productName: string;
  productCategory: string;
}
