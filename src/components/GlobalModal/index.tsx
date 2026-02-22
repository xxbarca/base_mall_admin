import {Button, Input, Modal} from "antd";
import {useGlobalModalStore} from "@/store/useGlobalModalStore.tsx";
import {useRef} from "react";

export const GlobalModal = () => {
  const ref = useRef(null);
  const {modalVisible, modalConfig} = useGlobalModalStore()
  const Content = modalConfig?.content || Input
  const footer = modalConfig?.buttons && modalConfig.buttons.map(button => {
    const {callback} = modalConfig
    const handleOnAction = () => {
      if (callback) {
        callback({
          title: typeof button === 'string' ? button : button.title,
          value: ref.current?.getFieldsValue()
        })
      }
    }
    if (typeof button === 'string') {
      return <Button key={button} onClick={handleOnAction} size={'medium'}>{button}</Button>
    } else {
      const {title, type} = button
      return <Button key={title} onClick={handleOnAction} type={type} size={'medium'}>{title}</Button>
    }
  })

  return <Modal
    destroyOnHidden
    title={modalConfig?.title}
    closable={false}
    open={modalVisible}
    footer={footer}
    width={modalConfig?.width || '60%'}
  >
    <Content ref={ref}/>
  </Modal>
}