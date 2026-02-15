import {QuestionCircleOutlined} from "@ant-design/icons";
import {Button, Popconfirm} from "antd";

interface IProps {
  title?: string
  description?: string
  okText?: string
  cancelText?: string
  label?: string
  okAction: () => void
}

export const DeleteButton = (props: IProps) => {
  const {
    title = '提示',
    description = '确认删除这条数据',
    okText = '确认',
    cancelText = '取消',
    label = '删除',
    okAction
  } = props
  return <Popconfirm
    title={title}
    description={description}
    okText={okText}
    cancelText={cancelText}
    onConfirm={okAction}
    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
  >
    <Button danger size={'small'}>{label}</Button>
  </Popconfirm>
}