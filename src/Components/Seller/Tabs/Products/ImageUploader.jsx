import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import ImageKit from "imagekit-javascript";
import { useCallback, useEffect, useId, useState } from "react";
import { useDropzone } from "react-dropzone";
import { TransitionGroup } from "react-transition-group";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import DeleteIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/BorderColor";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteIcon from "@mui/icons-material/FavoriteRounded";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import { deleteImage } from "../../../../Services/product.api";
import Editor from "../../../ImageEditor/Editor";
import { ImagePlus } from "lucide-react";

export function ImageUploader({ handlers: { remove, replace, form } }) {
  const [model, setModel] = useState(null);
  const images = form.values.images;

  let fieldError = form.touched.images && form.errors?.images;

  useEffect(() => {
    if (!!images?.length && images?.length >= 2 && form.errors.images) form.validateField("images");
  }, [images,form.errors.images]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles = acceptedFiles.map((file) => {
        let tempId = crypto.randomUUID();
        return {
          url: URL.createObjectURL(file),
          name: file.name,
          uid: tempId,
          size: file.size,
          fileType: file.type,
        };
      });

      let totalFiles = acceptedFiles.length + images?.length;
      let data;
      if (totalFiles > 5) {
        let remaining = 5 - images?.length;
        data = [...images, ...acceptedFiles.slice(0, remaining)];
      } else {
        data = [...images, ...acceptedFiles];
      }
      form.setFieldValue("images", data);
    },
    [images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/webp": [".webp"],
    },
  });

  function handleEdit(file, index) {
    setModel({ file, index });
  }

  function updateImages(file, index) {
    replace(index, file);
    setModel(null);
  }

  const reorder = useCallback((list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }, []);

  const handleReorder = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      const data = reorder(images, result.source.index, result.destination.index);

      form.setFieldValue("images", data);
    },
    [images]
  );

  function handleDelete({ fileId }, index) {
    if (fileId) {
      let pre = form.values.deletedImages || [];
      form.setFieldValue("deletedImages", [...pre, fileId]);
      remove(index);
    } else {
      remove(index);
    }
  }

  return (
    <>
      {model && (
        <Editor
          open={Boolean(model)}
          file={model?.file}
          onSuccess={(e) => updateImages(e, model.index)}
          onClose={() => setModel(null)}
        />
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            {...getRootProps({
              name: "images",
              color: fieldError ? "error" : "primary",
              autoCapitalize: "",
              sx: ({ palette }) => ({
                width: "100%",
                height: 245,
                border: `2px dashed ${fieldError ? palette.error.main : "hsl(253deg 100% 81.16%)"}`,
                borderRadius: 2,
                textTransform: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }),
              // onBlur: form.handleBlur,
            })}
          >
            {fieldError ? (
              <div>
                <ErrorOutlineIcon fontSize="large" />
                <Typography>{fieldError}</Typography>
              </div>
            ) : (
              <Box
                sx={{
                  display: isDragActive ? "flex" : "grid",
                  alignItems: "center",
                  justifyItems: "center",
                  gap: 2,
                }}
              >
                <input {...getInputProps()} />
                <ImagePlus size={50} />
                {isDragActive ? (
                  "Drop the files here ..."
                ) : (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <FileUploadOutlinedIcon />
                    Drop your images here, or Browse
                  </Box>
                )}
              </Box>
            )}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Box>
            {!images?.length && (
              <Typography
                color="var(--brand)"
                sx={{ mt: 2, bgcolor: "var(--brandLight50)", p: 2, borderRadius: 4 }}
                variant="subtitle2"
              >
                Add 2 to 5 images with a file size of not more than 2MB.You can also drag and drop your images to
                rearrange them.
              </Typography>
            )}

            <DragDropContext onDragEnd={handleReorder}>
              <Droppable mode="" droppableId="droppable-1">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <List>
                      {/* <TransitionGroup> */}
                      {images?.map((file, index) => {
                        return (
                          file && (
                            <Draggable
                              key={file.uid || file.fileId}
                              draggableId={file.uid || file.fileId}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{
                                    ...provided.draggableProps.style,
                                    boxShadow: "0 1px 5px #b7cff9",
                                    borderRadius: 1,
                                    bgcolor: "white",
                                    mt: 0.5,
                                  }}
                                >
                                  <ListItem
                                    secondaryAction={
                                      <Box display="flex" alignItems="center" gap={0.5}>
                                        <IconButton
                                          edge="end"
                                          aria-label="delete"
                                          title="Delete"
                                          size="small"
                                          onClick={() => handleEdit(file, index)}
                                        >
                                          <EditIcon sx={{ fontSize: 15 }} />
                                        </IconButton>
                                        <IconButton
                                          edge="end"
                                          aria-label="delete"
                                          title="Delete"
                                          size="small"
                                          onClick={() => handleDelete(file, index)}
                                        >
                                          <DeleteIcon sx={{ fontSize: 16 }} />
                                        </IconButton>
                                      </Box>
                                    }
                                    sx={{
                                      ".MuiListItemSecondaryAction-root": {
                                        right: 10,
                                      },
                                      display: "flex",
                                      gap: 1,
                                      width: "100%",
                                      pr: 8,
                                      pl: 1,
                                    }}
                                  >
                                    <img style={{ borderRadius: "5px" }} width={40} height={40} src={file.url} alt="" />
                                    <Typography noWrap maxWidth={"200px"} width="100%">
                                      {file.name}
                                    </Typography>
                                  </ListItem>
                                </Box>
                              )}
                            </Draggable>
                          )
                        );
                      })}
                      {/* </TransitionGroup> */}
                      {provided.placeholder}
                    </List>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
