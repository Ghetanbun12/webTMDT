import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { CartContext } from "../cart/cartcontext";  
import { addToCart } from "../../api/cart";
const { Title, Paragraph, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Đang tải sản phẩm...</p>;
  const handleAddToCart = () => {
    console.log("Thêm vào giỏ hàng:", product);
    addToCart(
      { productId: product._id, quantity: qty }
    );
    alert("Đã thêm vào giỏ hàng" ,product.id);
  };
  return (
    <div className="pd-container">

      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className="pd-back-btn"
      >
        Back
      </Button>

      <div className="pd-content">

        {/* Image */}
        <div className="pd-image-box">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        {/* Info */}
        <div className="pd-info">
          <Title level={2} className="pd-title">
            {product.name}
          </Title>

          <Text className="pd-sku">SKU: 0002</Text>

          <Text className="pd-price">${product.price}</Text>

          <Paragraph className="pd-description">
            {product.description}
            <a href="#"> Read more</a>
          </Paragraph>

          {/* Quantity */}
          <div className="pd-qty-box">
            <Text>Quantity *</Text>
            <div className="pd-qty-control">
              <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
              <div className="pd-qty-number">{qty}</div>
              <button onClick={() => setQty(qty + 1 )}>+</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="pd-buttons">
            <Button type="primary" className="pd-add-cart" onClick={handleAddToCart}>
              Add to Cart
            </Button>

            <Button className="pd-buy-now">Buy Now</Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;