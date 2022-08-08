import React from 'react'
import { Box, Text } from '@/atoms'
import { Theme } from '@/themes'
import { BoxProps, TextProps } from '@shopify/restyle'
import { useMemo } from 'react'

interface Props {
  variant: 'SUCCESS' | 'PENDING'
}

interface BadgeStyle {
  container: BoxProps<Theme>
  text: TextProps<Theme>
}

const Badge: React.FC<Props> = ({ variant }) => {
  const baseStyle: BoxProps<Theme> = {
    borderWidth: 2,
    px: 'sm',
    py: 'xxs',
    borderRadius: 'xs'
  }

  const baseTextStyle: TextProps<Theme> = {
    fontWeight: 'bold',
    fontSize: 14
  }

  const badgeStyle: BadgeStyle = useMemo(() => {
    return {
      SUCCESS: {
        container: {
          ...baseStyle,
          bg: 'accentSuccess',
          borderColor: 'accentSuccess'
        },
        text: {
          ...baseTextStyle,
          color: 'white'
        }
      },
      PENDING: {
        container: {
          ...baseStyle,
          bg: 'white',
          borderColor: 'accentPending'
        },
        text: {
          ...baseTextStyle,
          color: 'black'
        }
      }
    }[variant]
  }, [variant])

  const badgeLabel = useMemo(() => {
    switch (variant) {
      case 'SUCCESS':
        return 'Berhasil'
      default:
        return 'Pengecekan'
    }
  }, [variant])

  return (
    <Box {...badgeStyle.container}>
      <Text {...badgeStyle.text}>{badgeLabel}</Text>
    </Box>
  )
}

export default Badge
