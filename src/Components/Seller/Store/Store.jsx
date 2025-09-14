import { Box, Button, Divider, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Masonry from "@mui/lab/Masonry";
import { useProducts } from "../../../Hooks/useProducts";
import Card from "../../Ui/Card/Card";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate, useParams } from "react-router-dom";
import useUserData from "../../../Hooks/useUserData";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { ShareButton } from "../../Ui/ShareButton/ShareButton";

export default function Store() {
  const { id } = useParams();

  const {
    user: { data: person, isLoading, isFetching },
    addFollower,
    removeFollower,
  } = useUserData(id);
  const {
    currentUser: { data: currentUser },
  } = useCurrentUser();
  const navigate = useNavigate();

  let icons = {
    facebook: <FacebookIcon />,
    instagram: <InstagramIcon />,
    twitter: <TwitterIcon />,
    linkedIn: <LinkedInIcon />,
  };

  function handleFollowing() {
    if (!currentUser) return navigate("/sign-in");
    let user = person?.followers.find((o) => o?.userId === currentUser?.id);

    if (!user) return addFollower.mutateAsync({ id: person?.id }).then((res) => console.log(res));
    removeFollower.mutateAsync({ id: user?.id }).then((res) => console.log(res));
  }

  return (
    <>
      <Grid container px={4} py={2} spacing={8}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "30% 1fr",
              gap: 4,
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: 180,
                height: 180,
                objectFit: "contain",
                borderRadius: "50%",
              }}
              src={person?.photo}
              alt=""
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Typography variant="heading" fontSize={26}>
                  {person?.displayName}
                </Typography>
                {person?.id !== currentUser?.id && (
                  <Button
                    disabled={isLoading || isFetching || addFollower.isLoading || removeFollower.isLoading}
                    onClick={handleFollowing}
                    sx={{ textTransform: "unset", justifySelf: "right", px: 4 }}
                    variant="contained"
                    size="small"
                  >
                    {person?.isFollowedByCurrentUser ? "Unfollow" : "Follow"}
                  </Button>
                )}
                <ShareButton />
              </Box>
              <Box display="flex" gap={2}>
                <Box display="flex" gap={2}>
                  <Typography variant="h10" fontWeight={600}>
                    {person?.product?.length}
                  </Typography>
                  <Typography variant="h10">Artworks</Typography>
                </Box>
                -
                <Box display="flex" gap={2}>
                  <Typography variant="h10" fontWeight={600}>
                    {person?.followers?.length}
                  </Typography>
                  <Typography variant="h10">Followers</Typography>
                </Box>
              </Box>
              {!!person?.social?.length && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: 'center',
                    gap: 2,
                    ml: -1,
                  }}
                >
                  {Object.values(person?.social || {}).map(({ name, url }) => (
                    <IconButton onClick={() => window.open(url, "_blank")} key={name} color={name}>
                      {icons[name]}
                    </IconButton>
                  ))}
                </Box>
              )}
              <Typography sx={{ gridColumn: "span 2" }} mt={1} variant="paragraph">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, tempore sunt fuga vel facere
                aspernatur quis animi quasi exercitationem dolorem nulla architecto dicta excepturi earum ex sapiente
                vero, illum soluta laboriosam quisquam suscipit voluptates distinctio. Repellendus aliquam.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
            <>
              {person?.product?.map((o) => (
                <Card sx={{ width: "100%", borderRadius: 10 }} key={o.id} product={o} />
              ))}
            </>
          </Masonry>
        </Grid>
      </Grid>
    </>
  );
}
