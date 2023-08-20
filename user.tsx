/* eslint-disable prettier/prettier */
import { Avatar, Space, Table, Typography } from "antd"
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"

function User() {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setLoading(true)
    getUser().then((res) => {
      setDataSource(res.users)
      setLoading(false)
    });
  }, [])

  const columns = [
    {
      title: "Photo",
      dataIndex: "image",
      render: (link: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined) => {
        return <Avatar src={link} />
      }
    },
    {
      title: "First Name",
      dataIndex: "firstName"
    },
    {
      title: "Last Name",
      dataIndex: "lastName"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Phone",
      dataIndex: "phone"
    },
    {
      title: "Address",
      // eslint-disable-next-line prettier/prettier
      dataIndex: "address",
      render: (address: { address: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined; city: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined }) => {
        return (
          <span>
            {address.address}, {address.city}
          </span>
        )
      }
    }
  ]

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>User</Typography.Title>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5
        }}
      />
    </Space>
  )
}

export default User

async function getUser() {
  // TODO: Gọi API để lấy danh sách người dùng
  // Ví dụ:
  // eslint-disable-next-line prettier/prettier
  const response = await fetch("")
  const data = await response.json()
  return data
}