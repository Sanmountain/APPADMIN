import { Viewer } from "@toast-ui/react-editor";
import * as S from "../../styles/notice/NoticeDetail.styles";
import { useParams } from "react-router";
import { getNoticeDetail } from "../../api/notice/getNoticeDetail";
import { useEffect, useState } from "react";
import { INoticeDetailResponse } from "../../types/notice/noticeDetail.types";

export default function NoticePopUp() {
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
    <S.Container className="popup">
      <S.DetailContainer className="popup">
        <Viewer key={contents?.content} initialValue={contents?.content} />
      </S.DetailContainer>
    </S.Container>
  );
}
