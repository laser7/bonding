import { useColorModeValue } from '@chakra-ui/react'

export type colors = {
  primaryColor: string
  secondaryColor: string
  menuBackgroundColor: string
  textColor: string
  whiteBlackColor: string
  onHover: string
  mainBackground: string
  borderColor: string
  blurGray: string
  darkGray: string
  highlight: string
}

export function useColor(): colors {
  return {
    primaryColor: useColorModeValue('#A8A69B', '#442b48'),
    secondaryColor: '#000000',
    menuBackgroundColor: useColorModeValue('#F0F8FD', '#7d5c65'),
    textColor: useColorModeValue('#707070', '#a799b7'),
    whiteBlackColor: useColorModeValue('#ffffff', '#ffffff'),
    onHover: '#E8DFAD',
    mainBackground: useColorModeValue('white', 'gray.600'),
    borderColor: '#E6E6E6',
    blurGray: '#B9B9C4',
    darkGray: '#646460',
    highlight: '#F5E489',
  }
}
