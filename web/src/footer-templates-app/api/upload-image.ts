import { AxiosInstance } from "axios";

export const uploadImage = (client: AxiosInstance) => (avatar: string) => {
  return client.post("upload-image", { data: { avatar } });
};
