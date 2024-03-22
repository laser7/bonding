import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { BingoAttributes } from '../interfaces/bingoAttributes'
import { bingoList } from '../constant/bingoList'

const { persistAtom } = recoilPersist()

export const bingoState = atom<BingoAttributes[]>({
  key: 'bingo',
  default: bingoList,
  effects_UNSTABLE: [persistAtom],
})
