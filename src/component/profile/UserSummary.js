import { Box, Text } from '@chakra-ui/layout'
import React from 'react'

function UserSummary({ orders }) {
  const validOrder = orders.filter((item, index) => item.status !== 'CANCELLED')
  return (
    <Box>
      <Text>
        ยอดซื้อรวม{' '}
        {validOrder.reduce(
          (total, order) =>
            (total += order.TransactionItems.reduce(
              (acc, TransactionItem) =>
                (acc += TransactionItem.unitPrice * TransactionItem.quantity),
              0
            )),
          0
        )}
      </Text>
    </Box>
  )
}

export default UserSummary
