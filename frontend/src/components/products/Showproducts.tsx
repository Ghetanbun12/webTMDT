import { useState, useEffect } from "react";
import { Row, Col, Card, Tag, Typography } from "antd";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getProducts } from "../../api/products";
import ProductFilter from "./productfilter";
import "../../styles/product/Products.css";

const { Meta } = Card;
const { Text } = Typography;

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  bestSeller: boolean;
}

interface OutletContextType {
  dataSearch: Product[];
}


const ShowProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const { dataSearch } = useOutletContext<OutletContextType>();

  const fetchAllProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data as Product[]);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unknown error", err);
      }
    }
  };

  useEffect(() => {
    if (dataSearch && dataSearch.length > 0) {
      setProducts(dataSearch);
    } else {
      fetchAllProducts();
    }
  }, [dataSearch]);

  return (
    <div className="product-page">
      {/* LEFT FILTER */}
      <aside className="product-filter">
        <ProductFilter />
      </aside>

      {/* RIGHT CONTENT */}
      <section className="product-content">
        <div className="product-header">
          <Text strong>{products.length} products</Text>
          <Text type="secondary">Sort by: Recommended ▼</Text>
        </div>

        <Row gutter={[24, 24]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
              <Card
                hoverable
                className="product-card"
                onClick={() => navigate(`/product/${product._id}`)}
                cover={
                  <div className="product-image-wrapper">
                    {product.bestSeller && (
                      <Tag className="best-seller-tag">Best Seller</Tag>
                    )}
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>
                }
              >
                <Meta
                  title={<div className="product-title">{product.name}</div>}
                  description={
                    <div className="product-price">${product.price}</div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default ShowProducts;
