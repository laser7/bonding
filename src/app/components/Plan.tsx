import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import db from '../../../firebase'
import { ref, onValue, remove, set } from 'firebase/database'
import { FaRegCalendarPlus } from 'react-icons/fa'
import { PlanAttributes } from '../../../share/interfaces/planAttribute'
import { VerticalTimeline } from 'react-vertical-timeline-component'
import SinglePlanCard from './SinglePlanCard'
import { useColor } from '../../../share/hook/use-color.hook'

const Plan: React.FC = () => {
  const colors = useColor()
  const [planStatus, setPlanStatus] = useState<any[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [titleInput, setTitleInput] = useState<string>('')
  const [typeInput, setTypeInput] = useState<string>('')
  const [dateInput, setDateInput] = useState<string>('')
  const [newProposal, setNewProposal] = useState<PlanAttributes>({
    title: '',
    date: '',
    type: '',
  })
  useEffect(() => {
    const fetchData = async () => {
      const dataRef = ref(db, '/plan')
      onValue(dataRef, (snapshot) => {
        setPlanStatus(snapshot.val())
      })
    }
    fetchData()
  }, [])
  useEffect(() => {
    setNewProposal({
      title: titleInput,
      date: dateInput,
      type: typeInput,
    })
  }, [titleInput, dateInput, typeInput])
  const addItem = () => {
    const dataRef = ref(db, `/plan/${planStatus.length}`)
    set(dataRef, {
      ...newProposal,
    })
  }
  const deleteItem = (plan: PlanAttributes) => {
    const index = planStatus.findIndex((item) => item === plan)
    const dataRef = ref(db, `/plan/${index - 1}`)
    remove(dataRef)
  }
  return (
    <Flex flexDir='column' justifyContent='space-between'>
      <Center marginY={5}>
        <Button w={'100%'} bgColor={colors.primaryColor} onClick={onOpen}>
          <FaRegCalendarPlus color='white' size={30} />
        </Button>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新的计划</ModalHeader>
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
              <FormLabel>类型</FormLabel>
              <Select
                placeholder='Select type'
                onChange={(e: any) => {
                  setTypeInput(e.target.value)
                }}
              >
                <option value='plan'>plan</option>
                <option value='countdown'>countdown</option>
              </Select>
              <FormLabel>日期</FormLabel>
              <Input
                placeholder='Select Date and Time'
                onChange={(e) => {
                  setDateInput(e.target.value)
                }}
                size='md'
                type='date'
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
      <Flex>
        <VerticalTimeline>
          {planStatus
            .sort(
              (a: PlanAttributes, b: PlanAttributes) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((plan, index) => {
              return (
                <SinglePlanCard
                  deleteItem={deleteItem}
                  key={index}
                  plan={plan}
                />
              )
            })}
        </VerticalTimeline>
      </Flex>
    </Flex>
  )
}

export default Plan
