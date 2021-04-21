import { Button } from '@chakra-ui/button'
import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Box, Container, Flex } from '@chakra-ui/layout'
import axios from '../config/axios'
import { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import Header from '../component/layout/Header'
import { Select } from '@chakra-ui/select'
import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList
} from '@chakra-ui/menu'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/popover'
import { Portal } from '@chakra-ui/portal'

function AdminCreateProduct() {
  const { register, handleSubmit } = useForm()
  const [name, setName] = useState('')
  const [file, setFile] = useState('')
  const handleCreateProduct = async (data) => {
    console.log(data)
    try {
      const formData = new FormData()
      formData.append('image', data.picture[0])
      formData.append('fileName', data.picture[0].name)
      formData.append('code', data.code)
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('categoryId', data.categoryId)
      formData.append('price', data.price)
      const res = await axios.post('/product/upload', formData)
      // const res = await axios.post('/product', { ...data })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  const handleCreateCategory = async (data) => {
    console.log(data)
    const res = await axios.post('/product/category', {
      code: data.categoryCode,
      name: data.categoryName
    })

    fetchCategory()
  }
  const [categories, setCategories] = useState([])
  const fetchCategory = async () => {
    const res = await axios.get('/product/category')
    console.log(res.data)
    setCategories(res.data.categories)
  }
  useEffect(() => {
    fetchCategory()
  }, [])
  return (
    <Box>
      <Header />
      <Container bg="muted.300" p={5} rounded="20px">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <FormControl isRequired my={2}>
            <FormLabel>รหัสสินค้า</FormLabel>
            <Input
              {...register('code')}
              size="sm"
              border="1px solid"
              borderColor="gray.400"
              bg="muted.100"
              placeholder="รหัสสินค้า"
            />
            <FormErrorIcon />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl isRequired my={2}>
            <FormLabel>ชื่อสินค้า</FormLabel>
            <Input
              {...register('name')}
              size="sm"
              border="1px solid"
              borderColor="gray.400"
              bg="muted.100"
              placeholder="ชื่อสินค้า"
            />
            <FormErrorIcon />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl isRequired my={2}>
            <FormLabel>หมวดสินค้า</FormLabel>
            <Popover>
              <InputGroup d="flex" alignContent="baseline" size="md">
                <Select
                  {...register('categoryId')}
                  mr="10rem"
                  size="sm"
                  border="1px solid"
                  borderColor="gray.400"
                  bg="muted.100"
                  placeholder="หมวดสินค้า"
                  defaultValue="0"
                >
                  {categories.map((category, index) => (
                    <option value={category.id} key={categories.id}>
                      {category.code}. {category.name}
                    </option>
                  ))}
                </Select>
                <InputRightElement width="10rem" h="32px">
                  <PopoverTrigger>
                    <Button h="32px" size="xs">
                      เพิ่มหมวดสินค้า
                    </Button>
                  </PopoverTrigger>

                  <Portal>
                    <PopoverContent
                      bg="muted.100"
                      border="1px solid black"
                      rounded="20px"
                      p={2}
                      w={200}
                    >
                      <PopoverHeader>เพิ่มหมวดสินค้า</PopoverHeader>
                      <form>
                        <Input
                          {...register('categoryCode')}
                          bg="muted.100"
                          placeholder="รหัสหมวดสินค้า"
                          size="xs"
                        />
                        <Input
                          {...register('categoryName')}
                          bg="muted.100"
                          placeholder="ชื่อหมวดสินค้า"
                          size="xs"
                        />
                        <Flex justify="center">
                          <Button
                            onClick={handleSubmit(handleCreateCategory)}
                            size="xs"
                          >
                            ยืนยัน
                          </Button>
                        </Flex>
                      </form>
                    </PopoverContent>
                  </Portal>
                </InputRightElement>
              </InputGroup>
            </Popover>
            <FormErrorIcon />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl isRequired my={2}>
            <FormLabel>รายละเอียดสินค้า</FormLabel>
            <Input
              {...register('description')}
              size="sm"
              border="1px solid"
              borderColor="gray.400"
              bg="muted.100"
              placeholder="รายละเอียดสินค้า"
            />
            <FormErrorIcon />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl isRequired my={2}>
            <FormLabel>ราคาขาย</FormLabel>
            <Input
              {...register('price')}
              size="sm"
              border="1px solid"
              borderColor="gray.400"
              bg="muted.100"
              placeholder="ราคาขาย"
            />
            <FormErrorIcon />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl my={2}>
            <FormLabel>อัพโหลดรูปภาพ</FormLabel>
            <Input
              {...register('picture')}
              type="file"
              size="sm"
              border="1px solid"
              borderColor="gray.400"
              bg="muted.100"
              // placeholder="อัพโหลดรูปภาพ"
            />
            <FormErrorIcon />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <Flex justify="center">
            <Button
              type="submit"
              bg="blueMain.100"
              _hover={{ bg: 'blueMain.200' }}
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Container>
    </Box>
  )
}

export default AdminCreateProduct
