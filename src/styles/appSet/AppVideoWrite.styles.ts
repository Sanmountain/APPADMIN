import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 85%;
  min-height: 750px;
  margin-top: 7%;
  padding: 25px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
`;

export const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  background-color: #f8f9fa;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  padding: 0 5px;
  font-size: 18px;
  margin-bottom: 20px;

  &::placeholder {
    font-size: 14px;
  }
`;

export const FileUploadContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 40px;
  margin-bottom: 20px;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const UploadFileName = styled.div`
  display: flex;
  align-items: center;

  font-size: 14px;
  width: 170px;
  height: 100%;
  margin-left: 10px;
  margin-right: 50px;
  white-space: nowrap;
  overflow: hidden;
`;

export const EditorContainer = styled.div`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 40px;
  margin-top: 30px;
`;

export const WriteButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  color: black;
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 10px;
  cursor: pointer;
`;
