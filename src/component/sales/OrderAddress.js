import { Box, Input, Text, Textarea } from '@chakra-ui/react'
import React from 'react'
// import { useForm } from 'react-hook-form'

function OrderAddress({ profile, register }) {
  return (
    <Box>
      <Text mr={2}>ชื่อจริง</Text>
      <Input
        {...register('firstName')}
        size="xs"
        borderColor="primary.200"
        _focus={{ borderColor: 'blueMain.200' }}
        defaultValue={profile.firstName}
      />
      <Text mr={2}>นามสกุล</Text>
      <Input
        {...register('surName')}
        size="xs"
        borderColor="primary.200"
        _focus={{ borderColor: 'blueMain.200' }}
        defaultValue={profile.lastName}
      />
      <Text mr={2}>โทร</Text>
      <Input
        {...register('phone')}
        size="xs"
        borderColor="primary.200"
        _focus={{ borderColor: 'blueMain.200' }}
        defaultValue={profile.phoneNumber}
      />
      <Text mr={2}>อีเมล</Text>
      <Input
        {...register('email')}
        size="xs"
        borderColor="primary.200"
        _focus={{ borderColor: 'blueMain.200' }}
        defaultValue={profile.email}
      />
      <Text>ที่อยู่</Text>
      <Textarea
        {...register('address')}
        size="xs"
        borderColor="primary.200"
        _focus={{ borderColor: 'blueMain.200' }}
        defaultValue={`${profile.textAddress || ''} ${
          profile.subDistrict || ''
        } ${profile.district || ''} ${profile.province || ''} ${
          profile.postCode || ''
        }`}
      />
    </Box>
  )
}

export default OrderAddress
