import React, {forwardRef, useEffect, useImperativeHandle} from "react";
import {Button, Col, Form, Input, InputNumber, Row, Select, Space, Switch} from "antd";
const {TextArea} = Input
import './index.css'

export type ItemType = 'INPUT' | 'SELECT' | 'TEXTAREA' | 'SWITCH' | 'INPUT_NUMBER'

export interface ItemProps {
  label: string;
  name: string;
  type: ItemType;
  allowClear?: boolean;
  placeholder?: string;
  options?: Array<{label: string, value: string | number | boolean}>;
  checkedChildren?: string;
  unCheckedChildren?: string
  defaultValue?: string | number | boolean;
}

interface IProps<T> {
  onFinish?: (v: T) => void;
  items: ItemProps[];
  searchAble?: boolean;
  addAble?: boolean;
  direction?: 'vertical' | 'horizontal';
}


export const AdvancedForm = forwardRef(<T = object>(props: IProps<T>, ref: React.Ref<HTMLElement>) => {
  const {onFinish, items, searchAble = true, addAble = true, direction} = props
  const [form] = Form.useForm();
  const renderFormItem = (item: ItemProps) => {
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
      case 'TEXTAREA':
        return <TextArea
          allowClear={item.allowClear}
          placeholder={item.placeholder || `请选择${item.label}`}
        />
      case 'SWITCH':
        return <Switch
          checkedChildren={item.checkedChildren || '在线'}
          unCheckedChildren={item.unCheckedChildren || '下线'}
        />
      case 'INPUT_NUMBER':
        return <InputNumber
          style={{width: '100%'}}
          min={0}
        />
    }
  }

  useEffect(() => {
    items.forEach(i => {
      form.setFieldValue(i.name, i.defaultValue)
    })
  }, []);



  // @ts-ignore
  useImperativeHandle(ref, () => {
    return {
      getFieldsValue: () => {
        return form.getFieldsValue()
      }
    };
  });

  return <div className={'w-full bg-white p-1 rounded-lg flex flex-col items-start justify-start mb-2 advanced-form'}>
    <Form form={form} onFinish={onFinish} className={'w-full form'}>
      <Row gutter={10}>
        {items.map(item => {
          return <Col span={direction === 'vertical' ? 24 : 6}>
            <Form.Item label={item.label} name={item.name} style={{marginBottom: '10px'}}>
              {renderFormItem(item)}
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
  </div>
})