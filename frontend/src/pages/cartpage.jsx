import { useCart } from "../components/cart/cartcontext";
// import "../styles/cart.css";
import GetCartProduct from "../components/cart/getcard";
export default function CartPage() {
  // const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart-container">
      {/* <h2>Giỏ hàng</h2>

      {cart.length === 0 && <p>Giỏ hàng trống</p>}

      {cart.map((item) => (
        <div key={item._id} className="cart-item">
          <img src={item.imageUrl} alt={item.name} />
          <div>
            <h4>{item.name}</h4>
            <p>Số lượng: {item.quantity}</p>
          </div>
          <button onClick={() => removeFromCart(item._id)}>Xóa</button>
        </div>
      ))}

      {cart.length > 0 && (
        <button className="btn-clear" onClick={clearCart}>
          Xóa tất cả
        </button>
      )} */}
      <GetCartProduct />
      <div>hellllllllllllllll</div>
    </div>
  );
}
