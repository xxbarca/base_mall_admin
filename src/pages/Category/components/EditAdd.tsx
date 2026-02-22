import {AdvancedForm, type ItemProps} from "@/components/AdvancedForm";
import {forwardRef, useImperativeHandle, useRef} from "react";
import {ONLINE} from "@/utils/constants.ts";

export const EditAdd = forwardRef((_props, ref) => {
  const r = useRef(null)
  const columns: Array<ItemProps> = [{
    label: '名称',
    name: 'name',
    type: 'INPUT'
  }, {
    label: '描述',
    name: 'description',
    type: 'TEXTAREA'
  }, {
    label: '状态',
    name: 'online',
    type: 'SWITCH',
    defaultValue: ONLINE.OFF
  }, {
    label: '排序',
    name: 'index',
    type: 'INPUT_NUMBER',
    defaultValue: 10
  }]
  useImperativeHandle(ref, () => r.current)
  return <AdvancedForm ref={r} searchAble={false} addAble={false} direction={'vertical'} items={columns} />
})