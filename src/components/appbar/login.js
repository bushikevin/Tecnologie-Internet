import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import SButton from "../../styles/theme/button";

export default function LoginDialog({
  open,
  onClose,
  onLogin,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  errorMessage,
  setErrorMessage,
}) {
  const [isRegistering, setIsRegistering] = useState(false);

  const validateFields = () => {
    if (isRegistering) {
      if (!name || !email || !password) {
        setErrorMessage("Tutti i campi sono obbligatori.");
        return false;
      }
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    const url = isRegistering
      ? "http://localhost:5002/register"
      : "http://localhost:5002/login";
    const body = isRegistering
      ? { email, password, name }
      : { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userId", data.userId);
        onLogin();
        onClose();
      } else {
        setErrorMessage(data.error || "Errore durante l'autenticazione");
      }
    } catch (error) {
      setErrorMessage("Errore di rete, riprova più tardi.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle fontFamily={"Montez"} fontSize={"40px"}>
        {isRegistering ? "Sign In" : "Login"}
      </DialogTitle>
      <DialogContent>
        {isRegistering && (
          <TextField
            margin="dense"
            label="Nome"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {errorMessage}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <SButton onClick={handleSubmit}>
          {isRegistering ? "Registrati" : "Accedi"}
        </SButton>
      </DialogActions>
      <DialogActions>
        <Button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setEmail("");
            setPassword("");
            setName("");
            setErrorMessage("");
          }}
          sx={{
            textDecoration: "underline",
            color: "#01796F",
            textTransform: "none",
          }}
        >
          {isRegistering
            ? "Hai già un account? Accedi"
            : "Non hai un account? Registrati"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
