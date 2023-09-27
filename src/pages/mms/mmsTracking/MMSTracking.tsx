import { useNavigate } from "react-router";
import CommonButton from "../../../components/common/CommonButton";
import * as S from "../../../styles/mms/MMSTracking.styles";

export default function MMSTracking() {
  const navigate = useNavigate();

  const onClickMoveToDetail = (id: string) => {
    navigate(`/mms/tracking/detail/${id}`);
  };

  return (
    <S.Container>
      <S.TopContainer>
        <S.FilterContainer>
          <S.Input placeholder="송장번호" />
          <CommonButton contents="조회" onClickFn={() => console.log("dddd")} />
        </S.FilterContainer>
      </S.TopContainer>

      <S.TitleContainer>
        <S.Title>배송기사 전화</S.Title>
        <S.Title>상태</S.Title>
        <S.Title>배송</S.Title>
        <S.Title>내역</S.Title>
      </S.TitleContainer>
      <S.ContentsListContainer>
        <S.ContentsContainer>
          <S.Contents>010-1111-1111</S.Contents>
          <S.Contents>배송출발</S.Contents>
          <S.Contents>새벽배송</S.Contents>
          <S.Contents>
            <CommonButton
              contents="상세"
              onClickFn={() => onClickMoveToDetail("1")}
            />
          </S.Contents>
        </S.ContentsContainer>
      </S.ContentsListContainer>
    </S.Container>
  );
}
