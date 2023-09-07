import { useMutation } from "react-query";
import { alimtokInstance } from "../instance";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { Dispatch, SetStateAction } from "react";
import { IAlimtokInvoiceListResponse } from "../../types/mms/alimtokInvoiceList.types";
import {
  IExcelFilter,
  IMMSInvoiceList,
} from "../../types/mms/alimtokList.types";

export const getAlimtokInvoiceList = (
  excelFilter: IExcelFilter,
  deliveryCode: string,
  type: string,
  setList: Dispatch<SetStateAction<IMMSInvoiceList[]>>,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAlimtokInvoiceListResponse, unknown, void, unknown>(
    "getAlimtokInvoiceList",
    () =>
      alimtokInstance.post("/history/db_invoice", {
        front_date: excelFilter.startDate,
        rear_date: excelFilter.endDate,
        template_cd: "",
        delivery_code: deliveryCode,
        tradesub_cd: "",
        type,
        company: login.company,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          // NOTE data.result 25는 데이터 없는 경우
          setList(data.list);
        } else if (data.result === "25") {
          setList([]);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
