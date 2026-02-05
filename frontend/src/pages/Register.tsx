import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values : any) => {
    setLoading(true);
    try {
      const res = await registerUser(values);
      message.success("Đăng ký thành công!");
      console.log("Thông tin user:", res.data);
      navigate("/login");
    } catch (err) {
      if(err instanceof Error){}
      message.error("Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50"  style={{display:"flex", alignItems:"center", justifyContent:"center", height:"70vh"}}>
      <Card title="Đăng ký tài khoản" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tên người dùng"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Đăng ký
          </Button>

          <div className="mt-2 text-center">
            <a href="/login">Đã có tài khoản? Đăng nhập</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
