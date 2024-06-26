import React from 'react'
import { Button, Text, Flex } from '@chakra-ui/react'

import { TodoAttributes } from '../../../share/interfaces/todoAttributes'
import { MdDeleteOutline } from 'react-icons/md'
import { useColor } from '../../../share/hook/use-color.hook'
import { FaHandSparkles } from 'react-icons/fa'
import { FaHandsClapping } from 'react-icons/fa6'
import { userState } from '../../../share/recoilStates/userState'
import { useRecoilValue } from 'recoil'
import db from '../../../firebase'
import { ref, update } from 'firebase/database'

const TodoRow: React.FC<{
  todo: TodoAttributes
  index: any
  handleRemoveTodo: (index: number) => void
  fetchTodoList: () => void
}> = ({ todo, index, handleRemoveTodo, fetchTodoList }) => {
  const colors = useColor()
  const userStatus = useRecoilValue(userState)

  const updateRow = (index: number, todo: TodoAttributes) => {
    const todoRef = ref(db, `todo/${index}`)

    update(todoRef, {
      ...todo,
    })
  }
  const addVote = () => {
    const strVotertoArray = todo.voter.split(',')
    if (!todo.voter.includes(userStatus.name)) {
      const voterList: string[] = strVotertoArray
      voterList.push(userStatus.name)
      updateRow(index, {
        ...todo,
        vote: todo.vote + 1,
        voter: voterList.toString(),
      })
      fetchTodoList()
    }
  }
  return (
    <Flex
      key={index}
      width='100%'
      borderWidth={1}
      bgColor={'white'}
      m={1}
      borderRadius={8}
      lineHeight={10}
      justifyContent='space-between'
    >
      <Flex p={3} flexDir='column' width='100%'>
        <Flex flexDir='row' justifyContent='space-between'>
          <Text fontSize={20} fontWeight={700} fontFamily='monospace'>
            {todo.title}
          </Text>
          <MdDeleteOutline
            size={30}
            onClick={() => handleRemoveTodo(index)}
            color={colors.highlight}
          />
        </Flex>

        <Text fontFamily='monospace'>{todo.description}</Text>
        <Flex w='100%' flexDir='row' justifyContent='space-between'>
          <Button
            size='xs'
            fontFamily='monospace'
            leftIcon={<FaHandSparkles size={18} color={colors.primaryColor} />}
            colorScheme={colors.primaryColor}
            variant='outline'
          >
            {todo.proposer}
          </Button>
          <Button
            size='xs'
            fontFamily='monospace'
            leftIcon={<FaHandsClapping size={18} color={colors.primaryColor} />}
            colorScheme={colors.primaryColor}
            variant='outline'
            fontSize={16}
            onClick={() => addVote()}
          >
            {todo.vote}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TodoRow
