import { Diets, GuestDetail } from "../../api/axios-client";

export type GuestDetailFormProps = {
  details: GuestDetail | undefined;
};

export type GuestDetails = {
  attending?: boolean;
  first_name?: string;
  last_name?: string;
  preferred_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  area_code?: string;
  country?: string;
  additional_notes?: string;
  dietary_restrictions?: { value?: Diets }[];
};

export interface FormErrors {
  [key: string]: { message?: string };
}
