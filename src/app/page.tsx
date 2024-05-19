'use client'
import Navbar from './components/Navbar'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Flex, useMediaQuery } from '@chakra-ui/react'
import TodoList from './components/TodoList'
import Login from './components/Login'
import { useRecoilValue } from 'recoil'
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
      backgroundImage="url('https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=2803&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
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
