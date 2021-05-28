import {
  Box,
  Button,
  Container,
  Flex,
  Img,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import axios from '../config/axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../component/layout/Header'

function AdminManageSingleOrder() {
  const params = useParams()
  const [order, setOrder] = useState({})
  const fetchOrder = async () => {
    const res = await axios.get('/order/' + params.id)
    setOrder(res.data.order)
    console.log(res.data.order)
  }
  useEffect(() => {
    fetchOrder()
  }, [])

  const handleChangeStatus = async (status) => {
    try {
      await axios.put('/order/' + params.id, {
        status
      })
      fetchOrder()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Header />
      <Flex justify="center" align="center" direction="column">
        <Container maxW="container.lg" p={2}>
          <Text as="h2" fontSize="xl" fontWeight="semibold">
            จัดการคำสั่งซื้อ
          </Text>
        </Container>
        <Container maxW="container.md" fontSize="sm">
          <Flex>
            <Box w="50%">
              <Text>ชื่อ: {order.firstName + ' ' + order.surName}</Text>
              <Text>ที่อยู่: {order.address}</Text>
            </Box>
            <Spacer />
            <Box w="40%">
              <Text>เลขที่: {order.id}</Text>
              <Text>วันที่: {order.date && order.date.slice(0, 10)}</Text>
              <Text>
                สถานะ:{' '}
                {order.status === 'WAITING_PAYMENT_APPROVAL'
                  ? 'รอตรวจสอบการจ่ายเงิน'
                  : order.status === 'ORDERED'
                  ? 'ยังไม่ได้ชำระเงิน'
                  : order.status === 'CANCELLED'
                  ? 'ยกเลิก'
                  : order.status === 'PAYMENT_RECEIVED'
                  ? 'ได้รับเงินแล้วรอจัดส่ง'
                  : order.status === 'SHIPED'
                  ? 'จัดส่งแล้ว'
                  : 'สำเร็จ'}
              </Text>
            </Box>
          </Flex>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>ลำดับที่</Th>
                <Th>ชื่อสินค้า</Th>
                <Th isNumeric>จำนวน</Th>
                <Th isNumeric>ราคาต่อหน่วย</Th>
                <Th isNumeric>รวม</Th>
              </Tr>
            </Thead>
            <Tbody>
              {order.TransactionItems &&
                order.TransactionItems.map((item, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{item.Product.name}</Td>
                    <Td isNumeric>{+item.quantity}</Td>
                    <Td isNumeric>{+item.unitPrice}</Td>
                    <Td isNumeric>{item.unitPrice * item.quantity}</Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th></Th>
                <Th isNumeric>รวม</Th>
                <Th isNumeric>
                  {order.TransactionItems &&
                    order.TransactionItems.reduce(
                      (acc, item) => (acc += item.unitPrice * item.quantity),
                      0
                    )}
                </Th>
              </Tr>
            </Tfoot>
          </Table>
          <Flex align="center" direction="column">
            <Img src={order.slipPath} m={2} />
            {(order.status === 'WAITING_PAYMENT_APPROVAL' ||
              order.status === 'ORDERED') && (
              <Button
                size="sm"
                bg="orangeMain.100"
                _hover={{ bg: 'orangeMain.200' }}
                m={2}
                onClick={() => handleChangeStatus('PAYMENT_RECEIVED')}
              >
                ยืนยันการรับชำระเงิน
              </Button>
            )}
            {order.status === 'PAYMENT_RECEIVED' && (
              <Button
                size="sm"
                bg="orangeMain.100"
                _hover={{ bg: 'orangeMain.200' }}
                m={2}
                onClick={() => handleChangeStatus('SHIPED')}
              >
                จัดส่งสินค้า
              </Button>
            )}
            {order.status === 'SHIPED' && (
              <Button
                size="sm"
                bg="orangeMain.100"
                _hover={{ bg: 'orangeMain.200' }}
                m={2}
                onClick={() => handleChangeStatus('COMPLETED')}
              >
                สำเร็จ
              </Button>
            )}

            {order.status === 'CANCELLED' && (
              <Button
                size="sm"
                bg="red.300"
                _hover={{ bg: 'red.400' }}
                m={2}
                onClick={() => handleChangeStatus('ORDERED')}
              >
                Activate
              </Button>
            )}

            {order.status !== 'CANCELLED' && (
              <Button
                size="sm"
                bg="red.300"
                _hover={{ bg: 'red.400' }}
                m={2}
                onClick={() => handleChangeStatus('CANCELLED')}
              >
                ยกเลิก
              </Button>
            )}
          </Flex>
        </Container>
      </Flex>
    </div>
  )
}

export default AdminManageSingleOrder
