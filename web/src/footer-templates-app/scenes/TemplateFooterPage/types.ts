export interface TemplateFormValues {
  fullName: string;
  jobPosition: string;
  email: string;
  isPhoneEnabled: boolean;
  phoneNumber: string;
  isImageEnabled: boolean;
  uploadedImageUrl: string | null;
  previewImage: {
    url: string;
    cropped: string;
    file: File | null;
  };
}
