import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { AspectRatio, Box, Img, Square } from '@chakra-ui/react'
import React from 'react'

function ProductPictureSlider({ imgPath }) {
  return (
    <Box position="relative">
      <Img src={imgPath} alt="productPicture" />

      {/* <Box
        position="absolute"
        top="50%"
        left="0"
        bg="gray.200"
        opacity="50%"
        pl={1}
        pr={3}
        _hover={{ cursor: 'pointer', bg: 'gray.300', opacity: '100%' }}
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
      >
        <ArrowRightIcon />
      </Box> */}
    </Box>
  )
}

export default ProductPictureSlider
