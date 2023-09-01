import { useMutation } from "react-query";
import { instance } from "../../instance";
import { Dispatch, SetStateAction } from "react";
import { IAppVideoDetailResponse } from "../../../types/appSet/appVideoDetail.types";
import { useParams } from "react-router";

export const getAppVideoDetail = (
  setVideoDetail: Dispatch<SetStateAction<IAppVideoDetailResponse | undefined>>,
) => {
  const params = useParams();
  const videoId = params.videoId;

  return useMutation<IAppVideoDetailResponse, unknown, void, unknown>(
    "getAppVideoDetail",
    () =>
      instance.post("/video/read", {
        id: Number(videoId),
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setVideoDetail(data);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
