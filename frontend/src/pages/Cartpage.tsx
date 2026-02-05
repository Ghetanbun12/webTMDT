import { useState } from "react";
import GetCartProduct from "../components/cart/GetCard";

export default function CartPage() {
  const [openCart, setOpenCart] = useState(true);

  return (
    <div className="cart-container">
      <GetCartProduct
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
      />

      <div>hellllllllllllllll</div>
    </div>
  );
}
