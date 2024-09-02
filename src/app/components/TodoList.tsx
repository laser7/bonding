import React, { useCallback, useEffect, useState } from "react"
import {
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
} from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import TodoRow from "./TodoRow"
import { TodoAttributes } from "../../../share/interfaces/todoAttributes"
import { userState } from "../../../share/recoilStates/userState"
import db from "../../../firebase"
import { ref, onValue, remove, push, set } from "firebase/database"
import { useColor } from "../../../share/hook/use-color.hook"

const TodoList: React.FC = () => {
  const [todoStatus, setTodoStatus] = useState<any[]>([])
  const [titleInput, setTitleInput] = useState<string>("")
  const [descriptionInput, setDescriptionInput] = useState<string>("")
  const userStatus = useRecoilValue(userState)
  const [newProposal, setNewProposal] = useState<TodoAttributes>({
    title: "",
    description: "",
    proposer: userStatus.name,
    vote: 0,
    voter: "",
  })
  const fetchTodoList = useCallback(async () => {
    const dataRef = ref(db, "/todo")
    onValue(dataRef, (snapshot) => {
      const todos: TodoAttributes[] = []
      snapshot.forEach((childSnapshot) => {
        const todoData = childSnapshot.val() as Omit<TodoAttributes, "key">
        todos.push({
          key: childSnapshot.key || "",
          ...todoData,
        })
      })

      setTodoStatus(todos)
    })
  }, [db])

  useEffect(() => {
    fetchTodoList()
  }, [fetchTodoList])

  const addItem = () => {
    const dataRef = ref(db, "/todo")
    const newItemRef = push(dataRef)

    set(newItemRef, {
      ...newProposal,
      key: newItemRef.key,
    })
      .then(() => {
        console.log("Item added successfully")
        fetchTodoList()
      })
      .catch((error) => {
        console.error("Error adding item:", error)
      })
  }

  const deleteItem = (key: string) => {
    const dataRef = ref(db, `/todo/${key}`)
    remove(dataRef)
      .then(() => {
        console.log("Item removed successfully")
        fetchTodoList()
      })
      .catch((error) => {
        console.error("Error removing item:", error)
      })
  }

  useEffect(() => {
    setNewProposal({
      title: titleInput,
      description: descriptionInput,
      proposer: userStatus.name,
      vote: 0,
      voter: "",
    })
  }, [titleInput, descriptionInput])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const colors = useColor()
  return (
    <Flex w="97%" ml="3%" flexDir="column">
      {todoStatus.map((todo, index) => (
        <TodoRow
          key={todo.key}
          todo={todo}
          index={index}
          fetchTodoList={fetchTodoList}
          handleRemoveTodo={() => deleteItem(todo.key)}
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
                type="text"
              />
              <FormLabel>简介</FormLabel>
              <Input
                value={descriptionInput}
                onChange={(e) => {
                  setDescriptionInput(e.target.value)
                }}
                type="text"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={addItem}>
              提交
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        bgColor={colors.primaryColor}
        color={colors.highlight}
        onClick={onOpen}
      >
        Add Todo
      </Button>
    </Flex>
  )
}

export default TodoList
