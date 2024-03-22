import React, { useState } from 'react'
import {
  Flex,
  Button,
  useMediaQuery,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react'

import { useRecoilState } from 'recoil'
import { userState } from '../../../share/recoilStates/userState'
import { userList } from '../../../share/constant/userList'
import { useColor } from '../../../share/hook/use-color.hook'

const Login = () => {
  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)')
  const [nameInput, setNameInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')
  const colors = useColor()
  const [isUserError, setIsUserError] = useState<boolean>(false)
  const [userStatus, setUserStatus] = useRecoilState(userState)
  const checkUser = () => {
    userList.map((user, index) => {
      if (user.name === nameInput) {
        if (user.password === passwordInput) {
          setIsUserError(false)
          updateUserInfo()
        } else {
          setIsUserError(true)
        }
      }
    })
  }
  const updateUserInfo = () => {
    setUserStatus({
      name: nameInput,
      password: passwordInput,
    })
    console.log(userStatus)
  }
  return (
    <Flex mt={40}>
      <FormControl>
        <FormLabel fontFamily='monospace' textColor={colors.darkGray}>
          用户名
        </FormLabel>
        <Input
          focusBorderColor={colors.primaryColor}
          id='inputUsername'
          value={nameInput}
          onChange={(e) => {
            setNameInput(e.target.value)
          }}
          type='text'
        />
        <FormLabel fontFamily='monospace' textColor={colors.darkGray} mt={5}>
          密码
        </FormLabel>

        <Input
          focusBorderColor={colors.primaryColor}
          id='inputUserpsw'
          bgColor='white'
          value={passwordInput}
          onChange={(e) => {
            setPasswordInput(e.target.value)
          }}
          type='password'
        />
        {isUserError && (
          <FormHelperText textColor={'red'}>用户信息有误</FormHelperText>
        )}

        <Button
          mt={5}
          w='100%'
          textColor={'white'}
          bgColor={colors.primaryColor}
          onClick={() => {
            checkUser()
          }}
        >
          登 🦌
        </Button>
      </FormControl>
    </Flex>
  )
}

export default Login
