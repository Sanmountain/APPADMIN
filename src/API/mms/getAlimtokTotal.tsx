import { useMutation } from "react-query";
import { alimtokInstance } from "../instance";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { Dispatch, SetStateAction } from "react";
import {
  IAlimtokTotalData,
  IAlimtokTotalResponse,
} from "../../types/mms/alimtokTotal.types";

export const getAlimtokTotal = (
  setTotalList: Dispatch<SetStateAction<IAlimtokTotalData[]>>,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAlimtokTotalResponse, unknown, void, unknown>(
    "getAlimtokTotal",
    () =>
      alimtokInstance.post("/history/db_total", {
        company: login.company,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00" || data.result === "25") {
          // NOTE data.result 25는 데이터 없는 경우
          setTotalList(data.list);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
