import { useQuery } from "react-query";
import { alimtokInstance } from "../instance";
import { IAlimtokDetailResponse } from "../../types/mms/alimtokDetail.types";
import { useParams } from "react-router";

export const getAlimtokDetail = () => {
  const params = useParams();
  const page = params.page;
  const limit = params.limit;
  const mid = params.id;

  return useQuery<IAlimtokDetailResponse>(
    ["getAlimtokDetail"],
    () =>
      alimtokInstance.get("/history/detail", {
        params: { limit, mid, page },
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00" || data.result === "25") {
          return data.list;
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
