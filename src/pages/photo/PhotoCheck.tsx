import * as S from "../../styles/PhotoCheck.styles";
import CommonButton from "../../components/common/CommonButton";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { ChangeEvent, useState } from "react";
import NotFound from "../../assets/image/img_notFound.jpg";

export default function PhotoCheck() {
  const [searchOption, setSearchOption] = useState({
    company: "",
    invoiceNumber: null,
  });
  const [imageUrl, setImageUrl] = useState("");

  const login = useRecoilValue(loginState);

  const handleOptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setSearchOption({ ...searchOption, [name]: value });
  };

  const onClickSearchButton = () => {
    setImageUrl(
      `https://jhcfile.jhcon.net/FILE_SERVER/slx/file_download?fileName=${searchOption.company}_${searchOption.invoiceNumber}.jpg`,
    );
  };

  return (
    <S.Container>
      <S.FilterContainer>
        <S.WorkSelectBox
          name="company"
          value={searchOption.company}
          onChange={(e) => handleOptionChange(e)}
        >
          <option value="">택배사</option>
          <option value={login.company}>{login.company}</option>
        </S.WorkSelectBox>
        <S.WorkInput
          name="invoiceNumber"
          onChange={(e) => handleOptionChange(e)}
        />
        <CommonButton contents="검색" onClickFn={onClickSearchButton} />
      </S.FilterContainer>
      <S.ImageContainer>
        {!imageUrl ? (
          <S.ImageInfo>송장번호를 검색해주세요.</S.ImageInfo>
        ) : (
          <S.Image
            src={imageUrl}
            onError={(e) => (e.currentTarget.src = NotFound)}
          />
        )}
      </S.ImageContainer>
    </S.Container>
  );
}
