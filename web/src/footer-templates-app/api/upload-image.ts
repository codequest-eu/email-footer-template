import { AxiosInstance, AxiosResponse } from "axios";

export const uploadImage = (client: AxiosInstance) => (avatar: string) => {
  return client.post<{ avatar: string }, AxiosResponse<{ imageUrl: string }>>(
    "upload-image",
    {
      avatar,
      mime: "image/png"
    }
  );
};
