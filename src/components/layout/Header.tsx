import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/header.css";
import DropdownMenu from "./DropdownMenu";
import { useRecoilState, useResetRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState("");
  const [login, setLogin] = useRecoilState(loginState);
  const resetLogin = useResetRecoilState(loginState);

  const appMenu = ["메인문구", "버전관리", "스캔사용자", "동영상관리"];
  const appMenuPath = ["/app/title", "/app/ver", "/app/scan", "/app/video"];
  const LogenMenu = [
    "메인문구",
    "버전관리",
    "배송시간관리",
    "결제사용자관리",
    "장비연결내역",
    "동영상관리",
  ];
  const LogenMenuPath = [
    "/app/title",
    "/app/ver",
    "/app/deliveryTime",
    "/app/paymentUser",
    "/app/product",
    "/app/video",
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    if (login.isUserIdStored) {
      setLogin({ ...login, isLogin: false, userName: "" });
    } else if (!login.isUserIdStored) {
      resetLogin();
    }

    navigate("/");
  };

  const handleUserEdit = () => {
    navigate("/useredit");
  };

  return (
    <div className="header">
      <div
        className={
          login.company === "LOGEN" ? "logenHeaderWrapper" : "headerWrapper"
        }
      >
        <div className="hidden" />
        <div className="headerMenu">
          <DropdownMenu
            buttonLabel="공지사항"
            menuItems={["공지사항 목록", "공지사항 작성"]}
            menuPaths={["/notice/list", "/notice/write"]}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <DropdownMenu
            buttonLabel="앱 관리"
            menuItems={login.company === "LOGEN" ? LogenMenu : appMenu}
            menuPaths={login.company === "LOGEN" ? LogenMenuPath : appMenuPath}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />

          {login.company !== "LOGEN" && (
            <DropdownMenu
              buttonLabel="MMS"
              menuItems={["MMS전송내역", "알림톡내역"]}
              menuPaths={["/mms/mmsSend", "/mms/talkSend"]}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )}

          {login.company !== "LOGEN" && (
            <DropdownMenu
              buttonLabel="사진확인"
              menuItems={["배송사진"]}
              menuPaths={["/photoCheck"]}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
        <div className="headerButtonContainer">
          <div className="userInfo">
            <FaUserCircle style={{ marginTop: "2px" }} />
            {login.userId}
            <button
              className="headerButton editButton"
              onClick={handleUserEdit}
            >
              정보수정
            </button>
          </div>
          <button className="headerButton" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
