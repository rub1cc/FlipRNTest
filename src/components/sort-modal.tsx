import { Box, Radio } from '@/atoms'
import { Theme } from '@/themes'
import { SORT_OPTIONS } from '@/utils/constants'
import { BoxProps } from '@shopify/restyle'
import React, { useCallback } from 'react'
import { Modal } from 'react-native'

interface Props {
  selectedOption: string
  isShow: boolean
  onChange: (option: string) => void
}

const SortModal = ({ isShow, selectedOption, onChange }: Props) => {
  const renderOptions = useCallback(() => {
    const options = Object.values(SORT_OPTIONS)

    return options.map((option, index) => {
      const styles: BoxProps<Theme> = {
        mt: index > 0 ? 'lg' : 'none'
      }
      return (
        <Radio
          key={option.value}
          label={option.label}
          value={option.value}
          onPress={onChange}
          isSelected={selectedOption === option.value}
          {...styles}
        />
      )
    })
  }, [onChange, selectedOption])

  return (
    <Modal visible={isShow} transparent animationType="fade">
      <Box
        bg="modalOverlayBackground"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Box bg="white" width="80%" borderRadius="xs" px="lg" py="xl">
          {renderOptions()}
        </Box>
      </Box>
    </Modal>
  )
}

export default SortModal
