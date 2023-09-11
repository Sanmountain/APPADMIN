import { useMutation } from "react-query";
import { instance } from "../../instance";
import { useNavigate } from "react-router";
import { IAppVideoWriteResponse } from "../../../types/appSet/appVideoWrite.types";
import { useRecoilValue } from "recoil";
import { loginState } from "../../../stores/loginState";

export const getAppVideoWrite = (
  title: string,
  videoFileName: string,
  thumbnailFileName: string,
) => {
  const login = useRecoilValue(loginState);

  const navigate = useNavigate();

  return useMutation<IAppVideoWriteResponse, unknown, string, unknown>(
    "getAppVideoWrite",
    (htmlContent: string) =>
      instance.post("/video/write", {
        title,
        content: htmlContent,
        file_name: videoFileName,
        file_uuid: "",
        thumbnail_name: thumbnailFileName,
        thumbnail_uuid: "",
        user_id: login.userId,
        user_name: login.userName,
        company: login.company,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          navigate("/app/video");
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
