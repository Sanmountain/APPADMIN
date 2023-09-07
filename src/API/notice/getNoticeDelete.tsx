import { useMutation } from "react-query";
import { instance } from "../instance";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { INoticeDeleteResponse } from "../../types/notice/noticeDelete.types";

export const getNoticeDelete = () => {
  const navigate = useNavigate();

  return useMutation<
    INoticeDeleteResponse,
    unknown,
    string | undefined,
    unknown
  >(
    "getNoticeDelete",
    (id: string | undefined) =>
      instance.post("/notice/delete", {
        id,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          Swal.fire({
            icon: "success",
            title: "삭제되었습니다",
            confirmButtonText: "확인",
          });

          navigate("/notice/list");
        } else {
          Swal.fire({
            icon: "warning",
            title: "삭제 실패했습니다. 다시 시도해주세요.",
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
