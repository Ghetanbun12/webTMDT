import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getSimilarProducts } from "../../api/products";
import "../../styles/product/ProductSimilar.css";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
}

const ITEMS_PER_PAGE = 4;

const SimilarProducts = ({ productId }: { productId: string }) => {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const res = await getSimilarProducts(productId);
        setSimilarProducts(res.data);
        setCurrentPage(0);
      } catch (err) {
        console.error("Error fetching similar products:", err);
      }
    };
    fetchSimilarProducts();
  }, [productId]);

  const totalPages = Math.ceil(similarProducts.length / ITEMS_PER_PAGE);
  const currentProducts = similarProducts.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const goTo = (page: number, dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentPage(page);
      setAnimating(false);
    }, 320);
  };

  const handlePrev = () => {
    if (currentPage > 0) goTo(currentPage - 1, "left");
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) goTo(currentPage + 1, "right");
  };

  if (similarProducts.length === 0) return null;

  return (
    <section className="sp-section">
      <div className="sp-header">
        <span className="sp-label">Sản phẩm tương tự</span>
        {totalPages > 1 && (
          <div className="sp-nav">
            <button
              className={`sp-btn${currentPage === 0 ? " sp-btn--disabled" : ""}`}
              onClick={handlePrev}
              disabled={currentPage === 0}
              aria-label="Trang trước"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="sp-pagination">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              className={`sp-btn${currentPage === totalPages - 1 ? " sp-btn--disabled" : ""}`}
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              aria-label="Trang sau"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="sp-carousel-wrapper">
        <div
          ref={trackRef}
          className={`sp-track${animating ? ` sp-track--exit-${direction}` : ""}`}
        >
          {currentProducts.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="sp-card-link"
            >
              <div className="sp-card">
                <div className="sp-card-img-wrap">
                  <img
                    className="sp-card-img"
                    alt={product.name}
                    src={product.imageUrl}
                    loading="lazy"
                  />
                  <div className="sp-card-overlay">
                    <span className="sp-view-btn">Xem ngay</span>
                  </div>
                </div>
                <div className="sp-card-body">
                  <p className="sp-card-name">{product.name}</p>
                  <p className="sp-card-price">
                    {product.price.toLocaleString("vi-VN")}₫
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="sp-dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`sp-dot${i === currentPage ? " sp-dot--active" : ""}`}
              onClick={() => goTo(i, i > currentPage ? "right" : "left")}
              aria-label={`Trang ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SimilarProducts;