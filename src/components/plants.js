import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Product, CardButton } from "../styles/plants";
import SButton from "../styles/theme/button";

const PlantList = ({ addToCart }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5002/api/plants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella risposta del server");
        }
        return response.json();
      })
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>Errore: {error}</div>;
  }

  const handleOpenDialog = (plant) => {
    setSelectedPlant(plant);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPlant(null);
  };

  const handleAddToCart = (plant) => {
    addToCart(plant);
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={16}
      sx={{ p: 2 }}
    >
      {plants.map((plant) => (
        <Product key={plant.id} onClick={() => handleOpenDialog(plant)}>
          <Typography
            variant="h6"
            color="#D8D3C3"
            fontFamily={"Cookie"}
            fontSize={"40px"}
          >
            {plant.name}
          </Typography>
          <Typography variant="h6" color="#D8D3C3">
            {" "}
            €{plant.price}
          </Typography>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <img
              src={plant.image}
              alt={plant.name}
              style={{ width: "300px", borderRadius: "20px", display: "block" }}
            />
            <Button
              sx={CardButton}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(plant);
              }}
            >
              Aggiungi al carrello
            </Button>
          </Box>
        </Product>
      ))}

      {selectedPlant && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle fontFamily={"Cookie"} fontSize={"50px"} color="#01796F">
            {selectedPlant.name}
          </DialogTitle>
          <DialogContent>
            <Typography
              fontFamily={"Cookie"}
              fontSize={"30px"}
              fontStyle={"italic"}
            >
              {selectedPlant.description}
            </Typography>
            <img
              src={selectedPlant.image}
              alt={selectedPlant.name}
              style={{ width: "100%", borderRadius: "10px", marginTop: "20px" }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ alignSelf: "flex-start" }}
              >
                Prezzo: €{selectedPlant.price}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <SButton
              onClick={() => {
                handleAddToCart(selectedPlant);
                handleCloseDialog();
              }}
            >
              Aggiungi al carrello
            </SButton>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default PlantList;
