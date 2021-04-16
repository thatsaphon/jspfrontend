import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

function RemoveAllFromCartButton({ fetchCart, axios }) {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()
  const handleRemoveAllFromCart = async () => {
    await axios.delete('/cart/user')
    onClose()
    fetchCart()
  }

  return (
    <>
      <Button
        _hover={{ boxShadow: 'md' }}
        _active={{ boxShadow: 'lg' }}
        onClick={() => setIsOpen(true)}
      >
        นำสินค้าออกจากรถเข็นทั้งหมด
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              นำสินค้าออกจากรถเข็นทั้งหมด
            </AlertDialogHeader>
            <AlertDialogBody>
              คุณต้องการนำสินค้าออกจากรถเข็นทั้งหมดใช่หรือไม่
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                ยกเลิก
              </Button>
              <Button
                colorScheme="red"
                onClick={handleRemoveAllFromCart}
                ml={3}
              >
                นำสินค้าออกจากรถเข็นทั้งหมด
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default RemoveAllFromCartButton
