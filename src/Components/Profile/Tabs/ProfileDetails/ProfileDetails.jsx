import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import "../../styles.css";

import { Box, Button, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

import useCurrentUser from "../../../../Hooks/useCurrentUser";
import useAuth from "../../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Avatar from "../../../Ui/Avatar/Avatar";
import { lazy, useRef, useState } from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditsModal from "../../../Ui/Modals/EditsModal";
import Card from "../../../Ui/Card";
import { Network, User, Mail, Phone, IdCard, SquarePen } from "lucide-react";
import { gap } from "../../../../const.js";
import { uploadImages } from "../../../../lib/ImageKit.js";

const Editor = lazy(() => import("../../../ImageEditor/Editor"));

const actionBtnStyle = {
  size: "small",
  variant: "contained",
};

function ProfileDetails() {
  const {
    currentUser: { data: user },
  } = useCurrentUser();
  const address = user?.address;
  const [open, setOpen] = useState(null);

  const { logout, handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <EditsModal open={open} onClose={setOpen} />

      <Grid container spacing={{ xs: 2, sm: 4 }}>
        <Grid container item xs={12} sm={8} spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5">My Profile</Typography>
          </Grid>

          <Grid container item xs={12} spacing={{ xs: 2, sm: 4 }}>
            <Grid item xs={12}>
              <Card sx={{ p: gap }}>
                <Box sx={{ display: "flex", gap: 4, alignItems: "center", whiteSpace: "nowrap" }}>
                  <ProfilePicture user={user} />
                  <Box display="grid" gap={0.5}>
                    <Typography whiteSpace="nowrap" variant="h5" fontSize={26} fontWeight={700} mb={0.5}>
                      {user?.displayName || "loading..."}
                    </Typography>
                    {user?.role === "seller" && (
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box display="flex" gap={2}>
                          <Typography variant="h10">Followers</Typography>
                          <Typography variant="h10" fontWeight={600}>
                            {user?.followers.length}
                          </Typography>
                        </Box>
                        |
                        <Box display="flex" gap={2}>
                          <Typography variant="h10">Following</Typography>
                          <Typography variant="h10" fontWeight={600}>
                            {user?.following.length}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ p: gap }}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="title.secondary">Personal Information</Typography>
                      <Button {...actionBtnStyle} onClick={() => setOpen("personalInfo")}>
                        Edit
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs={5}>
                    <InfoField label="Display Name">{user?.displayName}</InfoField>
                  </Grid>
                  <Grid item xs={5}>
                    <InfoField label="Phone Number">{address?.mobile}</InfoField>
                  </Grid>
                  <Grid item xs={5}>
                    <InfoField label="Email">{user?.email}</InfoField>
                  </Grid>
                  {user?.role === "seller" && user?.bio && (
                    <Grid item xs={10}>
                      <InfoField typeFieldProps={{ multiline: true, rows: 3 }} label="Bio">
                        {user?.bio}
                      </InfoField>
                    </Grid>
                  )}
                </Grid>
              </Card>
            </Grid>

            {address && (
              <Grid item xs={12}>
                <Card sx={{ p: gap }}>
                  <Grid container item xs={12} spacing={4}>
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="title.secondary">Address</Typography>
                        <Button {...actionBtnStyle} onClick={() => setOpen(address ? "address.update" : "address.add")}>
                          Edit
                        </Button>
                      </Box>
                    </Grid>

                    <Grid container item xs={12} spacing={4}>
                      <Grid item xs={5}>
                        <InfoField label="House Name/ Flat No">{address?.address}</InfoField>
                      </Grid>
                      <Grid item xs={5}>
                        <InfoField label="City">{address?.city}</InfoField>
                      </Grid>
                      <Grid item xs={5}>
                        <InfoField label="State">{address?.state}</InfoField>
                      </Grid>
                      <Grid item xs={5}>
                        <InfoField label="Pincode/Zipcode">{address?.pincode}</InfoField>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            )}

            {user?.role === "seller" && !!Object.values(user?.social).length && (
              <Grid item xs={12}>
                <Card sx={{ p: gap }}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="title.secondary">Social Media Links</Typography>
                        <Button {...actionBtnStyle} onClick={() => setOpen("socialMediaLinks")}>
                          Edit
                        </Button>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box display="flex" gap={1}>
                        {Object.values(user?.social || "").map(({ id, name, url }) => (
                          <IconButton
                            key={id}
                            onClick={() => window.open(url, "_blank")}
                            variant="contained"
                            size="small"
                            color={name}
                          >
                            {name === "facebook" ? (
                              <FacebookIcon />
                            ) : name === "instagram" ? (
                              <InstagramIcon />
                            ) : name === "twitter" ? (
                              <TwitterIcon />
                            ) : (
                              <LinkedInIcon />
                            )}
                          </IconButton>
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            )}

            {user?.role === "user" ? (
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    border: "2px solid var(--brandLight)",
                    borderRadius: "20px",
                    display: "grid",
                    justifyItems: "left",
                    p: 4,
                    boxSizing: "border-box",
                    gap: 1,
                  }}
                >
                  <Typography variant="title.secondary" display="flex" mb={1}>
                    Register as a seller
                  </Typography>
                  <Typography variant="h10">
                    Ready to grow your business? Register now to start selling on our platform. As a seller, you’ll gain
                    access to tools that help you list products, manage orders, track performance, and connect with
                    customers. It only takes a few minutes to get started—sign up today and take the first step toward
                    expanding your reach.
                  </Typography>
                  <Button
                    onClick={() => navigate("/seller/registration")}
                    variant="contained"
                    sx={{ px: 2, ml: "auto" }}
                  >
                    Register
                  </Button>
                </Box>
              </Grid>
            ) : (
              user?.role === "seller" &&
              user?.onboardingStatus === "pending" && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: "100%",
                      // height: 150,
                      // bgcolor: 'var(--brandLight)',
                      border: "2px solid var(--brandLight)",
                      borderRadius: "20px",
                      display: "grid",
                      justifyItems: "left",
                      p: 4,
                      boxSizing: "border-box",
                      gap: 1,
                    }}
                  >
                    <Typography variant="title.secondary" display="flex" mb={1}>
                      Complete Your Onboarding
                    </Typography>
                    <Typography variant="h10">
                      Please complete your onboarding by providing the necessary business details, setting up your
                      payment information. Once completed, we’ll review everything and get your store up and running in
                      no time.
                    </Typography>
                    <Button
                      onClick={() => navigate("/seller/onboarding")}
                      variant="contained"
                      sx={{ px: 2, ml: "auto" }}
                    >
                      Continue
                    </Button>
                  </Box>
                </Grid>
              )
            )}
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={4} rowSpacing={{ xs: 2, sm: 4 }} height="fit-content">
          <Grid item xs={12}>
            <Card sx={{ p: gap, display: "grid", gap: 2 }}>
              <Typography variant="title.secondary">Quick actions</Typography>

              <Box sx={{ display: "grid", gap: 1, mx: -2 }}>
                <QuickAction onClick={() => setOpen(address ? "address.update" : "address.add")} Icon={User}>
                  {address ? "Update Address" : "Add Address"}
                </QuickAction>
                <QuickAction Icon={Network} onClick={() => setOpen("socialMediaLinks")}>
                  Add Social Media Links
                </QuickAction>
                {user.provider === "web" && (
                  <QuickAction Icon={Mail} onClick={() => setOpen("updateEmail")}>
                    Change Email
                  </QuickAction>
                )}
                {user.role === "seller" && (
                  <QuickAction Icon={IdCard} onClick={() => setOpen("updateBio")}>
                    Update bio
                  </QuickAction>
                )}
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ p: gap, display: "grid", gap: 2 }}>
              <Typography variant="title.secondary">Contact Us</Typography>
              <Box sx={{ display: "grid", gap: 1 }}>
                <Contact Icon={Mail}>artworld@gmail.com</Contact>
                <Contact Icon={Phone}>+1-202-555-0125</Contact>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Card sx={{ p: gap }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ display: "block" }} variant="title.secondary">
                  Log out
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h10">Log out of your account.</Typography>
                  <LoadingButton loading={logout.isLoading} onClick={handleLogout} variant="contained" color="error">
                    Log out
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfileDetails;

function QuickAction({ children, Icon, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 2,
        py: 1.1,
        borderRadius: { sm: 2 },
        cursor: "pointer",
        transition: "0.25s ease",
        bgcolor: "transparent",
        "&:hover": {
          bgcolor: "var(--brandLight50)",
        },
      }}
    >
      <Icon color="var(--brand)" style={{ width: "1.2em", height: "1.2em" }} />
      <Typography variant="subtitle2">{children}</Typography>
    </Box>
  );
}

function Contact({ children, Icon, onClick }) {
  return (
    <Box onClick={onClick} sx={{ display: "flex", alignItems: "center", gap: 2, py: 0.5 }}>
      <Icon color="gray" size={18} />
      <Typography color="gray" variant="subtitle2">
        {children}
      </Typography>
    </Box>
  );
}

function InfoField({ label, children }) {
  let title = {
      sx: { transformOrigin: "left" },
      fontSize: 14,
      fontWeight: 300,
      color: "gray",
      width: "max-content",
    },
    box = {
      display: "grid",
      gap: 0.5,
    };

  return (
    <>
      <Box {...box}>
        <Typography {...title}>{label}</Typography>
        <Typography variant="h10">{children}</Typography>
      </Box>
    </>
  );
}

function ProfilePicture({ user }) {
  const { updateUser, currentUser } = useCurrentUser();

  const inputRef = useRef();
  const [model, setModel] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInput = (e) => {
    const file = e.target.files[0];
    let tempId = crypto.randomUUID();

    const img = {
      url: URL.createObjectURL(file),
      name: file.name,
      uid: tempId,
      size: file.size,
      fileType: file.type,
    };

    setModel(img);
  };

  async function handleUpdation(file) {
    setIsUploading(true);
    await uploadImages([file])
      .then((res) => {
        if (!res.error) throw new Error(res.error);
        updateUser.mutateAsync({ photo: res.data[0]?.url });
        setIsUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsUploading(false);
      });
    setModel(null);
  }

  return (
    <>
      {model && (
        <Editor
          options={{ aspectRatio: 1 }}
          open={Boolean(model)}
          file={model}
          onClose={() => setModel(null)}
          onSuccess={handleUpdation}
        />
      )}
      <Box position="relative" width="fit-content">
        <Avatar sx={{ width: 70, height: 70 }} displayName={user?.displayName} profilePicture={user?.photo} />
        <div className="imageUpdateBtn_wrapper">
          {isUploading ? (
            <CircularProgress sx={{ color: "white" }} size={25} value={100} />
          ) : (
            <button onClick={() => inputRef.current.click()} component="label" className="imageUpdateBtn">
              <CameraAltRoundedIcon fontSize="30px" color="secondary" />
              <input onChange={handleInput} ref={inputRef} hidden type="file" />
            </button>
          )}
        </div>
      </Box>
    </>
  );
}
