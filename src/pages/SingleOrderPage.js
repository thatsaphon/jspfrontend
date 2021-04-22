import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import {
  Badge,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
  Wrap
} from '@chakra-ui/layout'
import axios from '../config/axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../component/layout/Header'
import { ProfileContext } from '../contexts/ProfileContextProvider'
import OrderItem from '../component/order/OrderItem'

function SingleOrderPage() {
  const params = useParams()
  const [order, setOrder] = useState({ TransactionItems: [] })
  const { profile } = useContext(ProfileContext)
  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get('/order/' + params.id)
      setOrder(res.data.order)
    }
    fetchOrder()
  }, [])
  return (
    <Box bg="gray.10">
      <Header />
      <Container maxW="container.md">
        <Heading fontSize="2xl">ตรวจสอบคำสั่งซื้อ</Heading>
        <Center>
          <Container
            maxW="container.md"
            bg="muted.200"
            border="black 1px solid"
            p={5}
            m={2}
            rounded="20px"
          >
            <Flex>
              <Box>
                <Flex mb={2}>
                  วันที่{' '}
                  <Text ml={2} fontWeight="semibold">
                    {order.createdAt && order.createdAt.slice(0, 10)}
                  </Text>
                </Flex>
                <Flex mb={2}>
                  หมายเลขคำสั่งซื้อ{' '}
                  <Text ml={2} fontWeight="semibold">
                    {order.id}
                  </Text>
                </Flex>
              </Box>
              <Spacer />
              <Box>
                <Badge
                  fontSize="sm"
                  bg="yellow.500"
                  fontWeight="normal"
                  px={2}
                  rounded="20px"
                  color="muted.100"
                >
                  รอตรวจสอบการชำระเงิน
                </Badge>
              </Box>
            </Flex>
            <Flex mb={5} wrap="wrap" direction="column">
              <Text>{`ชื่อ: ${order.firstName} ${order.surName}`}</Text>
              <Text>{`ที่อยู่: ${order.address}`}</Text>
            </Flex>
            {order.TransactionItems.map((item, index) => (
              <OrderItem key={item.id} item={item} product={item.Product} />
            ))}
            <Flex justify="flex-end" mt={3} align="baseline">
              <Text mr={4}>รวม</Text>
              <Text fontSize="lg" color="red.700" fontWeight="bold">
                {order.TransactionItems.reduce(
                  (acc, item) => (acc += item.quantity * item.unitPrice),
                  0
                )}
              </Text>
            </Flex>
          </Container>
        </Center>
        <form>
          <Flex>
            <FormControl>
              <Container maxW="md">
                <FormLabel _hover={{ cursor: 'pointer' }}>
                  <Flex align="end" justify="center">
                    <Flex>
                      <Button size="xs" as="button" mr={1}>
                        อัพโหลดสลิป
                      </Button>
                      <Text>:</Text>
                    </Flex>
                    <Text ml={2} noOfLines={1}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Asperiores, voluptate..jpg
                    </Text>
                  </Flex>
                </FormLabel>
              </Container>
              <Input type="file" hidden />
            </FormControl>
          </Flex>
          <Flex justify="center">
            <Button
              size="sm"
              bg="orangeMain.100"
              _hover={{ bg: 'orangeMain.200', boxShadow: 'md' }}
              _active={{ boxShadow: 'lg' }}
              mx={1}
            >
              ยืนยันการจ่ายเงิน
            </Button>
            <Button
              size="sm"
              // bg="gray.100"
              _hover={{ bg: 'gray.200', boxShadow: 'md' }}
              mx={1}
            >
              ยกเลิกคำสั่งซื้อ
            </Button>
          </Flex>
        </form>
      </Container>
    </Box>
  )
}

export default SingleOrderPage
