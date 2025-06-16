import { AppbarContainer, AppbarHeader, MyList } from "../../styles/appbar";
import Actions from "../actions";

export default function AppbarDesktop({
  cartItems,
  addToCart,
  removeFromCart,
  clearCart,
}) {
  return (
    <AppbarContainer>
      <AppbarHeader> PlantZ </AppbarHeader>
      <MyList type="row" />
      <Actions
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </AppbarContainer>
  );
}
