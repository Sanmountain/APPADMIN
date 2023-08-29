import { useParams } from "react-router";
import { getNoticeDetail } from "../../api/notice/getNoticeDetail";
import * as S from "../../styles/notice/NoticeDetail.styles";
import { useState, useEffect } from "react";
import { Viewer } from "@toast-ui/react-editor";
import { INoticeDetailResponse } from "../../types/notice/noticeDetail.types";

export default function NoticeDetail() {
  const [contents, setContents] = useState<INoticeDetailResponse>();
  const params = useParams();

  const { mutate: noticeDetailMutate } = getNoticeDetail(
    Number(params.noticeId),
    setContents,
  );

  useEffect(() => {
    noticeDetailMutate();
  }, []);

  return (
    <S.Container>
      <S.HeadContainer>
        <S.Title>제목</S.Title>
        <S.InfoContainer>
          <S.Info>2023-08-28 09:00:00</S.Info>
          <S.Info>작성자: 작성자</S.Info>
          <S.ButtonContainer>
            <S.EditDeleteButton>수정</S.EditDeleteButton>
            <S.EditDeleteButton>삭제</S.EditDeleteButton>
          </S.ButtonContainer>
        </S.InfoContainer>
      </S.HeadContainer>
      <S.DetailContainer>
        <Viewer key={contents?.content} initialValue={contents?.content} />
      </S.DetailContainer>
    </S.Container>
  );
}
