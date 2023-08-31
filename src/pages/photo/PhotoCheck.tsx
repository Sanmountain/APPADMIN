import * as S from "../../styles/PhotoCheck.styles";
import CommonButton from "../../components/common/CommonButton";

export default function PhotoCheck() {
  const onClickSearchButton = () => {};

  return (
    <S.Container>
      <S.TitleInputContainer>
        <S.Title>Photo View</S.Title>
      </S.TitleInputContainer>
      <S.FilterContainer>
        <S.WorkTitle>택배사:</S.WorkTitle>
        <S.WorkSelectBox>
          <option disabled hidden selected>
            택배사
          </option>
          <option>SLX</option>
        </S.WorkSelectBox>
      </S.FilterContainer>
      <S.SearchContainer>
        <S.WorkTitle>송장번호 검색:</S.WorkTitle>
        <S.WorkInput type="text" />
        <CommonButton contents="검색" onClickFn={onClickSearchButton} />
      </S.SearchContainer>
    </S.Container>
  );
}
