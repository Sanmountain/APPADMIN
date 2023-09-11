import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { loginState } from "../../../stores/loginState";
import { instance } from "../../instance";
import {
  IAppVideoModifyVariables,
  IAppVideoWriteResponse,
} from "../../../types/appSet/appVideoWrite.types";

export const getAppVideoModify = (
  title: string,
  videoFileName: string,
  thumbnailFileName: string,
) => {
  const login = useRecoilValue(loginState);

  const navigate = useNavigate();
  const params = useParams();

  return useMutation<
    IAppVideoWriteResponse,
    unknown,
    IAppVideoModifyVariables,
    unknown
  >(
    "getAppVideoModify",
    ({ id, htmlContent }) =>
      instance.post("/video/modify", {
        id,
        title,
        content: htmlContent,
        file_name: videoFileName,
        file_uuid: "",
        thumbnail_name: thumbnailFileName,
        thumbnail_uuid: "",
        user_id: login.userId,
        company: login.company,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          Swal.fire({
            icon: "success",
            title: "수정되었습니다",
            confirmButtonText: "확인",
          });

          navigate(`/app/video/${params.videoId}`);
        } else {
          Swal.fire({
            icon: "warning",
            title: "수정에 실패했습니다. 다시 시도해주세요.",
            confirmButtonText: "확인",
          });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
