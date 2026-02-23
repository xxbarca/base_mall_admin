import {AdvancedForm, type ItemProps} from "@/components/AdvancedForm";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {ONLINE} from "@/utils/constants.ts";
import {useGlobalModalStore} from "@/store/useGlobalModalStore.tsx";
import {getCategory} from "@/api/category.ts";

export const EditAdd = forwardRef((_props, ref) => {
  const r = useRef(null)
  const [data, setData] = useState()
  const {modalConfig} = useGlobalModalStore()
  const columns: Array<ItemProps> = [{
    label: '名称',
    name: 'name',
    type: 'INPUT',
    rules: [{required: true, message: '分类名不能为空'}]
  }, {
    label: '描述',
    name: 'description',
    type: 'TEXTAREA'
  }, {
    label: '状态',
    name: 'online',
    type: 'SWITCH',
    defaultValue: ONLINE.ON
  }, {
    label: '排序',
    name: 'index',
    type: 'INPUT_NUMBER',
    defaultValue: 10
  }]
  useImperativeHandle(ref, () => r.current)
  useEffect(() => {
    if (modalConfig) {
      const {props} = modalConfig
      if (props && props.id) {
        getCategory(props.id).then(res => {
          const {code, data} = res
          if (code === 200) {
            setData(data)
          }
        })
      }
    }
  }, [modalConfig, setData])
  return <AdvancedForm
    data={data}
    ref={r}
    searchAble={false}
    addAble={false}
    direction={'vertical'}
    items={columns}
  />
})