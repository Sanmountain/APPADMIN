import { instance } from "./instance";

export const getFileUpload = (formData: FormData) => {
  return instance.post("/file/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
