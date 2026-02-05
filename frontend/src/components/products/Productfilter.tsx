import { Slider } from "antd";

/* =======================
   TYPE DEFINITIONS
======================= */

interface ProductFilterProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  priceRange?: [number, number];
  onPriceChange?: (value: [number, number]) => void;
}

/* =======================
   COMPONENT
======================= */

const ProductFilter = ({
  selectedCategory = "ALL",
  onCategoryChange = () => {},
  priceRange = [0, 1000],
  onPriceChange = () => {},
}: ProductFilterProps) => {
  const categories: string[] = [
    "ALL",
    "Bags",
    "Best Sellers",
    "Leather Belts",
    "Mini Leather Goods",
    "Phone Cases",
  ];

  return (
    <div className="product-filter">
      <h4>Browse by</h4>

      <ul className="filter-list">
        {categories.map((cat) => (
          <li
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>

      <h4>Filter by</h4>
      <p>Price</p>

      <Slider
        range
        min={0}
        max={1000}
        value={priceRange}
        onChange={(value) => onPriceChange(value as [number, number])}
      />

      <div className="price-range">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>
  );
};

export default ProductFilter;
