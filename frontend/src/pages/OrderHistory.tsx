import React, { useEffect, useState } from "react";
import { Table, Tag, Space, message, Card, Typography } from "antd";
import { getMyOrders, cancelOrder } from "../api/orders";
import dayjs from "dayjs";

const { Title } = Typography;

interface OrderItem {
  productId: {
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getMyOrders();
      setOrders(res.data);
    } catch (err) {
      message.error("Không thể lấy danh sách đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      await cancelOrder(id);
      message.success("Hủy đơn hàng thành công.");
      fetchOrders();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Hủy đơn hàng thất bại.");
    }
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => <a>{text.slice(-6).toUpperCase()}</a>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Sản phẩm",
      dataIndex: "items",
      key: "items",
      render: (items: OrderItem[]) => (
        <div>
          {items.map((item, idx) => (
             <div key={idx}>
               {item.productId ? item.productId.name : "Sản phẩm không tồn tại"} x {item.quantity}
             </div>
          ))}
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => `$${totalAmount}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "blue";
        if (status === "pending") color = "gold";
        if (status === "completed") color = "green";
        if (status === "cancelled") color = "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: Order) => (
        <Space size="middle">
          {record.status === "pending" && (
            <a onClick={() => handleCancel(record._id)} style={{ color: "red" }}>Hủy đơn</a>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <Card>
        <Title level={2}>Lịch sử đơn hàng</Title>
        <Table 
          columns={columns} 
          dataSource={orders} 
          rowKey="_id" 
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default OrderHistory;
