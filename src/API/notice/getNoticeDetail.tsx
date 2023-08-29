import { useMutation } from "react-query";
import { instance } from "../instance";
import { INoticeDetailResponse } from "../../types/notice/noticeDetail.types";
import { Dispatch, SetStateAction } from "react";

export const getNoticeDetail = (
  id: number,
  setContents: Dispatch<SetStateAction<INoticeDetailResponse | undefined>>,
) => {
  return useMutation<INoticeDetailResponse, unknown, void, unknown>(
    "getNoticeDetail",
    () =>
      instance.post("/notice/info", {
        id,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setContents(data);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
