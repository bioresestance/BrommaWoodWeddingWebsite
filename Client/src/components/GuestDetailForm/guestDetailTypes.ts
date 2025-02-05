import { Diets, GuestDetail } from "../../api/axios-client";
import { UseFormRegister, FieldErrors } from "react-hook-form";

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
  is_over_19?: boolean;
  has_plus_one?: boolean;
  plus_one?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    dietary_restrictions?: { value?: Diets }[];
    additional_notes?: string;
    is_over_19?: boolean;
  };
};

export interface FormErrors {
  [key: string]: { message?: string };
}

export type GuestContactProps = {
  register: UseFormRegister<GuestDetails>;
  errors: FieldErrors<GuestDetails>;
  labelClass: string;
  inputClass: string;
};
