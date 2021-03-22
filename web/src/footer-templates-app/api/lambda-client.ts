import { createApiClient } from "./api-client";
import { uploadImage } from "./upload-image";

const lambdaApiInstance = createApiClient({
  baseURL: "https://ucj9mv5eyg.execute-api.eu-central-1.amazonaws.com/dev/"
});

export const createLambdaClient = () => {
  return { uploadImage: uploadImage(lambdaApiInstance) };
};

export type LambdaClient = ReturnType<typeof createLambdaClient>;
