import { Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'

function OrderItem({ item, product }) {
  console.log(item)
  return (
    <Flex>
      <Text mr="1rem">1. </Text>
      <Text>{product.name}</Text>
      <Spacer />
      <Text mr={5} color="gray.500">
        {item.quantity}ชิ้น
      </Text>
      <Text color="red.500" fontWeight="semibold">
        {item.quantity * item.unitPrice}
      </Text>
    </Flex>
  )
}

export default OrderItem
