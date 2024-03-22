'use client'

import { ChakraProvider } from '@chakra-ui/react'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil'
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <ChakraProvider>{children}</ChakraProvider>
    </RecoilRoot>
  )
}
