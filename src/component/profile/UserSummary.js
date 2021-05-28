import { Box, Text } from '@chakra-ui/layout'
import React from 'react'

function UserSummary({ orders }) {
  const validOrder = orders.filter((item, index) => item.status !== 'CANCELLED')
  return (
    <Box>
      <Text>
        ยอดซื้อรวม:{' '}
        <Text as="span" fontWeight="semibold">
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
      </Text>
      <Text>
        ยังไม่ได้ชำระเงิน:{' '}
        <Text as="span" fontWeight="semibold">
          {validOrder.reduce(
            (total, order) =>
              order.status === 'ORDERED'
                ? (total += order.TransactionItems.reduce(
                    (acc, TransactionItem) =>
                      (acc +=
                        TransactionItem.unitPrice * TransactionItem.quantity),
                    0
                  ))
                : total,
            0
          )}
        </Text>
      </Text>
      <Text>
        รอตรวจสอบสลิป:{' '}
        <Text as="span" fontWeight="semibold">
          {validOrder.reduce(
            (total, order) =>
              order.status === 'WAITING_PAYMENT_APPROVAL'
                ? (total += order.TransactionItems.reduce(
                    (acc, TransactionItem) =>
                      (acc +=
                        TransactionItem.unitPrice * TransactionItem.quantity),
                    0
                  ))
                : total,
            0
          )}
        </Text>
      </Text>
      <Text>
        ชำระเงินแล้ว:{' '}
        <Text as="span" fontWeight="semibold">
          {validOrder.reduce(
            (total, order) =>
              order.status === 'PAYMENT_RECEIVED'
                ? (total += order.TransactionItems.reduce(
                    (acc, TransactionItem) =>
                      (acc +=
                        TransactionItem.unitPrice * TransactionItem.quantity),
                    0
                  ))
                : total,
            0
          )}
        </Text>
      </Text>
      <Text>
        กำลังจัดส่ง:{' '}
        <Text as="span" fontWeight="semibold">
          {validOrder.reduce(
            (total, order) =>
              order.status === 'SHIPED'
                ? (total += order.TransactionItems.reduce(
                    (acc, TransactionItem) =>
                      (acc +=
                        TransactionItem.unitPrice * TransactionItem.quantity),
                    0
                  ))
                : total,
            0
          )}
        </Text>
      </Text>
      <Text>
        สำเร็จ:{' '}
        <Text as="span" fontWeight="semibold">
          {validOrder.reduce(
            (total, order) =>
              order.status === 'COMPLETED'
                ? (total += order.TransactionItems.reduce(
                    (acc, TransactionItem) =>
                      (acc +=
                        TransactionItem.unitPrice * TransactionItem.quantity),
                    0
                  ))
                : total,
            0
          )}
        </Text>
      </Text>
    </Box>
  )
}

export default UserSummary
