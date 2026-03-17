import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, List, Card, Divider } from "antd";
import { getCart } from "../api/cart";
import { getProductById } from "../api/products";
import { createOrder } from "../api/orders";
import { useUser } from "../components/UserContext.tsx";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  product?: Product;
}

const CheckoutPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        //   const cartData: CartItem[] = res.data;
        // console.log(cartData);
        
        // const fullData = await Promise.all(
        //   cartData.map(async (item) => {
        //     const productRes = await getProductById(item.productId);
        //     return { ...item, product: productRes.data };
        //   })
        // );
        // API trả về object { items: [...] } chứ không phải mảng trực tiếp
        const cartData: CartItem[] = res.data.items || [];
        
        // Nếu đã có thông tin sản phẩm trong items (name, price, imageUrl), 
        // ta có thể dùng trực tiếp hoặc map lại cho đúng interface
        const fullData = cartData.map((item: any) => ({
          ...item,
          product: item.productId && typeof item.productId === 'object' ? item.productId : {
            _id: item.productId,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl
          }
        }));
        
        setItems(fullData);
      } catch (err) {
        console.error("Error fetching cart:", err);
        message.error("Không thể tải thông tin giỏ hàng.");
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user, form]);

  const onFinish = async (values: any) => {
    if (items.length === 0) {
      message.warning("Giỏ hàng của bạn đang trống.");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        user,
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product?.price
        })),
        totalAmount: items.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0),
      };

      await createOrder(orderData);
      message.success("Đặt hàng thành công!");
      navigate("/orders");
    } catch (err: any) {
      message.error(err.response?.data?.message || "Đặt hàng thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = items.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Thanh toán</h1>
      <div style={{ display: "flex", gap: "40px" }}>
        <div style={{ flex: 2 }}>
          <Card title="Thông tin giao hàng">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa chỉ giao hàng"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block size="large">
                  Đặt hàng ngay
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div style={{ flex: 1 }}>
          <Card title="Đơn hàng của bạn">
            <List
              itemLayout="horizontal"
              dataSource={items}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.product?.name}
                    description={`Số lượng: ${item.quantity} x $${item.product?.price}`}
                  />
                  <div>${((item.product?.price || 0) * item.quantity).toFixed(2)}</div>
                </List.Item>
              )}
            />
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "bold" }}>
              <span>Tổng cộng:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
