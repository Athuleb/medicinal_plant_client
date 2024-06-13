import React from "react";
import * as Mui from "@mui/material";
import { useForm } from "react-hook-form";
import { saveDetails, update_details } from "./services";
import { getDetails } from "../leafList/services";
// -------------- icons ------------
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ImageIcon from "@mui/icons-material/Image";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { useParams } from "react-router-dom";
function LeafDetailsEdit() {
  const { id } = useParams();
  const [name, setName] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageValue, setImageValue] = React.useState(null);
  const [checkImage, setCheckImaage] = React.useState(false);
  const [uploadStatus, setUploadStatus] = React.useState({
    open: false,
    status: "",
    message: "",
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageValue(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        setCheckImaage(false);
        setSelectedImage(readerEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  function sendData(formData) {
    saveDetails(formData).then((result) => {
      const data = {
        open: true,
        ...result,
      };
      reset({
        leafnNme: "",
        medicinalUse: "",
        description: "",
      });
      setUploadStatus(data);
      setImageValue(null);
    });
  }
  function onSubmit(value) {
    console.log(value.description.replace(/'/g, "\\'"));
    if (id == "all") {
      if (imageValue != null) {
        const formData = new FormData();
        formData.append("leafName", value.leafnNme);
        const description = JSON.stringify({
          medicinalUse: value.medicinalUse.replace(/'/g, ' '),
          description: value.description.replace(/'/g, ' '),
        })
        formData.append("description", description);
        formData.append("image", imageValue);
        sendData(formData);
        setCheckImaage(false);
      } else {
        setCheckImaage(true);
      }
    } else {
      const formData = new FormData();
      formData.append("leafName", value.leafnNme);
      const description = JSON.stringify({
        medicinalUse: value.medicinalUse.replace(/'/g, ' '),
        description: value.description.replace(/'/g, ' '),
      });
      formData.append("description", description);
      formData.append("image", imageValue);
      formData.append("id", id);
      update_details(formData).then((result) => {
        const data = {
          open: true,
          ...result,
        };
        setUploadStatus(data);
        setImageValue(null);
      });
    }
  }
  function handleCloseSnackbar() {
    getDetails(id).then((data) => {
      const details = data?.details[0];
      const descritpion = JSON.parse(details?.leafDescription);
      // console.log(descritpion);
      setName(details.leafname.toUpperCase());
      reset({
        leafnNme: details.leafname,
        medicinalUse: descritpion?.medicinalUse,
        description: descritpion?.description,
      });

      setSelectedImage(`http://127.0.0.1:8000/${details.leafImage}`);
    });
    setUploadStatus({ ...uploadStatus, open: false });
    location.reload();
  }
  React.useState(() => {
    if (id == "all") {
      reset({
        leafnNme: "",
        medicinalUse: "",
        description: "",
      });
      setSelectedImage(null);
    } else {
      getDetails(id).then((data) => {
        const details = data?.details[0];
        const descritpion = JSON.parse(details?.leafDescription);
        // console.log(descritpion);
        setName(details.leafname.toUpperCase());
        reset({
          leafnNme: details.leafname,
          medicinalUse: descritpion?.medicinalUse,
          description: descritpion?.description,
        });

        setSelectedImage(`http://127.0.0.1:8000/${details.leafImage}`);
      });
    }
  }, [id]);
  return (
    <div className="mt-16 grid grid-cols-5">
      <div></div>
      <div className="pt-3 col-span-3 flex flex-col justify-center gap-6">
        <Mui.Typography
          variant="h5"
          sx={{ fontWeight: "600" }}
          className="text-center border-b-2 pb-3"
        >
          {id == "all" ? "Add new leaf details" : "Edit - " + name}
        </Mui.Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3"
        >
          <Mui.Avatar
            src={selectedImage}
            variant="rounded"
            sx={{ width: "100%", height: 355, objectFit: "cover" }}
          >
            {" "}
            <ImageIcon sx={{ width: "70%", height: "70%" }} />{" "}
          </Mui.Avatar>
          <div className="flex flex-col gap-5">
            <Mui.TextField
              {...register("leafnNme", { required: "Please enter leaf name" })}
              error={errors.leafnNme}
              helperText={errors.leafnNme?.message}
              label="Leaf name"
              InputLabelProps={id !== "all" ? { shrink: true } : {}}
            />
            <Mui.TextField
              {...register("medicinalUse", {
                required: "Please enter medicinal uses",
              })}
              error={errors.medicinalUse}
              helperText={errors.medicinalUse?.message}
              label="Medicinal uses"
              multiline
              rows={2}
              InputLabelProps={id !== "all" ? { shrink: true } : {}}
            />
            <Mui.TextField
              {...register("description", {
                required: "Please enter descripion",
              })}
              error={errors.description}
              helperText={errors.description?.message}
              name="description"
              label="Descripion"
              multiline
              rows={4}
              InputLabelProps={id !== "all" ? { shrink: true } : {}}
            />
            <input
              {...register("leafImage")}
              onChange={handleImageChange}
              id="leafImg"
              className="hidden"
              type="file"
              accept=".jpg, .jpeg, .png, .webp, .avif"
            />
            {checkImage && id == "all" && (
              <Mui.FormHelperText color="error">
                Please select a image
              </Mui.FormHelperText>
            )}
            <Mui.Button
              htmlFor="leafImg"
              component="label"
              variant="outlined"
              color="secondary"
              endIcon={<DriveFolderUploadIcon />}
            >
              Upload Leaf Image
            </Mui.Button>
          </div>
          <div className="col-span-2 flex flex-row justify-center flex-wrap gap-3">
            <Mui.Button
              type="reset"
              sx={{ width: "10vw" }}
              variant="contained"
              color="error"
              endIcon={<ClearIcon />}
            >
              cancel
            </Mui.Button>

            <Mui.Button
              sx={{ width: "10vw" }}
              type="submit"
              variant="contained"
              color="success"
              endIcon={<SaveIcon />}
            >
              {id == "all" ? "Save" : "update"}
            </Mui.Button>
          </div>
        </form>
      </div>
      <div></div>
      <Mui.Snackbar
        autoHideDuration={1500}
        TransitionComponent={Mui.Slide}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={handleCloseSnackbar}
        open={uploadStatus.open}
      >
        <Mui.Alert
          onClose={() => {
            setUploadStatus({ ...uploadStatus, open: false });
          }}
          severity={uploadStatus.status}
          sx={{ width: "30vw" }}
        >
          {uploadStatus.message}
        </Mui.Alert>
      </Mui.Snackbar>
    </div>
  );
}

export default LeafDetailsEdit;

