/* eslint-disable prettier/prettier */
import React from 'react'
import { Form, Input, Button } from 'antd'
import axios from 'axios'
import './_addproduct.scss'

const AddProductForm: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = (values: unknown) => {
    // Gửi dữ liệu đến API để thêm sản phẩm
 axios 
    . post('https://ecom-be-htgu.onrender.com/products', values)
      .then(response => {
        console.log('Thêm sản phẩm thành công:', response.data)
        form.resetFields()
      })
      .catch(error => {
        console.error('Lỗi khi thêm sản phẩm:', error)
      })
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddProductForm