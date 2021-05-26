import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import axios from '../config/axios'
import React, { useEffect, useState } from 'react'
import Header from '../component/layout/Header'
import { useHistory } from 'react-router'

function AdminManageOrder() {
  const history = useHistory()
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState('WAITING_PAYMENT_APPROVAL')
  const [customer, setCustomer] = useState('')
  const [totalPage, setTotalPage] = useState([1])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get('/order?status=' + status + '&page=' + page)
      setOrders(res.data.orders)
      // setPage(1)
      const newTotalPage = [1]
      for (let i = 2; i <= Math.ceil(res.data.total / 10); i++) {
        newTotalPage.push(i)
      }
      setTotalPage(newTotalPage)
    }
    fetchOrders()
  }, [status, page])
  console.log(orders)
  return (
    <div>
      <Header />
      <Flex justify="center">
        <Container>
          <Flex align="center" justify="center" direction="column">
            <Breadcrumb>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink
                  href="#"
                  onClick={() => {
                    setStatus('')
                    setPage(1)
                  }}
                >
                  ทั้งหมด
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink
                  href="#"
                  onClick={() => {
                    setStatus('ORDERED')
                    setPage(1)
                  }}
                >
                  ยังไม่ได้ชำระเงิน
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink
                  href="#"
                  onClick={() => {
                    setStatus('WAITING_PAYMENT_APPROVAL')
                    setPage(1)
                  }}
                >
                  รอตรวจสอบการชำระเงิน
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink
                  href="#"
                  onClick={() => {
                    setStatus('PAYMENT_RECEIVED')
                    setPage(1)
                  }}
                >
                  ชำระเงินแล้ว
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink
                  href="#"
                  onClick={() => {
                    setStatus('CANCELLED')
                    setPage(1)
                  }}
                >
                  ยกเลิก
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>เลขที่</Th>
                <Th>วันที่</Th>
                <Th>ลูกค้า</Th>
                <Th isNumeric>ยอดเงิน</Th>
                <Th>สถานะ</Th>
              </Tr>
            </Thead>
            <Tbody fontSize="sm">
              {orders.map((order, index) => (
                <Tr
                  key={index}
                  _hover={{ bg: 'gray.200', cursor: 'pointer' }}
                  onClick={() =>
                    history.push('/admin/manage/order/' + order.id)
                  }
                >
                  <Td>{order.id}</Td>
                  <Td>{order.date.slice(0, 10)}</Td>
                  <Td>
                    {order.User &&
                      order.User.firstName + ' ' + order.User.lastName}
                  </Td>
                  <Td isNumeric>
                    {order.TransactionItems &&
                      order.TransactionItems.reduce(
                        (acc, { quantity, unitPrice }) =>
                          (acc += +quantity * +unitPrice),
                        0
                      )}
                  </Td>
                  <Td>
                    {order.status === 'WAITING_PAYMENT_APPROVAL'
                      ? 'รอตรวจสอบการจ่ายเงิน'
                      : order.status === 'ORDERED'
                      ? 'ยังไม่ได้ชำระเงิน'
                      : order.status === 'CANCELLED'
                      ? 'ยกเลิก'
                      : 'สำเร็จ'}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex justify="center">
            {totalPage.map((item, index) =>
              page === item ? (
                <Button
                  key={index}
                  bg="orangeMain.200"
                  size="sm"
                  mx={0.5}
                  _hover={{ bg: 'orangeMain.200' }}
                >
                  {item}
                </Button>
              ) : (
                <Button
                  key={index}
                  size="sm"
                  mx={0.5}
                  onClick={() => setPage(+item)}
                >
                  {item}
                </Button>
              )
            )}
          </Flex>
        </Container>
      </Flex>
    </div>
  )
}

export default AdminManageOrder
