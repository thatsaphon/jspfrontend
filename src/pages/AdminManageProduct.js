import { Container, Flex, Spacer, Text, Wrap } from '@chakra-ui/layout'
import axios from '../config/axios'
import React, { useEffect, useState } from 'react'
import Header from '../component/layout/Header'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { useHistory } from 'react-router'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

function AdminManageProduct() {
  const history = useHistory()
  const [products, setProducts] = useState([])
  const [totalPage, setTotalPage] = useState([1])
  const [selectedPage, setSelectedPage] = useState(1)
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/product')
      setProducts(res.data.products)
      const newTotalPage = [1]
      for (let i = 2; i <= res.data.totalPage; i++) {
        newTotalPage.push(i)
      }
      setTotalPage(newTotalPage)
    }
    fetchProducts()
  }, [])
  const handleSearchChange = async (e) => {
    const res = await axios.get('/product?name=' + e.target.value)
    setProducts(res.data.products)
    const newTotalPage = [1]
    for (let i = 2; i <= res.data.totalPage; i++) {
      newTotalPage.push(i)
    }
    setTotalPage(newTotalPage)
    setSelectedPage(1)
  }
  return (
    <div>
      <Header />
      <Container maxW="container.lg" p={5} rounded="20px" bg="muted.200">
        <Container maxW="container.md">
          <Text as="h2" fontSize="xl" fontWeight="semibold">
            หน้าจัดการสินค้า
          </Text>
        </Container>
        <Container maxW="container.lg">
          <Wrap justify="center">
            <Button
              bg="blueMain.100"
              _hover={{ bg: 'blueMain.200' }}
              onClick={() => history.push('/admin/create/product')}
            >
              สร้างสินค้าใหม่
            </Button>
            <Spacer />
            <Flex align="baseline" justify="flex-end" my={2}>
              <Text fontSize="lg" mr={2}>
                ค้นหา:
              </Text>
              <Input
                size="sm"
                bg="muted.100"
                maxW={200}
                onChange={(e) => handleSearchChange(e)}
              />
            </Flex>
          </Wrap>
        </Container>

        <Flex>
          <Table size="sm" fontSize="sm">
            <Thead>
              <Th>รหัส</Th>
              <Th>ชื่อ</Th>
              <Th isNumeric>คงเหลือ</Th>
              <Th isNumeric>ราคาขาย</Th>
              <Th isNumeric>ราคาซื้อล่าสุด</Th>
              <Th></Th>
            </Thead>
            <Tbody>
              {products.map((product, index) => (
                <Tr
                  key={index}
                  onClick={() =>
                    history.push('/admin/manage/product/' + product.id)
                  }
                  _hover={{ bg: 'gray.200' }}
                >
                  <Td>{product.code}</Td>
                  <Td>{product.name}</Td>
                  <Td isNumeric>
                    {product.TransactionItems &&
                      product.TransactionItems.reduce(
                        (acc, item) =>
                          item.Transaction.type === 'SALES'
                            ? (acc += -1 * item.quantity)
                            : (acc += +item.quantity),
                        0
                      )}
                  </Td>
                  <Td isNumeric>{+product.price}</Td>
                  <Td isNumeric>{+product.avgCost || 0}</Td>
                  <Td></Td>
                </Tr>
                // <Box
                //   key={index}
                //   w="300px"
                //   rounded="20px"
                //   overflow="hidden"
                //   bg="muted.300"
                // >
                //   <Center w="300px" h="150px" overflow="hidden">
                //   </Center>
                //   <Box px={5} py={2}>
                //     <Flex align="baseline">
                //       <Badge
                //         variant="solid"
                //         bg="orangeMain.200"
                //         rounded="full"
                //         px="2"
                //         my={2}
                //         fontWeight="normal"
                //       >
                //         จำนวนคงเหลือ{' '}
                //         {product.TransactionItems &&
                //           product.TransactionItems.reduce(
                //             (acc, item) =>
                //               item.Transaction.type === 'SALES'
                //                 ? (acc += -1 * item.quantity)
                //                 : (acc += +item.quantity),
                //             0
                //           )}
                //       </Badge>
                //       {console.log(product)}
                //     </Flex>
                //     <Flex align="flex-end">
                //       <Box>
                //         <Text fontSize="sm">{product.name}</Text>
                //         <Text fontSize="sm">{product.description}</Text>
                //         <Text fontSize="sm">ราคา {+product.price} บาท</Text>
                //       </Box>
                //       <Spacer />
                //       <Box>
                //         <Button
                //           size="sm"
                //           bg="orangeMain.100"
                //           _hover={{ bg: 'orangeMain.200' }}
                //           w={16}
                //         >
                //           แก้ไข
                //         </Button>
                //       </Box>
                //     </Flex>
                //     <Flex align="flex-end">
                //       <Box w="50%">
                //         <Flex>
                //           <Text fontSize="sm" w={12}>
                //             จำนวน
                //           </Text>
                //           <Input
                //             type="number"
                //             size="xs"
                //             w={16}
                //             bg="muted.100"
                //             border="1px solid black"
                //           />
                //         </Flex>
                //         <Flex>
                //           <Text fontSize="sm" w={12}>
                //             ทุน
                //           </Text>
                //           <Input
                //             type="number"
                //             size="xs"
                //             w={16}
                //             bg="muted.100"
                //             border="1px solid black"
                //           />
                //         </Flex>
                //       </Box>
                //       <Spacer />
                //       <Button
                //         size="sm"
                //         bg="blueMain.100"
                //         w={16}
                //         _hover={{ bg: 'blueMain.200' }}
                //       >
                //         เพิ่ม
                //       </Button>
                //     </Flex>
                //   </Box>
                // </Box>
              ))}
            </Tbody>
          </Table>
        </Flex>
        <Flex justify="center">
          {totalPage.map((page, index) => (
            <Button
              key={'page' + page}
              bg={selectedPage === page ? 'orangeMain.100' : ''}
              _hover={{ bg: selectedPage === page ? 'orangeMain.200' : '' }}
            >
              {page}
            </Button>
          ))}
        </Flex>
      </Container>
    </div>
  )
}

export default AdminManageProduct
