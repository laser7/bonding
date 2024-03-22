import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react'

import { useState } from 'react'
import { useColor } from '../../../share/hook/use-color.hook'

interface BingoCellProps {
  selected: boolean
  onClick: () => void
  icon: string
  content: string
  key: number
}

const BingoCell: React.FC<BingoCellProps> = ({
  content,
  selected,
  onClick,
  icon,
  key,
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const colors = useColor()
  return (
    <Popover>
      <PopoverTrigger>
        <Box
          p={4}
          borderWidth='1px'
          borderColor='gray.200'
          bg={selected ? colors.highlight : 'white'}
          color={selected ? 'white' : 'black'}
          onClick={onClick}
          fontSize={23}
          onDoubleClick={() => setIsHovering(true)}
          _hover={{ bg: colors.onHover, cursor: 'pointer' }}
        >
          {icon}
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>{content}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default BingoCell
