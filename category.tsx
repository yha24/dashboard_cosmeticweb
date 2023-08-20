/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd'
import axios from 'axios'

interface Category {
  id: number
  category_name: string
  delete_at: string
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    // Gọi API và cập nhật dữ liệu vào biến categories
    axios.get('https://ecom-be-htgu.onrender.com/category')
      .then((response) => {
        setCategories(response.data)
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error)
      })
  }, [])
  const handleEdit = (record: Category) => {
    const categoryid = record.id;
    console.log("ID của sản phẩm:", categoryid);

  };

  const handleDelete = async (record: Category) => {
    const categoryid = record.id;
    await axios.delete(`https://ecom-be-htgu.onrender.com/category/${categoryid}`).then(() => {
      console.log("Xóa sản phẩm thành công");
      const updatedCategories = categories.filter(category => category.id !== categoryid);
      setCategories(updatedCategories);
    })
  };
  const columns = [
    {
      title:<div className='centered-title'>ID</div>,
      dataIndex: 'id',
      key: 'id'
    },
    {
      title:<div className='centered-title'>CATEGORY_NAME</div>,
      dataIndex: 'category_name',
      key: 'category_name'
    },
    {
      title: <div className='centered-title'>DELETE_AT</div>,
      dataIndex: 'delete_at',
      key: 'delete_at',
      render: (deleteAt: string | null) => deleteAt === null ? 'null' : deleteAt
    },
    {
      title: <div className='centered-title'>Actions</div>,
      key: 'actions',
      render: (record: Category) => (
        <div className="centered-title" style={{textAlign:'center'}}>
          <Button type="primary" size="small" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="dashed" size="small" onClick={() => handleDelete(record)}>Delete</Button>

        </div>
      )
    }
  ];

  return <Table dataSource={categories} columns={columns} />
}

export default Category