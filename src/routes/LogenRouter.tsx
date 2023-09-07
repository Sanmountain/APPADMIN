import { useRecoilValue } from "recoil";
import { loginState } from "../stores/loginState";
import { Navigate } from "react-router";
import { ReactNode, useEffect } from "react";
import Swal from "sweetalert2";

type LogenRouteProps = {
  children: ReactNode;
};

export default function LogenRouter({ children }: LogenRouteProps) {
  const login = useRecoilValue(loginState);

  useEffect(() => {
    if (login.company === "LOGEN") {
      Swal.fire({
        title: "Error!",
        text: "접근할 수 없는 메뉴입니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    }
  }, [login.isLogin]);

  return login.company === "LOGEN" ? <Navigate to="/" /> : <>{children}</>;
}
