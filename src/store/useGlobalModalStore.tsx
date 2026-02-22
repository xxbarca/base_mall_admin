import {type JSX} from "react";

import {create} from "zustand/react";
import type {ButtonType} from "antd/es/button";

type ButtonProps = {
  title: string;
  type?: ButtonType
}

type CBProps ={
  title?: string
  value?: object | string | number
}

type ModalConfig = {
  title: string
  content?: () => JSX.Element
  buttons: Array<string | ButtonProps>
  callback?: (p: CBProps) => void
  width: string
}


type State = {
  modalVisible: boolean
  modalConfig: ModalConfig | null;
}

type Actions = {
  showModal: (config: ModalConfig) => void;
  updateModalVisible: (is: boolean) => void;
}

type Store = State & Actions;

export const useGlobalModalStore = create<Store>()(set => {
  return {
    modalVisible: false,
    modalConfig: null,
    showModal: (config) => {
      set(() => ({
        modalVisible: true,
        modalConfig: config
      }))
    },
    updateModalVisible: (is) => {
      set((state) => {
        return {
          modalVisible: is,
          modalConfig: !is ? null : state.modalConfig
        }
      })
    }
  }
})

export const AlertModal = (config: ModalConfig) => {
  useGlobalModalStore.getState().showModal(config)
}
