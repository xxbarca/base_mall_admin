import {Button, Col, Form, Input, Row, Select, Space} from "antd";

export type ItemType = 'INPUT' | 'SELECT'

export interface ItemProps {
  label: string;
  name: string;
  type: ItemType;
  allowClear?: boolean;
  placeholder?: string;
  options?: Array<{label: string, value: string | number | boolean}>
}

interface IProps<T> {
  onFinish: (v: T) => void;
  items: ItemProps[];
  searchAble?: boolean;
  addAble?: boolean;
}

export function AdvancedForm<T>(props: IProps<T>){
  const {onFinish, items, searchAble = true, addAble = true} = props
  const [form] = Form.useForm();
  const itemChild = (item: ItemProps) => {
    switch (item.type) {
      case 'INPUT':
        return <Input
          allowClear={item.allowClear}
          placeholder={item.placeholder || `请输入${item.label}`}
        />
      case 'SELECT':
        return <Select
          allowClear={item.allowClear}
          placeholder={item.placeholder || `请选择${item.label}`}
          options={item.options}
        />
    }
  }
  return <Form form={form} onFinish={onFinish}>
    <Row gutter={10}>
      {items.map(item => {
        return <Col span={6}>
          <Form.Item label={item.label} name={item.name}>
            {itemChild(item)}
          </Form.Item>
        </Col>
      })}
      <Col span={6}>
        <Form.Item label={null} className={'flex justify-start'}>
          <Space>
            {searchAble && <Button type="primary" htmlType="submit">搜索</Button>}
            {addAble && <Button type="primary" htmlType="submit">新增</Button>}
          </Space>
        </Form.Item>
      </Col>
    </Row>
  </Form>
}