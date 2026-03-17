import React from "react";
import { Button, Form, Input, message } from "antd";
import type { FormProps } from "antd/es/form";
import { updateProfile } from "../../api/auth";

interface FormInforValues {
  name: string;
  phone: string;
  address: string;
}

const FormInfor: React.FC = () => {

  const onFinish: FormProps<FormInforValues>["onFinish"] = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const res = await updateProfile(values, token);
      message.success(res.data.message);
    } catch (err : any) {
      message.error(err.response?.data?.message || "Sai thông tin đăng nhập!");
    }
  };

  const onFinishFailed: FormProps<FormInforValues>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form<FormInforValues>
      name="user-info"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input your phone!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormInfor;