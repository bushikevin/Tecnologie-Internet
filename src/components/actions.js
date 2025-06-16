import { useState } from "react";
import { ListItemButton, ListItemIcon, Tooltip, Divider } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { MyList, ActionIconsContainerDesktop } from "../styles/appbar";
import LoginDialog from "./appbar/login";
import CartDialog from "./appbar/cart";
import OrdersDialog from "./appbar/orders";

export default function Actions({ cartItems, removeFromCart, clearCart }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginSuccess = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <>
      <ActionIconsContainerDesktop>
        <MyList type="row">
          {/* Carrello */}
          <Tooltip title="Vai al carrello" arrow>
            <ListItemButton
              sx={{ justifyContent: "center" }}
              onClick={() => setCartOpen(true)}
            >
              <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
                <ShoppingCartIcon />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />

          {/*Ordini*/}
          {isAuthenticated && (
            <Tooltip title="I miei ordini" arrow>
              <ListItemButton
                sx={{ justifyContent: "center" }}
                onClick={async () => {
                  const userId = localStorage.getItem("userId");
                  if (!userId) return;

                  try {
                    const res = await fetch(
                      `http://localhost:5002/api/orders/${userId}`
                    );
                    const data = await res.json();
                    setOrders(data);
                    setOrdersOpen(true);
                  } catch (error) {
                    console.error(
                      "Errore nel caricamento degli ordini:",
                      error
                    );
                  }
                }}
              >
                <ListItemIcon
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <LocalShippingIcon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          )}

          <Divider orientation="vertical" flexItem />

          {/* Login / Logout */}
          {isAuthenticated ? (
            <Tooltip title="Esci" arrow>
              <ListItemButton
                sx={{ justifyContent: "center" }}
                onClick={handleLogout}
              >
                <ListItemIcon
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <LogoutIcon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          ) : (
            <Tooltip title="Accedi" arrow>
              <ListItemButton
                sx={{ justifyContent: "center" }}
                onClick={() => {
                  setLoginOpen(true);
                  setEmail("");
                  setPassword("");
                  setName("");
                  setErrorMessage("");
                }}
              >
                <ListItemIcon
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <PersonIcon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          )}

          <Divider orientation="vertical" flexItem />
        </MyList>
      </ActionIconsContainerDesktop>

      <LoginDialog
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLoginSuccess}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        name={name}
        setName={setName}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <CartDialog
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        isAuthenticated={isAuthenticated}
        setLoginOpen={setLoginOpen}
        setOrders={setOrders}
      />
      <OrdersDialog
        open={ordersOpen}
        onClose={() => setOrdersOpen(false)}
        orders={orders}
      />
    </>
  );
}
