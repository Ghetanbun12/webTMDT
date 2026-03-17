import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { addToCart } from "../../api/cart";
import { getProductById } from "../../api/products";
import "../../styles/product/ProductDetail.css";
import SimilarProducts from "./SimilarProducts.tsx";
import {useUser} from '../UserContext.tsx';
import { Navigation } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;


interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  bestSeller?: boolean;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const navigate = useNavigate();

  // ✅ typed state (NO null-any mess)
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;

        const res = await getProductById(id);
        setProduct(res.data as Product);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching product:", err.message);
        } else {
          console.error("Unknown error:", err);
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Đang tải sản phẩm...</p>;
  const checkinfor =  !user || !user.address || !user.phone || !user.name;  
  const handleCheckinforUser = () => {
    if(checkinfor) {
      alert("Vui lòng cập nhật thông tin cá nhân để thêm vào giỏ hàng");
      console.log("User info incomplete:", user);
      navigate("/updateinforuser");

    }
    else {
      navigate("/login");
    }
  }

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product._id,
        quantity: qty,
      });
      alert("Đã thêm vào giỏ hàng");
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  return (
    <div className="pd-container">
      {/* BACK BUTTON */}
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className="pd-back-btn"
      >
        Back
      </Button>

      <div className="pd-content">
        {/* IMAGE */}
        <div className="pd-image-box">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        {/* INFO */}
        <div className="pd-info">
          <Title level={2} className="pd-title">
            {product.name}
          </Title>

          <Text className="pd-sku">SKU: {product._id}</Text>

          <Text className="pd-price">${product.price}</Text>

          <Paragraph className="pd-description">
            {product.description} <a href="#">Read more</a>
          </Paragraph>

          {/* QUANTITY */}
          <div className="pd-qty-box">
            <Text>Quantity *</Text>
            <div className="pd-qty-control">
              <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
              <div className="pd-qty-number">{qty}</div>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pd-buttons">
            <Button
              type="primary"
              className="pd-add-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <Button className="pd-buy-now" onClick={handleCheckinforUser}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <div>
          {/* SIMILAR PRODUCTS */}
          <SimilarProducts productId={product._id} />
      </div>
    </div>
  );
};

export default ProductDetail;
