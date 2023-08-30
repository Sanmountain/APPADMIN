import { instance } from "./instance";

export const getFileUpload = async (formData: FormData) => {
  return await instance.post("/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
