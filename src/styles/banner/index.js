import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export const BannerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  height: "100%",
  padding: "0px",
  borderRadius: "20px",
  background: "#01796F",
}));

export const BannerImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "700px",
  borderRadius: "20px",
  objectFit: "cover",
  alignSelf: "flex-start",
}));

export const BannerContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: 500,
  padding: "30px",
  marginLeft: "60px",
}));

export const BannerTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  fontSize: "75px",
  marginBottom: "20px",
  fontFamily: "Montez",
  fontWeight: "bold",
}));

export const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  letterSpacing: 1.25,
  marginBottom: "3em",
  color: "#D8D3C3",
  fontFamily: "Cookie",
  fontSize: "30px",
}));
