export interface TemplateFormValues {
  fullName: string;
  jobPosition: string;
  email: string;
  isPhoneEnabled: boolean;
  phoneNumber: string;
  image: {
    url: string;
    file: File | null;
  };
}
