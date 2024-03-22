'use client'
import Navbar from './components/Navbar'
import BingoGrid from './components/BingoGrid'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import TodoList from './components/TodoList'
import Login from './components/Login'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '../../share/recoilStates/userState'

export default function Page() {
  const NoSSR = dynamic(() => import('./components/BingoGrid'), { ssr: false })
  const userStatus = useRecoilValue(userState)
  const [renderPage, setRenderPage] = useState('bingo') //todolist, bingo

  return (
    <Flex
      flexDir={'column'}
      height='89rem'
      bgSize='cover'
      bgPosition='center'
      backgroundImage="url('https://media.istockphoto.com/id/1288526180/photo/4k-abstract-white-backgrounds.jpg?b=1&s=612x612&w=0&k=20&c=DoL2JfG_nI_UiB7RUQub2n3UDKpKJPhNhLLobJ47Flw=')"
    >
      <Navbar renderPage={renderPage} setRenderPage={setRenderPage} />
      <Flex width='96%' mt={8} justifyContent='center'>
        {!userStatus.name ? (
          <Login />
        ) : renderPage === 'todolist' ? (
          <TodoList />
        ) : (
          <NoSSR />
        )}
      </Flex>
    </Flex>
  )
}
