import { UseMutateFunction, useMutation } from "react-query";
import { instance } from "../instance";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { INoticePopUpResponse } from "../../types/notice/noticePopUP.types";
import { INoticeDetailResponse } from "../../types/notice/noticeDetail.types";

export const getNoticePopUpSettingYes = (
  expire: string,
  noticeDetailMutate: UseMutateFunction<
    INoticeDetailResponse,
    unknown,
    void,
    unknown
  >,
) => {
  const params = useParams();

  return useMutation<INoticePopUpResponse, unknown, void, unknown>(
    "getNoticePopUpSettingYes",
    () =>
      instance.post("/notice/popupYes", {
        id: params.noticeId,
        expire,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          Swal.fire({
            icon: "success",
            title: "팝업게시글로 설정되었습니다",
            confirmButtonText: "확인",
          });
          noticeDetailMutate();
        } else {
          Swal.fire({
            icon: "warning",
            title: "설정에 실패했습니다. 다시 시도해주세요.",
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

export const getNoticePopUpSettingNo = (
  noticeDetailMutate: UseMutateFunction<
    INoticeDetailResponse,
    unknown,
    void,
    unknown
  >,
) => {
  const params = useParams();

  return useMutation<INoticePopUpResponse, unknown, void, unknown>(
    "getNoticePopUpSettingNo",
    () =>
      instance.post("/notice/popupNo", {
        id: params.noticeId,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          Swal.fire({
            icon: "success",
            title: "팝업설정을 해제했습니다.",
            confirmButtonText: "확인",
          });
          noticeDetailMutate();
        } else {
          Swal.fire({
            icon: "warning",
            title: "해제에 실패했습니다. 다시 시도해주세요.",
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
