import React from "react";
import { Box, Typography, CardContent, CardHeader, Button, Grid, Link, Divider, Stack } from "@mui/material";
import { keyframes } from "@mui/system";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UploadIcon from "@mui/icons-material/Upload";
import StoreIcon from "@mui/icons-material/Store";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PaletteIcon from "@mui/icons-material/Palette";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Card from "../../Ui/Card";
import { ChartLine, CircleCheckBig, FileUp, Store } from "lucide-react";
import { green } from "@mui/material/colors";
import Title from "../../Ui/Title";
import { gap } from "../../../const";
import { useNavigate } from "react-router-dom";

const SellerOnboardingSuccess = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: gap,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative floating bubbles */}
      <Box
        sx={{
          position: "absolute",
          top: 100,
          left: 100,
          width: 100,
          height: 100,
          bgcolor: "primary.main",
          opacity: 0.1,
          borderRadius: "50%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 120,
          right: 120,
          width: 140,
          height: 140,
          bgcolor: "secondary.main",
          opacity: 0.1,
          borderRadius: "50%",
        }}
      />

      <Box sx={{ width: "100%", maxWidth: "1200px", textAlign: "center", zIndex: 2 }}>
        {/* Header Section */}
        <Box mb={8}>
          <CircleCheckBig size={64} color={green[500]} />
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mt: 2 }}>
            Welcome Aboard!
          </Typography>
          <Typography sx={{ maxWidth: "600px", mx: "auto" }}>
            Your seller account is now active. Join thousands of artists already earning from their passion.
          </Typography>
        </Box>

        {/* Main Grid */}
        <Grid container spacing={4} mb={6}>
          {/* Left Card - Quick Start */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title={
                  <Stack textAlign="start" spacing={1}>
                    <Title>Quick Start Guide</Title>
                    <Typography>Get your art business up and running in minutes</Typography>
                  </Stack>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  {[
                    {
                      icon: <ChartLine color="var(--brand)" />,
                      title: "Explore Your Dashboard",
                      desc: "Discover powerful tools to manage and grow your art business",
                      onClick: () => navigate("/dashboard", { state: { initialTab: 0 }, replace: true }),
                    },
                    {
                      icon: <FileUp color="var(--brand)" />,
                      title: "Upload Your First Masterpiece",
                      desc: "Show the world your talent with high-quality artwork uploads",
                      onClick: () => navigate("/dashboard", { state: { initialTab: 1 }, replace: true }),
                    },
                  ].map((step, i) => (
                    <Grid item xs={12} key={i}>
                      <Card>
                        <CardContent>
                          <Box
                            key={i}
                            onClick={step.onClick}
                            display="flex"
                            alignItems="center"
                            sx={{
                              borderRadius: 2,
                              transition: "all 0.3s",
                              "&:hover": {
                                bgcolor: "action.hover",
                                transform: "scale(1.02)",
                                cursor: "pointer",
                              },
                            }}
                          >
                            <Box mr={2}>{step.icon}</Box>
                            <Box flex={1} display="grid" gap={1} textAlign="left">
                              <Typography variant="subtitle1" fontWeight="bold">
                                {step.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {step.desc}
                              </Typography>
                            </Box>
                            <ArrowRightAltIcon color="action" />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Right - Metrics */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title={
                  <Stack textAlign="start" spacing={1}>
                    <Title>Premium Seller Benefits</Title>
                    <Typography>Unlock exclusive features for your success</Typography>
                  </Stack>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  {[
                    { value: "0%", label: "Setup Fees" },
                    { value: "24/7", label: "Support" },
                    { value: "85%", label: "You Keep" },
                    { value: "∞", label: "Uploads" },
                  ].map((stat, i) => (
                    <Grid item xs={6} key={i}>
                      <Card>
                        <CardContent>
                          <Stack textAlign="start" spacing={1}>
                            <Typography variant="h5" color="primary" fontWeight="bold">
                              {stat.value}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {stat.label}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Footer Links */}
        <Box>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Need guidance? Our{" "}
            <Link href="#" underline="hover" color="primary">
              Artist Success Team
            </Link>{" "}
            is here to help you thrive.
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Link href="#" underline="hover" color="inherit">
              Knowledge Base
            </Link>
            <Divider orientation="vertical" flexItem />
            <Link href="#" underline="hover" color="inherit">
              Video Tutorials
            </Link>
            <Divider orientation="vertical" flexItem />
            <Link href="#" underline="hover" color="inherit">
              Community Forum
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SellerOnboardingSuccess;
