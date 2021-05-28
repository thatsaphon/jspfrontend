import { Button } from '@chakra-ui/button'
import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { AspectRatio, Box, Container, Flex } from '@chakra-ui/layout'
import axios from '../config/axios'
import { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import Header from '../component/layout/Header'
import { Select } from '@chakra-ui/select'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/popover'
import { Portal } from '@chakra-ui/portal'
import { useHistory, useParams } from 'react-router'
import ProductPictureSlider from '../component/product/ProductPictureSlider'
import Icon from '@chakra-ui/icon'
import { GiCircle } from 'react-icons/gi'
import { BsCircleFill, BsTrash } from 'react-icons/bs'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

function AdminEditProduct() {
  const history = useHistory()
  const params = useParams()
  const [product, setProduct] = useState({})
  const { register, handleSubmit } = useForm()
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState('')
  console.log(file)
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedImg, setSelectedImg] = useState(0)

  const fetchCategory = async () => {
    const res = await axios.get('/product/category')
    console.log(res.data)
    setCategories(res.data.categories)
  }
  const fetchProduct = async () => {
    const res = await axios.get('/product/' + params.id)
    setProduct(res.data.product)
    console.log(res.data.product)
    setCategory(res.data.product.Category.name)
    setCode(res.data.product.code)
    setName(res.data.product.name)
    setDescription(res.data.product.description)
    setPrice(+res.data.product.price)
  }
  useEffect(() => {
    fetchProduct()
    fetchCategory()
  }, [])

  const handleEditProduct = async (e) => {
    try {
      e.preventDefault()
      const categoryId = categories.find((item) => category === item.name).id
      console.log(categoryId)
      const res = await axios.put('/product/' + params.id, {
        code,
        name,
        description,
        price,
        categoryId
      })
      history.push('/admin/manage/product')
    } catch (err) {
      console.dir(err)
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

  const handleDeleteImage = async () => {
    const res = await axios.delete(
      '/product/image/' + product.ProductImages[selectedImg].id
    )
    setSelectedImg(0)
    fetchProduct()
  }

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('image', file[0])
    // formData.append('fileName', file[0].name)
    console.log(file)
    console.log(formData)
    const res = await axios.post('/product/image/' + params.id, formData)
    fetchProduct()
  }

  const handleNextSlider = () => {
    if (selectedImg === product.ProductImages.length - 1) setSelectedImg(0)
    else setSelectedImg(selectedImg + 1)
  }
  const handleBackSlider = () => {
    if (selectedImg === 0) setSelectedImg(product.ProductImages.length - 1)
    else setSelectedImg(selectedImg - 1)
  }

  return (
    <Box>
      <Header />

      <Container bg="muted.300" p={5} rounded="20px">
        <form onSubmit={handleEditProduct}>
          <FormControl isRequired my={2}>
            <FormLabel>รหัสสินค้า</FormLabel>
            <Input
              //   {...register('code')}
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
              //   {...register('name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                {product.Category && (
                  <Select
                    // {...register('category')}
                    mr="10rem"
                    size="sm"
                    border="1px solid"
                    borderColor="gray.400"
                    bg="muted.100"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    // placeholder={
                    //   product.Category.code + '. ' + product.Category.name
                    // }
                  >
                    {categories.map((category, index) => (
                      <option key={categories.id}>{category.name}</option>
                    ))}
                  </Select>
                )}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              //   {...register('description')}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              //   {...register('price')}
              size="sm"
              border="1px solid"
              borderColor="gray.400"
              bg="muted.100"
              placeholder="ราคาขาย"
            />
            <FormErrorIcon />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <AspectRatio
            ratio={4 / 3}
            borderRadius="20px"
            bg="muted.200"
            overflow="hidden"
          >
            <Box>
              <ProductPictureSlider
                imgPath={
                  product.ProductImages &&
                  product.ProductImages[selectedImg] &&
                  product.ProductImages[selectedImg].imgPath
                }
              />
              <Box
                position="absolute"
                top="50%"
                left="0"
                bg="gray.200"
                opacity="50%"
                pl={1}
                pr={3}
                _hover={{ cursor: 'pointer', bg: 'gray.300', opacity: '100%' }}
                // onClick={() => setSelectedImg(selectedImg - 1)}
                onClick={handleBackSlider}
              >
                <ArrowLeftIcon />
              </Box>
              <Box
                position="absolute"
                top="50%"
                right="0"
                bg="gray.200"
                opacity="50%"
                pl={3}
                pr={1}
                _hover={{ cursor: 'pointer', bg: 'gray.300', opacity: '100%' }}
                // onClick={() => setSelectedImg(selectedImg + 1)}
                onClick={handleNextSlider}
              >
                <ArrowRightIcon />
              </Box>
              <Box
                position="absolute"
                top="0"
                right="0"
                bg="gray.200"
                p={2}
                opacity="50%"
                _hover={{ cursor: 'pointer', bg: 'gray.300', opacity: '100%' }}
                onClick={handleDeleteImage}
              >
                <Icon as={BsTrash} />
              </Box>
            </Box>
          </AspectRatio>
          <Flex justify="center" m={2}>
            {product.ProductImages &&
              product.ProductImages.map((image, index) =>
                selectedImg === index ? (
                  <Icon as={BsCircleFill} key={index} mx={0.5} />
                ) : (
                  <Icon
                    as={GiCircle}
                    key={index}
                    mx={0.5}
                    _hover={{ cursor: 'pointer' }}
                    onClick={() => setSelectedImg(index)}
                  />
                )
              )}
          </Flex>
          <FormControl my={2}>
            <FormLabel>อัพโหลดรูปภาพ</FormLabel>
            <Flex align="baseline">
              <Input
                onChange={(e) => setFile(e.target.files)}
                //   {...register('picture')}
                type="file"
                size="sm"
                border="1px solid"
                borderColor="gray.400"
                bg="muted.100"
                mr={2}
              />
              <Button
                mx={2}
                size="sm"
                bg="orange.100"
                _hover={{ bg: 'orange.200' }}
                onClick={handleUpload}
              >
                อัพโหลด
              </Button>
            </Flex>
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

export default AdminEditProduct
