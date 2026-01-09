import { useState, useEffect } from "react";
import { getProducts } from "../../api/products";
import { Row, Col, Card, Tag, Typography } from "antd";
import "../../styles/product/products.css"; // style riêng
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
const { Text } = Typography;

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);
  //      useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const Api = axios.create({
  //         baseURL: "http://localhost:3000/api/products",
  //       });
  //       const res = await Api.get("/");
  //       setProducts(res.data);
  //     }
  //     catch (error) {
  //       console.error("Lỗi khi lấy sản phẩm:", error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);
  return (
    <div className="product-container">
      <div className="product-header">
        <Text strong>{products.length} products</Text>
        <Text type="secondary">Sort by: Recommended ▼</Text>
      </div>

      <Row gutter={[24, 24]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
            <Card
              hoverable
              onClick={()=>{Navigate(`/product/${product._id}`)}}
              cover={
                <div className="product-image-wrapper">
                  {product.bestSeller && (
                    <Tag color="volcano" className="best-seller-tag">
                      Best Seller
                    </Tag>
                  )}
                  <img
                    alt={product.name}
                    src={product.imageUrl}
                    className="product-image"
                  />
                </div>
              }
              className="product-card"
            >
              <Meta
                title={
                  <div className="product-title">{product.name}</div>
                }
                description={
                  <div className="product-price">${product.price.toFixed(2)}</div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShowProducts;
