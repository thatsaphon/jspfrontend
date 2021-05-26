import {
  Container,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import React from 'react'
import Header from '../component/layout/Header'

function AdminManageStock() {
  return (
    <div>
      <Header />
      <Flex>
        <Container
          maxW="container.lg"
          // m={10}
          // p={3}
          // border="1px solid black"
          // borderRadius="20px"
        >
          <Text as="h2" fontSize="lg" fontWeight="semibold">
            เพิ่มสินค้าเข้าคลังสินค้า
          </Text>
          <Flex>
            <Table
              size="sm"
              border="1px solid black"
              borderRadius="20px"
              fontSize="sm"
            >
              <Thead>
                <Tr>
                  <Th>ชื่อสินค้า</Th>
                  <Th isNumeric>จำนวน</Th>
                  <Th isNumeric>ต้นทุน</Th>
                  <Th isNumeric>รวม</Th>
                  <Th isNumeric></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td isNumeric>1</Td>
                  <Td isNumeric>1</Td>
                  <Td isNumeric>1</Td>
                  <Td isNumeric>ลบ</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th isNumeric>รวมทั้งหมด</Th>
                  <Th isNumeric>xxx</Th>
                  <Th></Th>
                </Tr>
              </Tfoot>
            </Table>
          </Flex>
        </Container>
      </Flex>
    </div>
  )
}

export default AdminManageStock
