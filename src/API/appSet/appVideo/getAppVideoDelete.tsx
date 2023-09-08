import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { IAppVideoWriteResponse } from "../../../types/appSet/appVideoWrite.types";
import { instance } from "../../instance";

export const getAppVideoDelete = () => {
  const navigate = useNavigate();

  return useMutation<
    IAppVideoWriteResponse,
    unknown,
    number | undefined,
    unknown
  >(
    "getAppVideoDelete",
    (id: number | undefined) =>
      instance.post("/video/delete", {
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

          navigate("/app/video");
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
