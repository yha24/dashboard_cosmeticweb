/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { Button } from 'antd'

import axios from 'axios'
import 'antd/dist/reset.css'
import './_product.scss'

interface Product {
  id: number
  product_name: string
  price: number
  image: string
  description: string
  status: string
  product_availability: string
  brand: string
  delete_At: Date | null
  quantity_sold: number
  quantity_inventory: number
  sku: number
  category: {
    id: number
    category_name: string
    delete_at: Date | null
  }
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Gọi API và cập nhật dữ liệu vào biến products
    axios.get('https://ecom-be-htgu.onrender.com/products').then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error)
      })
  }, [])
  const handleEdit = (record: Product) => {
    const productId = record.id;
    console.log("ID của sản phẩm:", productId)
  }
  const handleDelete = (record: Product) => {
    const productId = record.id
    axios.delete(`https://ecom-be-htgu.onrender.com/products/${productId}`).then(() => {console.log("Xóa sản phẩm thành công")
        const updateProduct = products.filter(products => products.id !== productId)
        setProducts(updateProduct)
      })
      .catch(error => {
        console.error("Lỗi khi xóa sản phẩm:", error)
        console.log(productId)
      })
  }
  const columns = [
    {
      title: <div className='centered-title'>ID</div>,
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: <div className="centered-title">Product Name</div>,
      dataIndex: 'product_name',
      key: 'product_name'
    },
    {
      title: <div className="centered-title">Description</div>,
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: <div className="centered-title">Price</div>,
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: <div className="centered-title">Image</div>,
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <img src={image} alt="Product" style={{ width: '50px' }} />
    },
    {
      title: <div className="centered-title">Category</div>,
      dataIndex: 'category',
      key: 'category',
      render: (category: { category_name: string }) => category.category_name
    },
    {
      title: <div className="centered-title">Actions</div>,
      key: 'actions',
      render: (record: Product) => (
        <div className="centered-title">
          <Button type="primary" size="small" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="dashed" size="small" onClick={() => handleDelete(record)}>Delete</Button>
        </div>
      )
    }
  ]


  return <Table className="product-table" dataSource={products} columns={columns} style={{backgroundColor:'rgb(171 220 133)'}} />
}

export default ProductTable