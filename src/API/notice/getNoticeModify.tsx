import { useMutation } from "react-query";
import { instance } from "../instance";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import {
  INoticeModifyResponse,
  INoticeModifyVariables,
} from "../../types/notice/noticeModify.types";

export const getNoticeModify = (title: string) => {
  const login = useRecoilValue(loginState);

  const navigate = useNavigate();
  const params = useParams();

  return useMutation<
    INoticeModifyResponse,
    unknown,
    INoticeModifyVariables,
    unknown
  >(
    "getNoticeModify",
    ({ id, htmlContent }) =>
      instance.post("/notice/modify", {
        id,
        title,
        content: htmlContent,
        file_name: "",
        file_uuid: "",
        user_id: login.userId,
        company: login.company,
        trades: "",
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          Swal.fire({
            icon: "success",
            title: "수정되었습니다",
            confirmButtonText: "확인",
          });

          navigate(`/notice/${params.noticeId}`);
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
