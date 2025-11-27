import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">

        {/* Logo */}
        <div className="footer-logo">adalene.</div>

        {/* Cột 1 */}
        <div className="footer-col">
          <a>Shop All</a>
          <a>Our Story</a>
          <a>Our Craft</a>
          <a>Gift Card</a>
          <a>Contact</a>
        </div>

        {/* Cột 2 */}
        <div className="footer-col">
          <a>FAQ</a>
          <a>Shipping & Returns</a>
          <a>Store Policy</a>
          <a>Payment Methods</a>
          <a>Stockists</a>
        </div>

        {/* Cột 3 */}
        <div className="footer-col">
          <a>Facebook</a>
          <a>Instagram</a>
          <a>Twitter</a>
          <a>Pinterest</a>
        </div>

      </div>
    </footer>
  );
}
