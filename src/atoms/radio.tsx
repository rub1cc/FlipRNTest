import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { Box, Text } from '@/atoms'
import { BoxProps } from '@shopify/restyle'
import { Theme } from '@/themes'

interface Props extends BoxProps<Theme> {
  isSelected: boolean
  onPress: (value: string) => void
  value: string
  label: string
}

const Radio = ({ isSelected, onPress, value, label, ...rest }: Props) => {
  const handlePress = useCallback(() => {
    onPress(value)
  }, [onPress, value])

  return (
    <Pressable onPress={handlePress}>
      <Box {...rest} px="sm" py="xxs" flexDirection="row" alignItems="center">
        <Box
          width={18}
          height={18}
          bg="primary"
          borderRadius="full"
          mr="sm"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width={12}
            height={12}
            bg={isSelected ? 'primary' : 'white'}
            borderRadius="full"
            borderWidth={2}
            borderColor="white"
          />
        </Box>
        <Text>{label}</Text>
      </Box>
    </Pressable>
  )
}

export default Radio
