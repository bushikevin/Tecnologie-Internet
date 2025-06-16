import React, { useState, useEffect } from "react";
import { Box, Container, Typography, ThemeProvider } from "@mui/material";
import Banner from "./components/banner";
import PlantList from "./components/plants";
import AppbarDesktop from "./components/appbar/appbarDesktop";
import theme from "./styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./components/footer";

function App() {
  useEffect(() => {
    document.title = "plantz";
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (index) => {
    setCartItems((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ background: "#D8D3C3" }}>
        <AppbarDesktop
          cartItems={cartItems}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
        <Banner />
        <Box display="flex" justifyContent={"center"} sx={{ p: 4 }}>
          <Typography variant="h4" fontFamily={"Montez"} fontSize={"4rem"}>
            Le piante perfette per casa tua:
          </Typography>
        </Box>
        <PlantList addToCart={addToCart} />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
