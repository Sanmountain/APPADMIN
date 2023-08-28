// Toast 에디터
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
// Toast ColorSyntax 플러그인
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
// Toast 한글 플러그인
import "@toast-ui/editor/dist/i18n/ko-kr";
import * as S from "../../styles/notice/NoticeWrite.styles";
import { useRef, useState, ChangeEvent } from "react";
import { getNoticeWrite } from "../../api/notice/getNoticeWrite";

export default function NoticeWrite() {
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
  ];

  const [title, setTitle] = useState("");

  const editorRef = useRef<Editor | null>(null);

  const { mutate: noticeWriteMutate } = getNoticeWrite(title);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // NOTE Editor에 이미지 업로드 시 이미지 업로드 API
  const handleImageUpload = async (
    blob: Blob | File,
    callback: (url: string) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", blob);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.url && typeof data.url === "string") {
        callback(data.url);
      } else {
        console.error("Invalid URL received from server");
      }
    } catch (error) {
      console.error("Image upload failed: ", error);
    }
  };

  const onClickWriteButton = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const htmlContent = editorInstance.getHTML();
      noticeWriteMutate(htmlContent);
    }
  };

  return (
    <S.Container>
      <S.TitleInput placeholder="제목을 입력해주세요." onChange={handleTitle} />
      <S.EditorContainer>
        <Editor
          ref={editorRef}
          placeholder="내용을 입력해주세요."
          initialEditType="wysiwyg"
          previewStyle="vertical"
          plugins={[colorSyntax]}
          toolbarItems={toolbarItems}
          height="580px"
          language="ko-KR"
          hooks={{ addImageBlobHook: handleImageUpload }}
        />
      </S.EditorContainer>
      <S.ButtonContainer>
        <S.WriteButton onClick={onClickWriteButton}>작성하기</S.WriteButton>
      </S.ButtonContainer>
    </S.Container>
  );
}
