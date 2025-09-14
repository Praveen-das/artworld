import * as yup from "yup";
import "yup-phone";

yup.addMethod(yup.string, "stripEmptyString", function () {
  return this.transform((value) => (value === "" ? undefined : value));
});

export const personalInfoSchema = yup.object({
  displayName: yup
    .string()
    .min(5, "displayName should be in between 5 to 20 characters in length")
    .max(20, "displayName should be in between 5 to 20 characters in length"),
  email: yup.string("Enter your email").email("Enter a valid email"),
  phoneNumber: yup.string().max(10),
  bio: yup.string().max(60, "Bio must be less than 60 characters"),
});

export const displayNameSchema = yup.object({
  displayName: yup
    .string()
    .min(5, "displayName should be in between 5 to 20 characters in length")
    .max(20, "displayName should be in between 5 to 20 characters in length"),
});

export const emailSchema = yup.object({ email: yup.string("Enter your email").email("Enter a valid email") });

export const bioSchema = yup.object({ bio: yup.string().max(60, "Bio must be less than 60 characters") });

export const newPasswordSchema = yup.object({
  old_password: yup.string("Enter your old password").required("This field is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be a minimum of 8 characters in length")
    .required("This field is required"),
  c_password: yup
    .string("Confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords doesn't match")
    .required("This field is required"),
});

export const passwordResetSchema = yup.object({
  password: yup
    .string("Enter your password")
    .min(8, "Password should be a minimum of 8 characters in length")
    .required("This field is required"),
  c_password: yup
    .string("Confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords doesn't match")
    .required("This field is required"),
});

export const socialSchema = yup.object({
  social: yup.array().of(
    yup.object({
      name: yup.string(),
      url: yup.string().url("Enter a valid URL"),
    })
  ),
});

export const userAddressSchema = yup.object({
  name: yup.string().required("Enter your name"),
  address: yup.string().required("Enter your address"),
  city: yup.string().required("Select your city"),
  state: yup.string().required("Select your state"),
  pincode: yup.string().max(6).required("Enter your pincode"),
  mobile: yup.string().max(10, "Phone Number must be at most 10 characters.").required("Enter your phone number"),
});

export const userAddressUpdateSchema = yup.object({
  name: yup.string(),
  address: yup.string(),
  city: yup.string(),
  state: yup.string(),
  pincode: yup.string().max(6),
  mobile: yup.string().max(10, "Phone Number must be at most 10 characters."),
});

export const userDetailSchema = yup.object({
  name: yup.string().required("This filed is required"),
  email: yup.string().email().required("Enter a valid email"),
  phone: yup.string().phone().required("Enter a valid phone number"),
  street1: yup.string().required(),
  street2: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  postal_code: yup.string().max(6).required(),
  country: yup.string().default("IN").required(),
});

export const accountDetailsSchema = yup.object({
  pan: yup
    .string()
    .matches(/^[a-zA-z]{5}\d{4}[a-zA-Z]{1}$/, "Invalid PAN Card number")
    .required("Enter your PAN Card number"),
  account_number: yup.string().required("Enter your bank account number"),
  ifsc_code: yup
    .string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
    .required("Enter your IFSC code"),
  beneficiary_name: yup.string().required("This filed is required"),
  tnc_accepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});
