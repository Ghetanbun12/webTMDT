import React, { useEffect, useState } from "react";
import "../../styles/home/Home.css";
import { getProducts } from "../../api/products";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  bestSeller?: boolean;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeItem, setActiveItem] = useState<Product | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        const data: Product[] = res.data;
        setProducts(data);
        if (data.length > 0) setActiveItem(data[0]);
      } catch (err) {
        console.error("Fetch products error:", err);
      }
    };
    fetchProducts();
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < products.length - 3) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="food-wrapper">
      {/* ===== LEFT: ẢNH & THUMBNAILS ===== */}
      <div className="food-left">
        {activeItem && (
          <img
            src={activeItem.imageUrl}
            className="food-main-img"
            alt={activeItem.name}
          />
        )}

        <div className="food-thumbs-container">
          <button
            className="thumb-nav prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            ‹
          </button>

          <div className="food-thumbs">
            {products.slice(currentIndex, currentIndex + 3).map((item) => (
              <div
                key={item._id}
                className={`thumb ${activeItem?._id === item._id ? "active" : ""}`}
                onClick={() => setActiveItem(item)}
              >
                <img src={item.imageUrl} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>

          <button
            className="thumb-nav next"
            onClick={handleNext}
            disabled={currentIndex >= products.length - 3}
          >
            ›
          </button>
        </div>
      </div>

      {/* ===== RIGHT: THÔNG TIN MÓN ĂN ===== */}
      <div className="food-info">
        <h1 className="food-name">{activeItem?.name}</h1>

        <div className="food-divider" />

        <p className="food-description">{activeItem?.description}</p>

        {activeItem?.bestSeller && (
          <div className="best-seller-label">🔥 Best Seller</div>
        )}

        <h2 className="food-price">
          {activeItem?.price.toLocaleString("vi-VN")} ₫
        </h2>
      </div>
    </div>
  );
};

export default Home;