import { Badge, Box, Flex, Grid, Spacer, Text } from '@chakra-ui/layout'
import { useHistory } from 'react-router-dom'

function UserOrder({ orders }) {
  const history = useHistory()
  return (
    <>
      {orders.map((item, index) => (
        <Flex
          border="1px solid"
          borderColor="blueMain.200"
          fontSize="sm"
          p={3}
          mb={2}
          align="center"
          rounded="20px"
          key={item.id}
          onClick={() => history.push('/order/' + item.id)}
        >
          <Grid gridGap={2}>
            <Text>หมายเลขคำสั่งซื้อ {item.id}</Text>
            <Text>
              <Text>วันที่สั่งซื้อ {item.createdAt.slice(0, 10)} </Text>
            </Text>
          </Grid>
          <Spacer />
          <Box>
            <Text textAlign="end">
              {item.TransactionItems.reduce(
                (acc, transactionItem) =>
                  (acc += transactionItem.quantity * transactionItem.unitPrice),
                0
              )}
            </Text>
            {item.status === 'ORDERED' && (
              <Badge
                fontSize="sm"
                bg="yellow.500"
                fontWeight="normal"
                px={2}
                rounded="20px"
                color="muted.100"
              >
                ยังไม่ได้ชำระเงิน
              </Badge>
            )}
            {item.status === 'CANCELLED' && (
              <Badge
                fontSize="sm"
                bg="red.500"
                fontWeight="normal"
                px={2}
                rounded="20px"
                color="muted.100"
              >
                คำสั่งซื้อถูกยกเลิก
              </Badge>
            )}
            {item.status === 'WAITING_PAYMENT_APPROVAL' && (
              <Badge
                fontSize="sm"
                bg="blue.500"
                fontWeight="normal"
                px={2}
                rounded="20px"
                color="muted.100"
              >
                รอตรวจสอบสลิป
              </Badge>
            )}
            {item.status === 'PAYMENT_RECEIVED' && (
              <Badge
                fontSize="sm"
                bg="green.400"
                fontWeight="normal"
                px={2}
                rounded="20px"
                color="muted.100"
              >
                ได้รับเงินแล้ว
              </Badge>
            )}
            {item.status === 'SHIPED' && (
              <Badge
                fontSize="sm"
                bg="green.300"
                fontWeight="normal"
                px={2}
                rounded="20px"
                color="muted.100"
              >
                จัดส่งแล้ว
              </Badge>
            )}
            {item.status === 'COMPLETED' && (
              <Badge
                fontSize="sm"
                bg="green.500"
                fontWeight="normal"
                px={2}
                rounded="20px"
                color="muted.100"
              >
                สำเร็จ
              </Badge>
            )}
          </Box>
        </Flex>
      ))}
    </>
  )
}

export default UserOrder
