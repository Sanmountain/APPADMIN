import { useQuery } from "react-query";
import { instance } from "../instance";
import { IAppPaymentHistoryResponse } from "../../types/appSet/appPaymentHistory.types";
import { Dispatch, SetStateAction } from "react";

export const getAppPaymentHistory = (
  filter: { name: string; phoneNumber: string },
  page: number,
  setTotal: Dispatch<SetStateAction<number>>,
) => {
  return useQuery<IAppPaymentHistoryResponse>(
    ["getAppPaymentHistory", page],
    () =>
      instance.get("/payment_user/history", {
        params: {
          phone_no: filter.phoneNumber,
          order_name: filter.name,
          page,
          size: 20,
        },
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setTotal(data.lastPage);
          return data.list;
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
