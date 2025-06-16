import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SButton from "../../styles/theme/button";
import ShippingDialog from "./shipping";
import PaymentDialog from "./payment";

export default function CartDialog({
  open,
  onClose,
  cartItems,
  removeFromCart,
  clearCart,
  isAuthenticated,
  setLoginOpen,
  setOrders,
}) {
  const [shippingOpen, setShippingOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [shippingData, setShippingData] = useState(null);

  const totalPrice = cartItems.reduce(
    (total, item) => total + (parseFloat(item.price) || 0),
    0
  );

  const handleProceedToShipping = () => {
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }

    if (cartItems.length > 0) {
      setShippingOpen(true);
    }
  };

  const handleShippingComplete = async (data) => {
    setShippingData(data);
    setShippingOpen(false);
    setPaymentOpen(true);
  };

  const handleSaveOrder = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log("Saving order for user:", userId);

      const response = await fetch("http://localhost:5002/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          items: cartItems,
          total: totalPrice,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Errore dal server:", errorText);
      }
    } catch (error) {
      console.error("Errore durante il salvataggio dell'ordine:", error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle fontFamily={"Montez"} fontSize={"40px"}>
          Carrello
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "400px", overflowY: "auto" }}>
          {cartItems.length === 0 ? (
            <Typography>Il carrello è vuoto</Typography>
          ) : (
            <Grid container spacing={2}>
              {cartItems.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Card sx={{ display: "flex", alignItems: "center" }}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        margin: 1,
                        borderRadius: 2,
                      }}
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body1">{item.name}</Typography>
                      <Typography variant="body2">
                        {" "}
                        Prezzo: €{item.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => removeFromCart(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Totale: €{totalPrice.toFixed(2)}</Typography>
          <SButton
            variant="contained"
            onClick={handleProceedToShipping}
            disabled={cartItems.length === 0}
          >
            Vai al pagamento
          </SButton>
        </DialogActions>
      </Dialog>

      <ShippingDialog
        open={shippingOpen}
        onClose={() => setShippingOpen(false)}
        onComplete={handleShippingComplete}
      />

      <PaymentDialog
        open={paymentOpen}
        onClose={async () => {
          setPaymentOpen(false);
          if (cartItems.length > 0) {
            await handleSaveOrder();
            const newOrder = {
              items: [...cartItems],
              total: cartItems.reduce(
                (t, i) => t + parseFloat(i.price || 0),
                0
              ),
              date: new Date().toISOString(),
            };
            setOrders((prev) => [...prev, newOrder]);
            clearCart();
          }
        }}
        shippingData={shippingData}
        clearCart={clearCart}
        setShippingOpen={setShippingOpen}
      />
    </>
  );
}
