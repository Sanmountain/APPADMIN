import { instance } from "./instance";

export const getFileUpload = async (formData: FormData[]) => {
  return await instance.post("/file/upload", { multiFile: formData });
};
