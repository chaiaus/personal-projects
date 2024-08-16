import React from "react";
import ReactDOM from "react-dom/client";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import { green, grey } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Arial Rounded MT Bold",
          color: "#3D3D3D",
          justifyContent: "center",
          alignItems: "center",
          lineHeight: 1.2,
          "&.score-text": {
            fontSize: "5rem",
            color: "#525252",
          },
        },
        h4: {
          fontFamily: "Futura Bold",
          fontSize: "40px",
        },
        h5: {
          fontFamily: "Rockwell",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
          lineHeight: 1.2,
        },
        h6: {
          fontFamily: "Futura Bold",
          height: "25%",
        },
        subtitle1: {
          fontFamily: "Rockwell",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          boxShadow: "rgb(191, 191, 191) 1px 3px 0",
          color: "white",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.submit-btn": {
            fontFamily: "Arial Rounded MT Bold",
            width: "150px",
            height: "50px",
            borderRadius: "10px",
            color: "white",
            border: 0,
            borderBottom: "2px solid white",
            fontSize: "20px",
            boxShadow: "#7d7d7d 0 5px 0",
            cursor: "pointer",
            padding: 0,
          },
        },
        text: {
          fontFamily: "Arial Rounded MT Bold",
          color: "#3D3D3D",
          textTransform: "none",
        },
        contained: {
          fontFamily: "Rockwell",
          color: "#3D3D3D",
          textTransform: "none",
          paddingTop: "10px",
          boxShadow: "rgb(191, 191, 191) 0 7px 0",
          borderBottom: "2.5px solid white",
          borderLeft: "1.5px solid white",
          "&.Mui-disabled": {
            backgroundColor: grey.A700,
            boxShadow: "rgb(191, 191, 191) 0 7px 0",
          },
          "&.long-btn": {
            width: "400px",
            height: "55px",
            borderRadius: "25px",
            fontSize: "20px",
            marginBottom: "20px",
            "&:hover": {
              backgroundColor: green.A400,
              boxShadow: "rgb(191, 191, 191) 0 7px 0",
            },
          },
          "&.round-over-btn": {
            fontFamily: "Arial Rounded MT Bold",
            color: "white",
            width: "140px",
            height: "45px",
            marginTop: "10px",
            fontSize: "18px",
            padding: 0,
            borderRadius: "25px",
            boxShadow: "rgb(191, 191, 191) 0 5px 0",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // display: "flex",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          "&.MuiGrid-item": { padding: 0 },
        },
      },
    },
  },
});

import { createGlobalStyle } from "styled-components";
import App from "./App";

const GlobalStyles = createGlobalStyle`  html {
    --color-timberwolf: rgb(204,203,196);
    --color-battleshipgray: rgb(146,144,139);
    --color-davysgray: rgb(82,82,82);
    --color-onyx: rgb(61,61,61);
    --color-vanilla: rgb(252,230,162);
    --color-sunglow: rgb(252, 200, 43);
    --color-powderblue: rgb(165,196,228);
    --color-celadon: rgb(187,214,171);
    --color-mimipink: rgb(240,212,219);
    --color-selected: rgb(0,249,0);
    --color-disabled: rgb(125,125,125);
    --color-pistachio: rgb(174, 213, 129);
    --color-hunyadiyellow: rgb(255, 183, 77);
    --color-persianred: rgb(204, 51, 51);
    --color-lightred: rgb(255, 126, 121);
  }`;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
