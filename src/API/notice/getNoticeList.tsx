import { useMutation } from "react-query";
import { instance } from "../instance";
import {
  INoticeListData,
  INoticeListResponse,
} from "../../types/notice/noticeList.types";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { Dispatch, SetStateAction } from "react";

export const getNoticeList = (
  page: number,
  setNoticeList: Dispatch<SetStateAction<INoticeListData[]>>,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<INoticeListResponse, unknown, void, unknown>(
    "getNoticeList",
    () =>
      instance.post("/notice/list", {
        page,
        company: login.company,
        trade_cd: login.trade_cd,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setNoticeList(data.list);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
