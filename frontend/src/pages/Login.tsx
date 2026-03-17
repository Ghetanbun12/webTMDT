import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext.tsx";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const onFinish = async (values : any) => {
    setLoading(true);
    try {
      const res = await loginUser(values);
      message.success("Đăng nhập thành công!");
      console.log("Token:", res.data.token);

      // Lưu user vào UserContext
      login(res.data.user, res.data.token);

      navigate("/"); // chuyển về trang chính
    } catch (err : any) {
      message.error(err.response?.data?.message || "Sai thông tin đăng nhập!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50" style={{display:"flex", alignItems:"center", justifyContent:"center", height:"70vh"}}>
      <Card title="Đăng nhập" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={onFinish}>
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
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Đăng nhập
          </Button>

          <div className="mt-2 text-center">
            <a href="/register">Chưa có tài khoản? Đăng ký</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
