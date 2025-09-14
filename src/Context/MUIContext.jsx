import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";

export function MUIContext({ children }) {
  var brand = getComputedStyle(document.body).getPropertyValue("--brand").replaceAll(/\s/g, "");
  var brandDark = getComputedStyle(document.body).getPropertyValue("--brandDark").replaceAll(/\s/g, "");
  var brandLight = getComputedStyle(document.body).getPropertyValue("--brandLight").replaceAll(/\s/g, "");

  const theme = createTheme({
    root: {
      marginTop: 0,
      height: 0,
    },
    typography: {
      allVariants: {
        color: "var(--brandMain)",
        fontFamily: "Nunito",
      },
      h3: {
        fontFamily: "var(--fontMain)",
      },
      h4: {
        fontFamily: "var(--fontMain)",
      },
      h5: {
        fontWeight: 700,
        fontFamily: "var(--fontMain)",
      },
      h6: {
        fontFamily: "var(--fontMain)",
      },
      h10: {
        fontSize: 15,
        lineHeight: 1.8,
        fontWeight: 400,
      },
      heading: {
        fontSize: 32,
        color: "var(--brandMain)",
        position: "relative",
        fontWeight: 800,
        textTransform: "capitalize",
      },
      heading2: {
        // fontFamily: 'var(--fontMain)',
        fontSize: 24,
        fontWeight: 600,
      },
      desc: {
        lineHeight: 2,
        fontSize: 18,
        fontWeight: 500,
      },

      "title.colored": { fontSize: 16, fontWeight: 700, color: "var(--brand)", fontFamily: "var(--fontMain) !important" },
      "title.primary": {
        fontSize: 18,
        fontWeight: 800,
        textTransform: "capitalize",
        fontFamily: "var(--fontMain)",
      },
      "title.secondary": {
        fontSize: 16,
        fontWeight: 600,
        textTransform: "capitalize",
      },
      "text.grey": {
        fontSize: 15,
        color: "GrayText",
        fontWeight: 400,
        textTransform: "capitalize",
      },
      "title.main": {
        fontSize: 18,
        textTransform: "uppercase",
      },
      paragraph: {
        fontSize: 16,
        variant: "subtitle2",
        lineHeight: 1.8,
        fontWeight: 500,
      },
      caption: {
        fontSize: 13,
      },
      caption1: {
        fontSize: 13,
        fontWeight: 500,
        color: "var(--brandDark)",
      },
      caption2: {
        fontSize: "0.9rem",
        fontWeight: 400,
        color: "grey",
      },
      // caption2: {
      //   fontSize: "0.9rem",
      //   fontWeight: 400,
      //   color: "grey",
      // },
      tabTitle: {
        fontSize: 24,
        fontWeight: 600,
      },
    },
    palette: {
      primary: {
        main: brand,
        dark: brandDark,
        light: brandLight,
        contrastText: "#fff",
      },
      secondary: {
        main: "#fff",
        dark: "#1a71e4",
        contrastText: brand,
      },
      facebook: {
        main: "hsl(220.65deg 44.08% 41.37%)",
        dark: "hsl(220.65deg 44.08% 31.37%)",
        contrastText: "white",
      },
      instagram: {
        main: "hsl(11, 90%, 61%)",
        dark: "hsl(11, 90%, 51%)",
        contrastText: "white",
      },
      twitter: {
        main: "hsl(203, 89%, 53%)",
        dark: "hsl(203, 89%, 43%)",
        contrastText: "white",
      },
      linkedIn: {
        main: "hsl(201, 100%, 35%)",
        dark: "hsl(201, 100%, 25%)",
        contrastText: "white",
      },
    },
    components: {
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontSize: 13,
            // textTransform:'capitalize'
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 16,
            paddingInline: 25,
            textTransform: "none",
          },
        },
        variants: [
          {
            props: { variant: "dashed" },
            style: {
              backgroundColor: "var(--brand)",
              color: "white",
              padding: "12px 24px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "var(--brandLight)",
              },
            },
          },
        ],
      },
      MuiAccordion: {
        defaultProps: {
          disableGutters: true,
          elevation: 0,
          TransitionProps: { unmountOnExit: true },
        },
        styleOverrides: {
          root: {
            ":before": {
              opacity: "1 !important",
            },
          },
        },
        variants: [
          {
            props: { className: "noPadding" },
            style: {
              ".MuiAccordionDetails-root": {
                padding: 0,
                marginInline: 0,
              },
              ".MuiAccordionSummary-root": {
                padding: 0,
              },
            },
          },
        ],
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            marginInline: 20,
            marginBottom: 20,
          },
        },
      },
      MuiTypography: {
        variants: [
          {
            props: {
              className: "noWrapLine",
            },
            style: {
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
            },
          },
        ],
      },
    },
  });

  return <ThemeProvider theme={responsiveFontSizes(theme)}>{children}</ThemeProvider>;
}
