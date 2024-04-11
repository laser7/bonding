import React, { useCallback, useEffect, useState } from 'react'
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
  Box,
} from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import TodoRow from './TodoRow'
import { TodoAttributes } from '../../../share/interfaces/todoAttributes'
import { userState } from '../../../share/recoilStates/userState'
import db from '../../../firebase'
import {
  getDatabase,
  ref,
  onValue,
  update,
  remove,
  set,
} from 'firebase/database'
import { useColor } from '../../../share/hook/use-color.hook'

const TodoList: React.FC = () => {
  const [todoStatus, setTodoStatus] = useState<any[]>([])
  const [titleInput, setTitleInput] = useState<string>('')
  const [descriptionInput, setDescriptionInput] = useState<string>('')
  const userStatus = useRecoilValue(userState)
  const [newProposal, setNewProposal] = useState<TodoAttributes>({
    title: '',
    description: '',
    proposer: userStatus.name,
    vote: 0,
    voter: '',
  })
  const fetchTodoList = useCallback(async () => {
    const dataRef = ref(db, '/todo')
    onValue(dataRef, (snapshot) => {
      const firebaseData = snapshot.val()
      setTodoStatus(firebaseData)
    })
  }, [db])

  useEffect(() => {
    fetchTodoList()

    // Clean up any resources if needed
    return () => {
      // Cleanup code
    }
  }, [fetchTodoList])
  const addItem = () => {
    const dataRef = ref(db, `/todo/${todoStatus.length}`)
    set(dataRef, {
      ...newProposal,
    })
  }

  const deleteItem = (index: number) => {
    const dataRef = ref(db, `/todo/${index}`)
    remove(dataRef)
  }

  useEffect(() => {
    setNewProposal({
      title: titleInput,
      description: descriptionInput,
      proposer: userStatus.name,
      vote: 0,
      voter: '',
    })
  }, [titleInput, descriptionInput])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const colors = useColor()
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
      {/* <Button colorScheme='beige' onClick={onOpen}>
        Add Todo
      </Button> */}
      <Box
        as='button'
        height='3rem'
        transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
        border='1px'
        px='8px'
        ml={1}
        borderRadius='7px'
        fontSize='16px'
        fontWeight='semibold'
        bg={colors.primaryColor}
        borderColor='#ccd0d5'
        onClick={onOpen}
        color='white'
        _hover={{ bg: colors.highlight }}
        _active={{
          bg: '#dddfe2',
          transform: 'scale(0.98)',
          borderColor: '#bec3c9',
        }}
        _focus={{
          boxShadow:
            '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
        }}
      >
        Add Todo
      </Box>
    </Flex>
  )
}

export default TodoList
