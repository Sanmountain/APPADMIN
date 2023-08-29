import { useEffect, useState } from "react";
import { getNoticeList } from "../../api/notice/getNoticeList";
import * as S from "../../styles/notice/NoticeList.styles";
import { INoticeListData } from "../../types/notice/noticeList.types";
import { useNavigate } from "react-router";

export default function NoticeList() {
  const [noticeList, setNoticeList] = useState<INoticeListData[]>([]);

  const { mutate: noticeListMutate } = getNoticeList(0, setNoticeList);

  const navigate = useNavigate();

  useEffect(() => {
    noticeListMutate();
  }, []);

  const onClickNotice = (noticeId: string) => {
    navigate(`/notice/${noticeId}`);
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>id</S.Title>
        <S.Title>제목</S.Title>
        <S.Title>작성일</S.Title>
        <S.Title>작성자</S.Title>
        <S.Title>팝업만기일</S.Title>
        <S.Title>팝업여부</S.Title>
      </S.TitleContainer>

      <S.ContentsListContainer>
        {noticeList?.map((item) => (
          <S.ContentsContainer
            key={item.id}
            onClick={() => onClickNotice(item.id)}
          >
            <S.Contents>{item.id}</S.Contents>
            <S.Contents>{item.title}</S.Contents>
            <S.Contents>{item.reg_date}</S.Contents>
            <S.Contents>{item.user_id}</S.Contents>
            <S.Contents>{item.popup === "Y" ? item.expire : ""}</S.Contents>
            <S.Contents>{item.popup}</S.Contents>
          </S.ContentsContainer>
        ))}
      </S.ContentsListContainer>

      <S.PaginationContainer></S.PaginationContainer>
    </S.Container>
  );
}
