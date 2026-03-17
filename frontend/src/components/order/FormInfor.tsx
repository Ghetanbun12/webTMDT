import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import type { FormProps } from "antd/es/form";
import { updateProfile } from "../../api/auth";
import { useUser } from "../UserContext.tsx";

interface FormInforValues {
  name: string;
  phone: string;
  address: string;
}

const FormInfor: React.FC = () => {
  const [form] = Form.useForm();
  const { user, updateUser } = useUser();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, form]);

  const onFinish: FormProps<FormInforValues>["onFinish"] = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const res = await updateProfile(values, token);
      
      // Cập nhật UserContext sau khi update thành công
      if (res.data) {
        updateUser(res.data);
      }
      
      message.success("Cập nhật thông tin thành công!");
      alert("Cập nhật thông tin thành công!");
    } catch (err: any) {
      message.error(err.response?.data?.message || "Cập nhật thất bại!");
    }
  };

  return (
    <Form<FormInforValues>
      form={form}
      name="user-info"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
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