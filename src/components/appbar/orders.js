import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  Typography,
  Divider,
  Box,
  IconButton,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const OrdersDialog = ({ open, onClose, orders }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontFamily={"Montez"} fontSize={"40px"}>
        Ordini
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {orders.length === 0 ? (
          <Typography>Non hai ancora effettuato ordini.</Typography>
        ) : (
          <List>
            {orders.map((order) => (
              <Box
                key={order.orderId}
                mb={3}
                border={1}
                borderRadius={2}
                borderColor="grey.300"
                p={2}
              >
                <Typography variant="body2" color="text.secondary">
                  Data: {new Date(order.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Totale: €{Number(order.total).toFixed(2)}
                </Typography>
                <Divider sx={{ my: 1 }} />
                {order.items.map((item, index) => {
                  console.log("Immagine:", item.image);
                  return (
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
                    </Card>
                  );
                })}
              </Box>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrdersDialog;
