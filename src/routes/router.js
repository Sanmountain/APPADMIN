import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Header from "../components/Header";
import NoticeList from "../pages/notice/NoticeList";
import NoticeWrite from "../pages/notice/NoticeWrite";
import AppTitle from "../pages/appSet/AppTitle";
import AppVer from "../pages/appSet/AppVer";
import AppScan from "../pages/appSet/AppScan";
import AppVideo from "../pages/appSet/AppVideo";
import MmsSend from "../pages/mms/MmsSend";
import TalkSend from "../pages/mms/TalkSend";
import PhotoCheck from "../pages/PhotoCheck";
import UserEdit from "../pages/UserEdit";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/notice/list' element={<NoticeList />} />
        <Route path='/notice/write' element={<NoticeWrite />} />
        <Route path='/app/title' element={<AppTitle />} />
        <Route path='/app/ver' element={<AppVer />} />
        <Route path='/app/scan' element={<AppScan />} />
        <Route path='/app/video' element={<AppVideo />} />
        <Route path='/mms/mmssend' element={<MmsSend />} />
        <Route path='/mms/talksend' element={<TalkSend />} />
        <Route path='/photocheck' element={<PhotoCheck />} />
        <Route path='/useredit' element={<UserEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
