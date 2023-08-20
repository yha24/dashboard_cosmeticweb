/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Statistic } from 'antd'
import axios from 'axios'
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  AuditOutlined
} from '@ant-design/icons'
import Category from '~/pages/AdminPage/category/category'
import ProductTable from '~/pages/AdminPage/product/product'

const { Header, Content, Sider } = Layout

const DashboardPage: React.FC = () => {
  // gọi API để hiển thị số hàm Statistic
  const [userData, setUserData] = useState<unknown[]>([]);
  useEffect(() => {
    axios.get('https://ecom-be-htgu.onrender.com/products').then(response => {
      setUserData(response.data)
    })
      .catch(error => {
        console.error('Error fetching data from API:', error)
      })
  }, [])
  const selectedKey = window.location.pathname

  const renderContent = () => {
    switch (selectedKey) {
      case '/dashboard':
        return <DashboardContent />
      case '/product-management':
        return <ProductManagementContent />
      case '/user-management':
        return <UserManagementContent />
      case '/category-management':
        return <CategoryManagementContent />
      default:
        return <DashboardContent />
    }
  }

  const DashboardContent: React.FC = () => {
    return (
      <div>
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {selectedKeys.map((key) => {
                const menuItem = menuItems.find((item) => item.key === key)
                if (menuItem) {
                  return (
                    <Breadcrumb.Item key={menuItem.key}>
                      {menuItem.title}
                    </Breadcrumb.Item>
                  )
                }
                return null
              })}
            </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <div className="dasdboard_admin" >
              <Row gutter={16}>
                <Col className="col col__user" span={8}>
                  <Statistic
                    title="User"
                    value={42344}
                    prefix={<UserOutlined />}
                    style={{
                      color: 'purple',
                      backgroundColor: 'rgb(242, 238, 157)',
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                      textAlign: 'center'
                    }}
                  />
                </Col>
                <Col className="col col__product" span={8}>
                  <Statistic
                    title="Product"
                    // gọi API cho hàm Statistic
                    value={userData.length}
                    precision={2}
                    prefix={<ShoppingCartOutlined />}
                    style={{
                      color: 'blue',
                      backgroundColor: 'rgba(173, 216, 230, 0.25)',
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                      textAlign: 'center'
                    }}
                  />
                </Col>
                <Col className="col col__order" span={8}>
                  <Statistic
                    title="Order"
                    value={1193}
                    precision={2}
                    prefix={<DollarOutlined />}
                    style={{
                      color: 'green',
                      backgroundColor: 'rgba(0, 255, 0, 0.25)',
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                      textAlign: 'center'
                    }}
                  />
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </div>
    )
  }

  const ProductManagementContent: React.FC = () => {
    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Product Management</Breadcrumb.Item>
        </Breadcrumb>
        <ProductTable />
      </>
    )
  }

  const CategoryManagementContent: React.FC = () => {
    // Nội dung của trang Category Management
    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Category Management</Breadcrumb.Item>
        </Breadcrumb>
        <Category />
      </>
    )
  }

  const UserManagementContent: React.FC = () => <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>User Management</Breadcrumb.Item>
        </Breadcrumb>
      </div>

  const selectedKeys = ['dashboard']
  const menuItems = [
    { key: 'dashboard', title: 'Dashboard' },
    { key: 'productManagement', title: 'Product Management' },
    { key: 'categoryManagement', title: 'Category Management' },
    { key: 'userManagement', title: 'User Management' }
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ padding: '10px' }} theme="dark">
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKey]}>
          <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
            <a href="/dashboard">Dashboard</a>
          </Menu.Item>
          <Menu.Item key="/product-management" icon={<ShoppingCartOutlined />}>
            <a href="/product-management">Product Management</a>
          </Menu.Item>
          <Menu.Item key="categoryManagement" icon={<AuditOutlined />}>
            <a href="/category-management">Category Management</a>
          </Menu.Item>
          <Menu.Item key="/user-management" icon={<UserOutlined />}>
            <a href="/user-management">User Management</a>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: 'rgb(171 220 133)', padding: 0 , borderRadius:"5px 5px 5px 5px"}} />
        <Content style={{ margin: '16px' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardPage