import { useNavigate, useParams } from "react-router";
import { getNoticeDetail } from "../../api/notice/getNoticeDetail";
import * as S from "../../styles/notice/NoticeDetail.styles";
import { useState, useEffect } from "react";
import { Viewer } from "@toast-ui/react-editor";
import { INoticeDetailResponse } from "../../types/notice/noticeDetail.types";
import { getNoticeDelete } from "../../api/notice/getNoticeDelete";

export default function NoticeDetail() {
  const [contents, setContents] = useState<INoticeDetailResponse>();

  const params = useParams();
  const navigate = useNavigate();

  const { mutate: noticeDetailMutate } = getNoticeDetail(
    Number(params.noticeId),
    setContents,
  );
  const { mutate: noticeDeleteMutate } = getNoticeDelete();

  useEffect(() => {
    noticeDetailMutate();
  }, []);

  const onClickDeleteNotice = () => {
    noticeDeleteMutate(params.noticeId);
  };

  const onClickMoveToList = () => {
    navigate("/notice/list");
  };

  return (
    <S.Container>
      <S.HeadContainer>
        <S.Title>제목</S.Title>
        <S.TopContainer>
          <S.InfoContainer>
            <S.Info>작성자: 작성자</S.Info>
            <S.Info>2023-08-28 09:00:00</S.Info>
          </S.InfoContainer>
          <S.ButtonContainer>
            <S.EditDeleteButton>수정</S.EditDeleteButton>
            <S.EditDeleteButton onClick={onClickDeleteNotice}>
              삭제
            </S.EditDeleteButton>
            <S.EditDeleteButton onClick={onClickMoveToList}>
              목록
            </S.EditDeleteButton>
          </S.ButtonContainer>
        </S.TopContainer>
      </S.HeadContainer>
      <S.DetailContainer>
        <Viewer key={contents?.content} initialValue={contents?.content} />
      </S.DetailContainer>
    </S.Container>
  );
}
