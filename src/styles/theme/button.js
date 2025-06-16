import { Button, styled } from "@mui/material";

const SButton = styled(Button)(() => ({
  backgroundColor: "#01796F",
  textTransform: "none",
  fontSize: "1rem",
  borderRadius: "8px",
  color: "white",
  "&:hover": { background: "#01796F" },
}));

export default SButton;
