import { ChangeEvent, useEffect, useState } from "react";
import * as S from "../../styles/appSet/AppTitle.styles";
import { getMainWord } from "../../api/appSet/appTitle/getMainWord";
import { getMainWordWrite } from "../../api/appSet/appTitle/getMainWordWrite";

export default function AppTitle() {
  const [mainWord, setMainWord] = useState("");
  const [changeWord, setChangeWord] = useState("");

  const { mutate: mainWordMutate } = getMainWord(setMainWord);
  const { mutate: mainWordWriteMutate } = getMainWordWrite(
    changeWord,
    setChangeWord,
    mainWordMutate,
  );

  useEffect(() => {
    mainWordMutate();
  }, []);

  const handleChangeMainWord = (e: ChangeEvent<HTMLInputElement>) => {
    setChangeWord(e.target.value);
  };

  const onClickChangeButton = () => {
    mainWordWriteMutate();
  };

  return (
    <S.Container>
      <S.TitleInputContainer>
        <S.Title>현재 메인 문구</S.Title>
        <S.LatestInput type="text" readOnly value={mainWord} />
      </S.TitleInputContainer>
      <S.TitleInputContainer>
        <S.Title>변경할 메인 문구</S.Title>
        <S.ChangeInputContainer>
          <S.ChangeInput type="text" onChange={handleChangeMainWord} />
          <S.ChangeButton onClick={onClickChangeButton}>변경</S.ChangeButton>
        </S.ChangeInputContainer>
      </S.TitleInputContainer>
    </S.Container>
  );
}
