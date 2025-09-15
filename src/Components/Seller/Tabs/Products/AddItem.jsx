import { useState } from "react";
import { deleteImage } from "../../../../Services/product.api";
import { useAdmin } from "../../../../Hooks/useProducts";
import { Alert, Box, Button, Grid, LinearProgress, MenuItem, Snackbar, Typography } from "@mui/material";
import TextField from "../../../Ui/TextField";
import { FastField, Field, FieldArray, Form, Formik } from "formik";
import { productUpdateValidation, productValidation } from "../../../../Schema/productSchema";
import { ImageUploader } from "./ImageUploader";
import { findChangedValues } from "../../../../Utils/utils";
import useFacets from "../../../../Hooks/useFacets";
import LoadingScreen from "../../../Ui/LoadingScreen";
import { toast } from "react-toastify";
import Card from "../../../Ui/Card";
import useCurrentUser from "../../../../Hooks/useCurrentUser";
import Modal from "../../../Ui/Modal";
import { uploadImages } from "../../../../lib/ImageKit";

export function AddItem({ onClose, previousData }) {
  const user = useCurrentUser().currentUser.data;
  const [progress, setProgress] = useState(0);
  const { addProduct, updateProduct } = useAdmin(user?.id);

  const {
    facets: { data, isLoading },
  } = useFacets();

  const categories = data?.allCategories || [];
  const subject = data?.allSubjects || [];
  const style = data?.allStyles || [];
  const materials = data?.allMaterials || [];
  const collections = data?.collections || [];

  async function updateProductInfo({ previousData, productData }, setSubmitting, resetForm) {
    const toastId = setPublishing();

    let updates = findChangedValues(previousData, productData);

    if (!Object.values(updates).length) {
      setSubmitting(false);
      return;
    }

    async function handleUpdates(updates) {
      await updateProduct
        .mutateAsync({ id: previousData.id, updates })
        .then((res) => {
          setSuccessToast(toastId);
          resetForm({
            values: {
              ...productData,
              ...updates,
            },
          });
        })
        .catch((err) => {
          console.log(err);
          setErrorToast(toastId);
        })
        .finally(() => {
          setProgress(0);
          setSubmitting(false);
        });
    }

    if ("deletedImages" in productData) {
      try {
        const res = await deleteImage(productData.deletedImages);
      } catch (error) {
        console.log(error);
      }
    }

    if (!updates.images) return handleUpdates(updates);

    uploadImages(updates.images, (progress) => toast.update(toastId, { progress }))
      .then(async (res) => {
        if (!!res.data.length) {
          let data = { ...updates, images: [...res.previousData, ...res.data] };
          await handleUpdates(data);
        } else {
          toast.dismiss(toastId);
        }
        if (!!res.error.length) {
          setFailedUploadsToast(res.error);
        }
      })
      .catch((err) => {
        setErrorToast(toastId);
        console.log(err);
      })
      .finally(() => {
        setProgress(0);
        setSubmitting(false);
      });

    return;
  }

  function publishProduct(product, setSubmitting, resetForm) {
    const toastId = setPublishing(progress);
    console.log(product);
    uploadImages(product.images)
      .then((res) => {
        if (!!res.data.length) {
          let data = { ...product, sales_person_id: user.id, images: [...res.previousData, ...res.data] };
          addProduct
            .mutateAsync(data)
            .then(() => {
              setSuccessToast(toastId);
              resetForm();
            })
            .catch((err) => {
              setErrorToast(toastId);
            })
            .finally(() => {
              setProgress(0);
              setSubmitting(false);
            });
        } else {
          toast.dismiss(toastId);
        }
        if (!!res.error.length) {
          setFailedUploadsToast(res.error);
        }
      })
      .catch((err) => {
        setErrorToast(toastId);
        console.log(err);
      });
  }

  function handleSubmit(productData, { setSubmitting, resetForm }) {
    if (productData.collections_id === "") productData.collections_id = null;

    if (previousData) updateProductInfo({ previousData, productData }, setSubmitting, resetForm);
    else publishProduct(productData, setSubmitting, resetForm);
  }

  const initialValues = {
    name: "",
    desc: "",
    quantity: "",
    price: "",
    discount: 0,
    images: [],
    category_id: categories?.[0]?.id,
    collections_id: "",
    subject_id: subject?.[0]?.id,
    style_id: style?.[0]?.id,
    material_id: materials?.[0]?.id,
    widthInInches: "",
    heightInInches: "",
    sellingOption: "ORIGINAL",
  };

  if (isLoading) return <LoadingScreen />;
  return (
    <Formik
      initialValues={previousData ? previousData : initialValues}
      enableReinitialize
      validationSchema={previousData ? productUpdateValidation : productValidation}
      onSubmit={handleSubmit}
      validateOnChange={false}
    >
      {({ isSubmitting, resetForm }) => (
        <>
          <Form>
            <Grid container item sx={12} columnSpacing={6} rowSpacing={4}>
              <Grid item xs={12}>
                <Modal.Title title={previousData ? "Update" : "Add Artwork"} mainPage="Products" onClose={onClose} />
              </Grid>

              {/* -----------Images----------- */}
              <Grid container item xs={12} rowSpacing={4} height="fit-content">
                <Grid item xs={12}>
                  <Typography variant="title.primary">Upload Images</Typography>
                </Grid>

                <Grid item xs={12}>
                  <FieldArray name="images">
                    {({ remove, replace, form }) => (
                      <ImageUploader
                        mode={previousData ? "edit" : "add"}
                        handlers={{ progress, setProgress, form, remove, replace }}
                      />
                    )}
                  </FieldArray>
                </Grid>
              </Grid>

              {/* -----------Details----------- */}
              <Grid container item xs={12} rowSpacing={4} columnSpacing={3}>
                <Grid item xs={12}>
                  <Typography variant="title.primary">Artwork Details</Typography>
                </Grid>
                {/* -----------name----------- */}
                <Grid item xs={12}>
                  <FastField name="name">
                    {({ field, form }) => (
                      <TextField label="Artwork name" error={form.touched.name && form.errors.name} {...field} />
                    )}
                  </FastField>
                </Grid>
                {/* -----------Desc----------- */}
                <Grid item xs={12}>
                  <FastField name="desc">
                    {({ field, form }) => (
                      <TextField
                        label="Description"
                        rows={3}
                        multiline
                        error={form.touched.desc && form.errors.desc}
                        sx={{
                          ".MuiInputAdornment-root": {
                            mt: "auto",
                            translate: "0 -9px",
                            // alignItems: 'end'
                          },
                        }}
                        {...field}
                      />
                    )}
                  </FastField>
                </Grid>
                {/* -----------Category----------- */}
                <Grid item xs={6}>
                  <Field name="category_id">
                    {({ field }) => (
                      <TextField label="Category" select {...field}>
                        {categories?.map(({ id, name }) => (
                          <MenuItem key={name} value={id}>
                            {name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Field>
                </Grid>
                {/* -----------Subject----------- */}
                <Grid item xs={6}>
                  <Field name="subject_id">
                    {({ field }) => (
                      <TextField label="Subject" select {...field}>
                        {subject?.map(({ id, name }) => (
                          <MenuItem key={name} value={id}>
                            {name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Field>
                </Grid>
                {/* -----------style----------- */}
                <Grid item xs={6}>
                  <Field name="style_id">
                    {({ field }) => (
                      <TextField label="Style" select {...field}>
                        {style?.map(({ id, name }) => (
                          <MenuItem key={name} value={id}>
                            {name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Field>
                </Grid>
                {/* -----------material----------- */}
                <Grid item xs={6}>
                  <Field name="material_id">
                    {({ field }) => (
                      <TextField label="Material" select {...field}>
                        {materials?.map(({ id, name }) => (
                          <MenuItem key={name} value={id}>
                            {name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Field>
                </Grid>
                {/* -----------Size----------- */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      gap: 3,
                    }}
                  >
                    <Field name="widthInInches">
                      {({ field, form }) => (
                        <TextField
                          label="Size"
                          placeholder="width(in)"
                          type="number"
                          error={
                            (form.touched.width && form.errors.width) ||
                            (form.touched.size && typeof form.errors.size === "string" && form.errors.size)
                          }
                          {...field}
                        />
                      )}
                    </Field>
                    <Field name="heightInInches">
                      {({ field, form }) => (
                        <TextField
                          label=" "
                          placeholder="height(in)"
                          type="number"
                          error={
                            (form.touched.height && form.errors.height) ||
                            (form.touched.size && typeof form.errors.size === "string" && form.errors.size)
                          }
                          {...field}
                        />
                      )}
                    </Field>
                  </Box>
                </Grid>
                {/* -----------Price----------- */}
                <Grid item xs={6}>
                  <FastField name="price">
                    {({ field, form }) => (
                      <TextField
                        label="Price"
                        type="number"
                        error={form.touched.price && form.errors.price}
                        {...field}
                      />
                    )}
                  </FastField>
                </Grid>
                {/* -----------Discount----------- */}
                <Grid item xs={6}>
                  <FastField name="discount">
                    {({ field, form }) => (
                      <TextField
                        label="Discount"
                        type="number"
                        error={form.touched.discount && form.errors.discount && `${form.errors.discount}%`}
                        startAdornment={
                          <Typography fontWeight={600} sx={{ pr: 0.5 }}>
                            %
                          </Typography>
                        }
                        {...field}
                      />
                    )}
                  </FastField>
                </Grid>
                {/* -----------selling option----------- */}
                <Grid item xs={6}>
                  <Field name="sellingOption">
                    {({ field }) => (
                      <TextField label="Selling options" select {...field}>
                        <MenuItem value="ORIGINAL">Original</MenuItem>
                        <MenuItem value="PRINT">Print</MenuItem>
                      </TextField>
                    )}
                  </Field>
                </Grid>
                {/* -----------stock----------- */}
                <Grid item xs={6}>
                  <FastField name="quantity">
                    {({ field, form }) => (
                      <TextField
                        label="In Stock"
                        type="number"
                        error={form.touched.quantity && form.errors.quantity}
                        {...field}
                      />
                    )}
                  </FastField>
                </Grid>
                {/* -----------Add to collection----------- */}
                <Grid item xs={12}>
                  <Field name="collections_id">
                    {({ field }) => (
                      <TextField label="Add to collection" placeholder="Optional" select {...field}>
                        {collections?.map(({ id, name }) => (
                          <MenuItem key={name} value={id}>
                            {name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Box display={{ xs: "grid", sm: "flex" }} gap={2} pt={2} justifyContent={{ sm: "end" }}>
                    <Button
                      size="large"
                      onClick={() => {
                        resetForm();
                        onClose();
                      }}
                      sx={{ mr: 2, order: { xs: 2, sm: 1 } }}
                    >
                      close
                    </Button>
                    <Button
                      sx={{ order: { xs: 1, sm: 2 } }}
                      size="large"
                      // disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                    >
                      {isSubmitting ? "submitting" : "Publish"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </>
      )}
    </Formik>
  );
}

const toastOptions = {
  style: {
    padding: 0,
    minHeight: "unset",
  },
  autoClose: true,
  closeButton: false,
  hideProgressBar: true,
};

const alertStyle = {
  width: "100%",
  minHeight: 50,
  "& .MuiAlert-message": {
    width: "100%",
    display: "grid",
    alignItems: "center",
    gap: 1,
  },
  "& .MuiAlert-icon, .MuiAlert-action, .MuiAlert-error": {
    display: "grid",
    alignItems: "center",
    p: 0,
  },
};

function setPublishing() {
  return toast.loading(
    ({ toastProps }) => {
      let progress = ~~(toastProps.progress * 100);
      return (
        <Alert sx={alertStyle} color="info" icon={false} variant="filled">
          <Box display="flex" justifyContent="space-between">
            Publishing...
            <span>{progress}%</span>
          </Box>
          <Box width="100%" color="white">
            <LinearProgress
              color="inherit"
              variant={progress < 100 ? "determinate" : "indeterminate"}
              value={progress}
            />
          </Box>
        </Alert>
      );
    },
    {
      ...toastOptions,
      progress: 0,
      autoClose: false,
      isLoading: false,
      customProgressBar: true,
    }
  );
}

function setSuccessToast(id) {
  toast.dismiss(id);
  toast(
    ({ closeToast }) => (
      <Alert onClose={closeToast} variant="filled" severity="success" sx={alertStyle}>
        Published successfully
      </Alert>
    ),
    toastOptions
  );
}

function setErrorToast(id) {
  toast.dismiss(id);
  toast(
    ({ closeToast }) => (
      <Alert onClose={closeToast} variant="filled" severity="error" sx={alertStyle}>
        There's an error, please try again
      </Alert>
    ),
    toastOptions
  );
}

function setFailedUploadsToast(failedList = []) {
  failedList.forEach((reason) => {
    toast(
      ({ closeToast }) => (
        <Alert onClose={closeToast} variant="filled" severity="error" sx={{ ...alertStyle, height: "auto" }}>
          {reason}
        </Alert>
      ),
      toastOptions
    );
  });
}
