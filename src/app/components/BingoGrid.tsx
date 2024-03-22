// components/Bingo.tsx
import React, { useEffect, useState } from 'react'
import { Box, Flex, Grid, Text, useMediaQuery } from '@chakra-ui/react'

import { BingoAttributes } from '../../../share/interfaces/bingoAttributes'
import BingoCell from './BIngoCell'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { useColor } from '../../../share/hook/use-color.hook'
import BingoTable from './BingoTable'

const BingoGrid: React.FC = () => {
  const [selectedCells, setSelectedCells] = useState<boolean[][]>(
    new Array(5).fill(false).map(() => new Array(5).fill(false))
  )
  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)')
  const [bingoStatus, setBingoStatus] = useState<BingoAttributes[]>([])
  const colors = useColor()

  useEffect(() => {
    async function fetchBingoData() {
      try {
        const response = await fetch('/api/bingo') // Fetch data from the API route
        if (!response.ok) {
          throw new Error('Failed to fetch bingo list')
        }
        const data = await response.json() // Parse JSON response
        console.log('get dtata:', data)
        setBingoStatus(data)
      } catch (error) {
        console.error('Error fetching bingo list:', error)
      }
    }

    fetchBingoData() // Call the fetchData function when the component mounts
  }, [])
  const updateStatus = async (index: number, newStatus: boolean) => {
    try {
      const response = await fetch('/api/bingo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index, status: newStatus }), // Include index and new status in the request body
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      // If the status update is successful, update the bingoList state
      const updatedBingoList = [...bingoStatus]
      updatedBingoList[index].status = newStatus
      setBingoStatus(updatedBingoList)
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }
  const handleClick = (index: number, row: number, col: number) => {
    const newSelectedCells = [...selectedCells]
    newSelectedCells[row][col] = !newSelectedCells[row][col]
    setSelectedCells(newSelectedCells)

    let isBingo = false

    // Check if the current row is bingo
    if (newSelectedCells[row].every((selected) => selected)) {
      console.log(`Row ${row + 1} is bingo!`)
      isBingo = true
    }

    // Check if the current column is bingo
    if (newSelectedCells.every((cells) => cells[col])) {
      console.log(`Column ${col + 1} is bingo!`)
      isBingo = true
    }

    // Check if the diagonal from top-left to bottom-right is bingo
    if (row === col && newSelectedCells.every((cells, index) => cells[index])) {
      console.log(`Diagonal from top-left to bottom-right is bingo!`)
      isBingo = true
    }

    // Check if the diagonal from top-right to bottom-left is bingo
    if (
      row + col === 4 &&
      newSelectedCells.every((cells, index) => cells[4 - index])
    ) {
      console.log(`Diagonal from top-right to bottom-left is bingo!`)
      isBingo = true
    }

    if (isBingo) {
      console.log('Bingo!')
    }

    // setBingoStatus((prevStatus) => {
    //   const updatedStatus = [...prevStatus]
    //   updatedStatus[index] = {
    //     ...updatedStatus[index],
    //     status: !updatedStatus[index].status,
    //   }
    //   return updatedStatus
    // })
    updateStatus(index, !bingoStatus[index].status)
  }
  return (
    <Box overflowX={isSmallerThan768 ? 'auto' : 'unset'}>
      <Text fontWeight={500} fontFamily='monospace' fontSize={22}>
        BINGO
      </Text>
      <Grid
        templateColumns='repeat(5, 1fr)'
        gap={2}
        mt={5}
        borderWidth='1px'
        borderColor='gray.200'
        p={2}
      >
        {bingoStatus.map(({ content, status, icon }, index) => (
          <BingoCell
            icon={icon}
            key={index}
            content={content}
            selected={status}
            onClick={() => handleClick(index, Math.floor(index / 5), index % 5)}
          />
        ))}
      </Grid>
      <Flex flexDir='row' textColor={colors.darkGray}>
        <IoInformationCircleOutline />{' '}
        <Text fontFamily='monospace' fontSize={14}>
          点击勾选为完成，双击查看具体内容
        </Text>
      </Flex>
      <Text fontWeight={500} fontFamily='monospace' marginY={8} fontSize={22}>
        BINGO LIST
      </Text>
      {bingoStatus.map((bingo, index) => (
        <BingoTable
          key={index}
          selected={bingo.status}
          icon={bingo.icon}
          index={index}
          content={bingo.content}
        />
      ))}
    </Box>
  )
}

export default BingoGrid
