import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { UserAttributes } from '../interfaces/userAttributes'

const { persistAtom } = recoilPersist()
const initialUserState = {
  name: '',
  password: '',
  role: '',
}
export const userState = atom<UserAttributes>({
  key: 'user',
  default: initialUserState,
  effects_UNSTABLE: [persistAtom],
})
