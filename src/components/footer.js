import React from "react";
import { Box, Container, Grid, Typography, Link, Divider } from "@mui/material";
import { Facebook, Instagram, Pinterest } from "@mui/icons-material";
import { SiTiktok } from "react-icons/si";

const Footer = () => {
  return (
    <Box sx={{ background: "#1f1f27", color: "white", py: 6, mt: 0.5 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Clienti
            </Typography>
            <Typography variant="body2">- Spedizione</Typography>
            <Typography variant="body2">- Resi e rimborsi</Typography>
            <Typography variant="body2">- Pagamenti</Typography>
            <Typography variant="body2">- FAQ</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Scopri
            </Typography>
            <Typography variant="body2">- Cura delle piante</Typography>
            <Typography variant="body2">- La pianta giusta</Typography>
            <Typography variant="body2">- Blog</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Collaborazioni
            </Typography>
            <Typography variant="body2">- Coltivatori locali</Typography>
            <Typography variant="body2">- Progetti sostenibili</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Chi siamo
            </Typography>
            <Typography variant="body2">- Storia</Typography>
            <Typography variant="body2">- Contatti</Typography>
            <Typography variant="body2">- Lavora con noi</Typography>
            <Typography variant="body2">- Recensioni</Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Coming soon on
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, mt: 1 }}>
              <Facebook sx={{ color: "#01796F" }} />
              <SiTiktok style={{ color: "#01796F", fontSize: "24px" }} />
              <Instagram sx={{ color: "#01796F" }} />
              <Pinterest sx={{ color: "#01796F" }} />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "#444" }} />

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} md="auto">
            <Typography variant="body2" textAlign="center">
              © {new Date().getFullYear()} PlantZ. Tutti i diritti riservati.
            </Typography>
          </Grid>
          <Grid item xs={12} md="auto">
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Link href="#" color="inherit" underline="hover">
                Termini & Condizioni
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Privacy
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Sicurezza
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Cookie
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
