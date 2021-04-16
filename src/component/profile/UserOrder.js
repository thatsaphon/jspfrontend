import { Box, Flex, Grid, Spacer, Text } from '@chakra-ui/layout'
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
            <Text>{item.status}</Text>
          </Box>
        </Flex>
      ))}
    </>
  )
}

export default UserOrder
