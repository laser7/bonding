import React, { useEffect, useState } from 'react'
import {
  VStack,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Flex,
} from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { todoState } from '../../../share/recoilStates/todoState'
import TodoRow from './TodoRow'
import { TodoAttributes } from '../../../share/interfaces/todoAttributes'
import { userState } from '../../../share/recoilStates/userState'

const TodoList: React.FC = () => {
  const [todoStatus, setTodoStatus] = useState<TodoAttributes[]>([])
  const [titleInput, setTitleInput] = useState<string>('')
  const [descriptionInput, setDescriptionInput] = useState<string>('')
  const userStatus = useRecoilValue(userState)
  const [newProposal, setNewProposal] = useState<TodoAttributes>({
    title: '',
    description: '',
    proposer: userStatus.name,
    vote: 0,
    voter: [],
  })

  const fetchTodoList = async () => {
    try {
      const response = await fetch('/api/todo')
      if (!response.ok) {
        throw new Error('Failed to fetch todo list')
      }
      const data = await response.json()
      setTodoStatus(data)
    } catch (error) {
      console.error('Error fetching todo list:', error)
    }
  }
  useEffect(() => {
    fetchTodoList()
  }, [])
  const deleteItem = async (index: number) => {
    try {
      const response = await fetch('/api/todo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index }), // Include index in the request body
      })
      if (!response.ok) {
        throw new Error('Failed to delete item')
      }
      fetchTodoList() // Refetch the todo list after deletion
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }
  const addItem = async () => {
    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ action: 'add', todo: newProposal }),
      })
      if (!response.ok) {
        throw new Error('Failed to add new item')
      }
      fetchTodoList() // Refetch the todo list after addition
    } catch (error) {
      console.error('Error adding new item:', error)
    }
  }

  useEffect(() => {
    setNewProposal({
      title: titleInput,
      description: descriptionInput,
      proposer: userStatus.name,
      vote: 0,
      voter: [],
    })
  }, [titleInput, descriptionInput])

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex w='97%' ml='3%' flexDir='column'>
      {todoStatus.map((todo, index) => (
        <TodoRow
          key={index}
          todo={todo}
          index={index}
          fetchTodoList={fetchTodoList}
          handleRemoveTodo={() => deleteItem(index)}
        />
      ))}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新的提案</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>标题</FormLabel>
              <Input
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value)
                }}
                type='text'
              />
              <FormLabel>简介</FormLabel>
              <Input
                value={descriptionInput}
                onChange={(e) => {
                  setDescriptionInput(e.target.value)
                }}
                type='text'
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={addItem}>
              提交
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button onClick={onOpen}>Add Todo</Button>
    </Flex>
  )
}

export default TodoList
