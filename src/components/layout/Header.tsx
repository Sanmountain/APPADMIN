import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import DropdownMenu from "./DropdownMenu";
import { useRecoilState, useResetRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";

const Header = () => {
  const [isOpen, setIsOpen] = useState(null);
  const [login, setLogin] = useRecoilState(loginState);
  const resetLogin = useResetRecoilState(loginState);

  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/") return null;

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
      <div className="headerWrapper">
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
            menuItems={["메인문구", "버전관리", "스캔사용자", "동영상관리"]}
            menuPaths={["/app/title", "/app/ver", "/app/scan", "/app/video"]}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <DropdownMenu
            buttonLabel="MMS"
            menuItems={["MMS전송내역", "알림톡내역"]}
            menuPaths={["/mms/mmsSend", "/mms/talkSend"]}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <DropdownMenu
            buttonLabel="사진확인"
            menuItems={["배송사진"]}
            menuPaths={["/photoCheck"]}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
        <div className="headerButton">
          <div onClick={handleUserEdit}>정보수정</div>
          <div onClick={handleLogout}>LOGOUT</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
