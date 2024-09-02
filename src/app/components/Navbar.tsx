import React from "react"
import {
  Flex,
  Box,
  Heading,
  Spacer,
  Button,
  useMediaQuery,
  Menu,
  Text,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import { RiGhostLine } from "react-icons/ri"
import { FaRegUserCircle } from "react-icons/fa"
import { useRecoilState } from "recoil"
import { userState } from "../../../share/recoilStates/userState"
import { useColor } from "../../../share/hook/use-color.hook"

const Navbar: React.FC<{
  renderPage: string
  setRenderPage: (page: string) => void
}> = ({ renderPage, setRenderPage }) => {
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
  const [userStatus, setUserStatus] = useRecoilState(userState)
  const colors = useColor()
  const handleUserLogout = () => {
    setUserStatus({
      name: "",
      password: "",
      role: "",
    })
  }
  return (
    <Flex
      bg={colors.primaryColor}
      p={4}
      alignItems="center"
      flexDirection={isSmallerThan768 ? "column" : "row"}
      justifyContent={isSmallerThan768 ? "center" : "space-between"}
    >
      <Flex
        p="2"
        mb={isSmallerThan768 ? 4 : 0}
        textAlign={isSmallerThan768 ? "center" : "left"}
        flexDir="row"
      >
        <RiGhostLine size={33} color="white" />

        <Text
          fontFamily="monospace"
          fontWeight={"bold"}
          ml={2}
          mt={1}
          color="white"
          fontSize={23}
        >
          BondingApp
        </Text>
      </Flex>
      {isSmallerThan768 && <Spacer />}
      <Box>
        <Button
          colorScheme="whiteAlpha"
          mr={4}
          mb={isSmallerThan768 ? 4 : 0}
          width={isSmallerThan768 ? "100%" : "auto"}
          onClick={() => setRenderPage("bingo")}
          fontFamily="monospace"
          _hover={{ bg: colors.highlight }}
        >
          Bingo
        </Button>
        <Button
          colorScheme="whiteAlpha"
          mr={4}
          mb={isSmallerThan768 ? 4 : 0}
          width={isSmallerThan768 ? "100%" : "auto"}
          onClick={() => setRenderPage("todolist")}
          fontFamily="monospace"
          _hover={{ bg: colors.highlight }}
        >
          Todos
        </Button>
        {
          <Button
            colorScheme="whiteAlpha"
            mr={4}
            mb={isSmallerThan768 ? 4 : 0}
            width={isSmallerThan768 ? "100%" : "auto"}
            onClick={() => setRenderPage("plan")}
            fontFamily="monospace"
            _hover={{ bg: colors.highlight }}
          >
            Plan
          </Button>
        }
      </Box>
      <Box>
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="whiteAlpha"
            width={isSmallerThan768 ? "100%" : "auto"}
            mb={isSmallerThan768 ? 4 : 0}
            _hover={{ bg: colors.highlight }}
          >
            <FaRegUserCircle size={25} />
          </MenuButton>
          <MenuList>
            <MenuItem>{userStatus.name}</MenuItem>
            <MenuItem onClick={() => handleUserLogout()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}

export default Navbar
