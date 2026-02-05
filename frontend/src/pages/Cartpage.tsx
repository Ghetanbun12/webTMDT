import { useState } from "react";
import GetCard from "../components/cart/GetCard.tsx";  // Sửa từ GetCartProduct thành GetCard

export default function CartPage() {
  const [openCart, setOpenCart] = useState(true);

  return (
    <div className="cart-container">
      <GetCard
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
      />

      <div>hellllllllllllllll</div>
    </div>
  );
}