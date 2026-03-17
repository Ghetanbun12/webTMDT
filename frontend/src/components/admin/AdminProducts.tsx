import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Space,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { getProducts, deleteProduct, updateProduct } from "../../api/products";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  type: string;
  imageUrl: string;
}

const ProductManager: React.FC = () => {
  const [file, setFile] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [form] = Form.useForm();

  const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        message.error("Lỗi khi lấy sản phẩm");
      } finally {
        setLoading(false);
      }  
    };

  useEffect(() => {
    fetchProducts();
  }, []);


  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("stock", values.stock);
      formData.append("type", values.type);

      if (file) {
        formData.append("image", file);
      }

      await axios.post("http://localhost:3000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Thêm sản phẩm thành công 🎉");
    } catch (error) {
      console.error(error);
      message.error("Thêm sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    form.setFieldsValue(product);
    setEditOpen(true);
  };

  const handleUpdate = async (values: any) => {
    if (!selectedProduct) return;

    try {
      await updateProduct(selectedProduct._id, values);
      message.success("Cập nhật thành công");
      setEditOpen(false);
      form.resetFields();
      fetchProducts();
    } catch (err) {
      message.error("Cập nhật thất bại");
    }

  };

    const handleDelete = async (id: string) => {

    try {      await deleteProduct(id);
      message.success("Xóa thành công");
      fetchProducts();
    } catch (err) {
      message.error("Xóa thất bại");
    }
  };
  const columns = [
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      render: (url: string) => (
        <img
          src={url}
          alt="product"
          style={{ width: 60, height: 60, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price: number) => price.toLocaleString() + " đ",
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
    },
    {
      title: "Loại",
      dataIndex: "type",
    },
    {
      title: "Hành động",
      render: (_: any, record: Product) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 30 }}>
      <h2>Quản lý sản phẩm</h2>

      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => setCreateOpen(true)}
      >
        + Thêm sản phẩm
      </Button>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="_id"
        loading={loading}
      />
      <Modal
        title="Thêm sản phẩm"
        open={createOpen}
        onCancel={() => {
          setCreateOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="stock" label="Tồn kho">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="type" label="Loại">
            <Input />
          </Form.Item>

          <Form.Item label="Hình ảnh">
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>


          <Button type="primary" htmlType="submit" block>
            Thêm sản phẩm
          </Button>
        </Form>
      </Modal>
      <Modal
        title="Sửa sản phẩm"
        open={editOpen}
        onCancel={() => {
          setEditOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleUpdate} form={form}>
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="stock" label="Tồn kho">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="type" label="Loại">
            <Input />
          </Form.Item>

          <Form.Item name="imageUrl" label="Image URL">
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Cập nhật
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManager;