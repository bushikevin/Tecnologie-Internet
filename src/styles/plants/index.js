import { styled, Box } from "@mui/material";

export const Product = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "16px",
  borderRadius: "20px",
  background: "#01796F",
  boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  [theme.breakpoints.up("md")]: {
    position: "relative",
  },
}));

export const CardButton = () => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "transparent",
  color: "white",
  border: "2px solid white",
  opacity: 0,
  transition: "opacity 0.3s, background-color 0.3s",
  "&:hover": {
    bgcolor: "rgba(255, 255, 255, 0.2)",
    opacity: 1,
  },
});
