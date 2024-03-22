import { Flex, Text } from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'

interface BingoTableProps {
  selected: boolean
  icon: string
  content: string
  key: number
  index: number
}

const BingoTable: React.FC<BingoTableProps> = ({
  content,
  selected,
  icon,
  key,
  index,
}) => {
  return (
    <Flex flexDir='row' justifyContent='space-between'>
      <Text fontFamily='monospace'>
        {index + 1 + '. ' + icon + ' ' + content}
      </Text>

      {selected && <FaCheckCircle color='black' />}
    </Flex>
  )
}

export default BingoTable
