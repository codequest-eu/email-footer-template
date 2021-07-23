import { createApiClient } from "./api-client";
import { uploadImage } from "./upload-image";

const lambdaApiInstance = createApiClient({
  baseURL: process.env.REACT_APP_API_URL
});

export const createLambdaClient = () => {
  return { uploadImage: uploadImage(lambdaApiInstance) };
};

export type LambdaClient = ReturnType<typeof createLambdaClient>;
