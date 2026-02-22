import {create} from "zustand/react";
import { devtools } from 'zustand/middleware'

interface GlobalState {
  activeKey: string
  updateActiveKey: (key: string) => void
}

export const useGlobalStore = create<GlobalState>()(
  devtools(
    (set => ({
      activeKey: '',
      updateActiveKey: (key: string) => set({ activeKey: key }),
    }))
  )
)