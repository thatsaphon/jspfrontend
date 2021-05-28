import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Text,
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
  const [customerName, setCustomerName] = useState('')
  const [totalPage, setTotalPage] = useState([1])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(
        '/order?status=' +
          status +
          '&page=' +
          page +
          '&customer=' +
          customerName
      )
      setOrders(res.data.orders)
      // setPage(1)
      const newTotalPage = [1]
      for (let i = 2; i <= Math.ceil(res.data.total / 10); i++) {
        newTotalPage.push(i)
      }
      setTotalPage(newTotalPage)
    }
    fetchOrders()
  }, [status, page, customerName])
  return (
    <div>
      <Header />
      <Flex justify="center" my={2}>
        <Container maxW="container.lg">
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
                  รอตรวจสอบ
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
                    setStatus('SHIPED')
                    setPage(1)
                  }}
                >
                  ส่งสินค้าแล้ว
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink
                  href="#"
                  onClick={() => {
                    setStatus('COMPLETED')
                    setPage(1)
                  }}
                >
                  สำเร็จ
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
          <Flex p={2} my={2} align="baseline" justify="center">
            <Text fontSize="sm" mr={2}>
              ค้นหาตามลูกค้า:
            </Text>
            <Input
              size="sm"
              w="50%"
              onChange={(e) => setCustomerName(e.target.value)}
            />
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
                      ? 'รอตรวจสอบ'
                      : order.status === 'ORDERED'
                      ? 'ยังไม่ได้ชำระเงิน'
                      : order.status === 'CANCELLED'
                      ? 'ยกเลิก'
                      : order.status === 'PAYMENT_RECEIVED'
                      ? 'ได้รับเงินแล้วรอจัดส่ง'
                      : order.status === 'SHIPED'
                      ? 'จัดส่งแล้ว'
                      : 'สำเร็จ'}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex justify="center" my={2}>
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
