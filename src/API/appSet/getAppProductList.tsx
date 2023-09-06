import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { Dispatch, SetStateAction } from "react";
import { loginState } from "../../stores/loginState";
import { instance } from "../instance";
import {
  IAppProductData,
  IAppProductResponse,
  IFilterOption,
} from "../../types/appSet/appProduct.types";

export const getAppProductList = (
  page: number,
  filterOption: IFilterOption,
  setAppProductList: Dispatch<SetStateAction<IAppProductData[]>>,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAppProductResponse, unknown, void, unknown>(
    "getAppProductList",
    () =>
      instance.post("/product/list", {
        page,
        tradesub_tel: filterOption.tradeSubTelephone,
        tradesub_cd: filterOption.tradeSubCode,
        product_name: filterOption.productName,
        product_category: filterOption.productCategory,
        company: login.company,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setAppProductList(data.list);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
