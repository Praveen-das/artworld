import { Avatar, Box, Button, Divider, Grid, IconButton, Pagination, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Masonry from "react-masonry-css";
import { useAdmin, useProducts } from "../../../Hooks/useProducts";
import Card from "../../Ui/Card/Card";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate, useParams } from "react-router-dom";
import useUserData from "../../../Hooks/useUserData";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { ShareButton } from "../../Ui/ShareButton/ShareButton";
import { useFilter } from "../../Layouts/Sidebar/useFilter";

export default function Store() {
  const { id } = useParams();
  const { searchParams, setPage } = useFilter();

  const {
    user: { data: person, isLoading, isFetching },
    addFollower,
    removeFollower,
  } = useUserData(id);
  const currentUser = useCurrentUser().currentUser.data;
  const {
    products: { data },
  } = useAdmin(person?.id, searchParams.toString());
  const navigate = useNavigate();
  const theme = useTheme();

  const productList = data?.products || [];
  const total = data?.total || 0;

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

  const handlePagination = (_, value) => {
    setPage(value);
  };

  return (
    <>
      <Grid container px={4} py={2} spacing={8}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { sm: "40% 1fr",md: "30% 1fr" },
              gap: 4,
              justifyItems: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: { xs: 100, sm: 150, md: 180 },
                height: { xs: 100, sm: 150, md: 180 },
              }}
              src={person?.photo}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "unset" },
                gap: 2,
                mr: "auto",
              }}
            >
              <Typography variant="h5">{person?.displayName}</Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Box display="flex" gap={2}>
                  <Typography variant="h10" fontWeight={600}>
                    {total}
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
              {person?.bio && (
                <Typography sx={{ gridColumn: "span 2" }} mt={1} variant="paragraph">
                  {person?.bio}
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
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
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
            <Box
              sx={{ "& .my-masonry-grid_column": { pl: 4 } }}
              component={Masonry}
              breakpointCols={{
                default: 3,
                [theme.breakpoints.values.sm]: 2,
              }}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {productList.map((o, i) => (
                <Box sx={{ width: "100%", mb: 4 }} key={o?.id}>
                  <Card product={o} />
                </Box>
                // <Box component="img" width={300} sx={{ width: "100%" }} src={o.images[0]?.url} key={o.id} />
              ))}
            </Box>

            <Box display="flex" mt="auto !important">
              {total > 10 && (
                <Pagination
                  page={Number(searchParams.get("p") || 1)}
                  color="primary"
                  sx={{ mt: "auto", mx: "auto" }}
                  onChange={handlePagination}
                  count={Math.ceil(total / 10)}
                />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
