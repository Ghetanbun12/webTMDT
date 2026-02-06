import { Slider } from "antd";

interface ProductFilterProps {
  selectedType?: string;
  onTypeChange?: (type: string) => void;
  priceRange?: [number, number];
  onPriceChange?: (value: [number, number]) => void;
}

const ProductFilter = ({
  selectedType = "ALL",
  onTypeChange = () => {},
  priceRange = [0, 1000],
  onPriceChange = () => {},
}: ProductFilterProps) => {
  const types: string[] = [
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
        {types.map((type) => (
          <li
            key={type}
            className={selectedType === type ? "active" : ""}
            onClick={() => onTypeChange(type)}
          >
            {type}
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
