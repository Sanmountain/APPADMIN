import { useMutation } from "react-query";
import { instance } from "../instance";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { INoticeWriteResponse } from "../../types/notice/noticeWrite.types";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export const getNoticeWrite = (title: string) => {
  const login = useRecoilValue(loginState);

  const navigate = useNavigate();

  return useMutation<INoticeWriteResponse, unknown, string, unknown>(
    "getNoticeWrite",
    (htmlContent: string) =>
      instance.post("/notice/write", {
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
            title: "등록되었습니다",
            confirmButtonText: "확인",
          });

          navigate("/notice/list");
        } else {
          Swal.fire({
            icon: "warning",
            title: "등록에 실패했습니다. 다시 시도해주세요.",
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
