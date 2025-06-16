import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Nome e cognome obbligatori"),
  email: yup.string().email("Email non valida").required("Email obbligatoria"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Deve contenere solo numeri")
    .min(10, "Numero troppo corto")
    .required("Numero di telefono obbligatorio"),
  address: yup.string().required("Indirizzo obbligatorio"),
  city: yup.string().required("Città obbligatoria"),
  cap: yup
    .string()
    .matches(/^\d{5}$/, "CAP non valido")
    .required("CAP obbligatorio"),
});

export default function ShippingDialog({ open, onClose, onComplete }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data) => {
    onComplete(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Recapiti di Spedizione</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nome e Cognome"
                fullWidth
                sx={{ marginTop: 1 }}
                {...register("fullName")}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Numero di telefono"
                fullWidth
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Indirizzo"
                fullWidth
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Città"
                fullWidth
                {...register("city")}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CAP"
                fullWidth
                {...register("cap")}
                error={!!errors.cap}
                helperText={errors.cap?.message}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Annulla
        </Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Conferma
        </Button>
      </DialogActions>
    </Dialog>
  );
}
