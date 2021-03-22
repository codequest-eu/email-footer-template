export interface TemplateFormValues {
  fullName: string;
  jobPosition: string;
  email: string;
  isPhoneEnabled: boolean;
  phoneNumber: string;
  image: {
    url: string;
    cropped: string;
    file: File | null;
  };
}
