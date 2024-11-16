// Client/src/components/validationSchema.ts
import * as yup from "yup";
import { Diets } from "../../api/axios-client";

export const GuestDetailSchema = yup.object().shape({
  attending: yup.boolean(),
  first_name: yup.string(),
  last_name: yup.string(),
  preferred_name: yup.string(),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .when("attending", {
      is: true,
      then: (schema) => schema.required("Please enter your email."),
    }),
  phone: yup.string().when("attending", {
    is: true,
    then: (schema) =>
      schema
        .required("Please enter your phone number.")
        .matches(
          /^(\+?1[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{4}$/,
          "Please enter a valid phone number."
        ),
  }),
  address: yup.string().when("attending", {
    is: true,
    then: (schema) => schema.required("Please enter your address."),
  }),
  city: yup.string().when("attending", {
    is: true,
    then: (schema) => schema.required("Please enter your city."),
  }),
  province: yup.string().when("attending", {
    is: true,
    then: (schema) => schema.required("Please Select a province."),
  }),
  area_code: yup.string().when("attending", {
    is: true,
    then: (schema) => schema.required("Please enter your Postal code."),
  }),
  country: yup.string().when("attending", {
    is: true,
    then: (schema) => schema.required("Please enter your country."),
  }),
  additional_notes: yup.string(),
  dietary_restrictions: yup.array().of(
    yup.object().shape({
      value: yup
        .string()
        .oneOf(
          Object.values(Diets),
          "Please enter a valid dietary restriction."
        )
        .required("Please enter a dietary restriction."),
    })
  ),
  has_plus_one: yup.boolean(),
  plus_one: yup.object().shape({
    first_name: yup.string().when("has_plus_one", {
      is: true,
      then: (schema) => schema.required("Please enter your plus one's name."),
    }),
    last_name: yup.string().when("has_plus_one", {
      is: true,
      then: (schema) => schema.required("Please enter your plus one's name."),
    }),
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .when("has_plus_one", {
        is: true,
        then: (schema) =>
          schema.required("Please enter your plus one's email."),
      }),
    dietary_restrictions: yup.array().of(
      yup.object().shape({
        value: yup
          .string()
          .oneOf(
            Object.values(Diets),
            "Please enter a valid dietary restriction."
          )
          .required("Please enter a dietary restriction."),
      })
    ),
    additional_notes: yup.string(),
  }),
});
