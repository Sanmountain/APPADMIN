import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 20px;
  position: relative;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  position: absolute;
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
  width: 250px;
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
