'use client'
import Navbar from './components/Navbar'
import BingoGrid from './components/BingoGrid'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Flex, useMediaQuery } from '@chakra-ui/react'
import TodoList from './components/TodoList'
import Login from './components/Login'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '../../share/recoilStates/userState'
import Plan from './components/Plan'
import 'react-vertical-timeline-component/style.min.css'

export default function Page() {
  const NoSSR = dynamic(() => import('./components/BingoGrid'), { ssr: false })
  const userStatus = useRecoilValue(userState)
  const [renderPage, setRenderPage] = useState('bingo') //todolist, bingo
  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)')
  return (
    <Flex
      flexDir={'column'}
      height={isSmallerThan768 ? '115rem' : '93rem'}
      bgSize='cover'
      bgPosition='center'
      backgroundImage="url('https://img.freepik.com/free-photo/white-fabric-texture-background-design-element_53876-107985.jpg?w=1800&t=st=1712841570~exp=1712842170~hmac=09c5552f87ad8e330af3956cb513f6d89343000c7a86388e40be316846ef158d')"
    >
      <Navbar renderPage={renderPage} setRenderPage={setRenderPage} />
      <Flex width='96%' mt={8} justifyContent='center'>
        {!userStatus.name ? (
          <Login />
        ) : renderPage === 'todolist' ? (
          <TodoList />
        ) : renderPage === 'bingo' ? (
          <NoSSR />
        ) : (
          <Plan />
        )}
      </Flex>
    </Flex>
  )
}
