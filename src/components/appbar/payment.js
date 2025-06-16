import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  cardHolderName: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Inserisci un nome valido")
    .required("Inserisci il nome del titolare"),
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, "Il numero della carta deve avere 16 cifre")
    .required("Inserisci il numero della carta"),
  expiryDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/YY richiesto")
    .required("Inserisci la data di scadenza"),
  cvv: yup
    .string()
    .matches(/^\d{3,4}$/, "Il CVV deve avere 3 o 4 cifre")
    .required("Inserisci il CVV"),
});

export default function PaymentDialog({
  open,
  onClose,
  clearCart,
  setShippingOpen,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data) => {
    console.log("Dati della carta:", data);
    alert("Pagamento effettuato con successo!");
    clearCart();
    onClose();
  };

  const handleBackToShipping = () => {
    setShippingOpen(true);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Pagamento</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Nome Titolare Carta"
            variant="outlined"
            {...register("cardHolderName")}
            error={!!errors.cardHolderName}
            helperText={errors.cardHolderName?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Numero Carta"
            variant="outlined"
            inputProps={{ maxLength: 16 }}
            {...register("cardNumber")}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Data di Scadenza (MM/YY)"
            variant="outlined"
            placeholder="MM/YY"
            {...register("expiryDate")}
            error={!!errors.expiryDate}
            helperText={errors.expiryDate?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="CVV"
            variant="outlined"
            inputProps={{ maxLength: 4 }}
            {...register("cvv")}
            error={!!errors.cvv}
            helperText={errors.cvv?.message}
            sx={{ mb: 2 }}
          />
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleBackToShipping} color="secondary">
              Indietro
            </Button>
            <Button variant="contained" type="submit">
              Conferma Pagamento
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
