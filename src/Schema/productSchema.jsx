import * as yup from "yup";

export const productValidation = yup.object({
  name: yup.string().required("This field is required."),
  desc: yup.string().required("This field is required."),
  quantity: yup.number().required("This field is required."),
  price: yup.number().required("This field is required."),
  discount: yup.number().max(100),
  images: yup.array().of(yup.mixed()).min(1).max(5),
  category_id: yup.number(),
  collections_id: yup.number(),
  subject_id: yup.number(),
  style_id: yup.number(),
  material_id: yup.number(),
  widthInInches: yup.string().required("This field is required."),
  heightInInches: yup.string().required("This field is required."),
  sellingOption: yup.string().required("This field is required."),
});

export const productUpdateValidation = yup.object({
  name: yup.string(),
  material_id: yup.number(),
  desc: yup.string(),
  price: yup.number(),
  discount: yup.number().max(100),
  quantity: yup.number(),
  size: yup.array().of(yup.string()).min(1),
  width: yup.string(),
  height: yup.string(),
  images: yup.array().of(yup.mixed()).min(1).max(5),
});
