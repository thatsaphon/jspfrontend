import { Button } from '@chakra-ui/button'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay
} from '@chakra-ui/modal'
import axios from '../../config/axios'
import React from 'react'

function RemoveFromCartAlert({ fetchCart, handleSubmit, productId }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()
  const handleRemoveFromCart = async (data) => {
    await axios.put('/cart/user', { productId })
    onClose()
    fetchCart()
  }

  return (
    <>
      {/* <Button colorScheme="red" onClick={() => setIsOpen(true)}>
        Delete Customer
      </Button> */}
      <Button
        type="submit"
        size="sm"
        mt={2}
        size="xs"
        onClick={() => setIsOpen(true)}
      >
        นำออกจากรถเข็น
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              นำสินค้าออกจากรถเข็น
            </AlertDialogHeader>

            <AlertDialogBody>
              คุณต้องการนำสินค้าออกจากรถเข็นใช่หรือไม่
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleSubmit(handleRemoveFromCart)}
                ml={3}
              >
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default RemoveFromCartAlert
