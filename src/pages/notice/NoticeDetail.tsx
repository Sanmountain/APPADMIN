import { useNavigate, useParams } from "react-router";
import { getNoticeDetail } from "../../api/notice/getNoticeDetail";
import * as S from "../../styles/notice/NoticeDetail.styles";
import { useState, useEffect } from "react";
import { Viewer } from "@toast-ui/react-editor";
import { INoticeDetailResponse } from "../../types/notice/noticeDetail.types";
import { getNoticeDelete } from "../../api/notice/getNoticeDelete";
import CommonButton from "../../components/common/CommonButton";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";

export default function NoticeDetail() {
  const login = useRecoilValue(loginState);
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

  const onClickEditNotice = () => {
    navigate(`/notice/${params.noticeId}/edit`);
  };

  const onClickDeleteNotice = () => {
    noticeDeleteMutate(params.noticeId);
  };

  const onClickMoveToList = () => {
    navigate("/notice/list");
  };

  return (
    <S.Container>
      <S.HeadContainer>
        <S.Title>{contents?.title}</S.Title>
        <S.TopContainer>
          <S.InfoContainer>
            <S.Info>작성자: {contents?.user_id}</S.Info>
            <S.Info>{contents?.reg_date}</S.Info>
          </S.InfoContainer>
          <S.ButtonContainer>
            {login.isLogin && (
              <>
                <CommonButton contents="수정" onClickFn={onClickEditNotice} />
                <CommonButton contents="삭제" onClickFn={onClickDeleteNotice} />
              </>
            )}
            <CommonButton contents="목록" onClickFn={onClickMoveToList} />
          </S.ButtonContainer>
        </S.TopContainer>
      </S.HeadContainer>
      <S.DetailContainer>
        <Viewer key={contents?.content} initialValue={contents?.content} />
      </S.DetailContainer>
    </S.Container>
  );
}
