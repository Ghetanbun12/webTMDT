import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">

      {/* ===== TOP ===== */}
      <div className="footer-inner">
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">adalene.</div>
            <p className="footer-tagline">Crafted with love,<br />worn with intention.</p>
          </div>

          {/* Columns */}
          <div className="footer-cols">

            <div className="footer-col">
              <span className="footer-col-title">Explore</span>
              <a>Shop All</a>
              <a>Our Story</a>
              <a>Our Craft</a>
              <a>Gift Card</a>
              <a>Contact</a>
            </div>

            <div className="footer-col">
              <span className="footer-col-title">Support</span>
              <a>FAQ</a>
              <a>Shipping & Returns</a>
              <a>Store Policy</a>
              <a>Payment Methods</a>
              <a>Stockists</a>
            </div>

            <div className="footer-col">
              <span className="footer-col-title">Follow Us</span>
              <a>Facebook</a>
              <a>Instagram</a>
              <a>Twitter</a>
              <a>Pinterest</a>
            </div>

          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} Adalene. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a>Privacy Policy</a>
          <a>Terms of Use</a>
          <a>Cookies</a>
        </div>
      </div>

    </footer>
  );
}