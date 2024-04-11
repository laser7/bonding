import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  Text,
  useEditableControls,
} from '@chakra-ui/react'
import { FaCheck, FaCheckCircle } from 'react-icons/fa'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useColor } from '../../../share/hook/use-color.hook'
import { useRecoilValue } from 'recoil'
import { userState } from '../../../share/recoilStates/userState'
import { BingoAttributes } from '../../../share/interfaces/bingoAttributes'
import { use, useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { set } from 'firebase/database'

interface BingoTableProps {
  selected: boolean
  icon: string
  content: string
  index: number
  editBingo: (index: number, bingo: BingoAttributes) => void
}

const BingoTable: React.FC<BingoTableProps> = ({
  content,
  selected,
  icon,
  index,
  editBingo,
}) => {
  const colors = useColor()
  const userStatus = useRecoilValue(userState)
  const [bingoStatus, setBingoStatus] = useState<BingoAttributes>({
    icon: icon,
    content: content,
    status: selected,
  })
  useEffect(() => {
    editBingo(index, bingoStatus)
  }, [bingoStatus])

  return (
    <Flex flexDir='row' justifyContent='space-between'>
      <Flex flexDir={'row'} gap={2}>
        <Text mt={1.5} fontFamily='monospace'>
          {index + 1 + '. '}
        </Text>

        <Editable
          isDisabled={userStatus.role !== 'admin'}
          onChange={(e) => {
            setBingoStatus({ ...bingoStatus, icon: e })
          }}
          value={bingoStatus.icon}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Editable
          isDisabled={userStatus.role !== 'admin'}
          fontSize='sm'
          onChange={(e) => {
            setBingoStatus({ ...bingoStatus, content: e })
          }}
          value={bingoStatus.content}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        {/* {userStatus.role === 'admin' && (
          <AiTwotoneEdit
            style={{ marginLeft: 4, marginTop: 4 }}
            color={colors.thirdColor}
            size={12}
          />
        )} */}
      </Flex>
      {bingoStatus.status && <FaCheckCircle color='black' />}
    </Flex>
  )
}

export default BingoTable
