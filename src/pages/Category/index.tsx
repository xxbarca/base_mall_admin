import {useEffect, useState} from "react";
import {deleteCategory, getPageCategory} from "@/api/category.ts";
import type {CategoryItem} from "@/api/interface/category.ts";
import {Button, message, Space, Table, type TableProps, Tag} from "antd";
import {DeleteButton} from "@/components/DeleteButton";
import type {ReqPage} from "@/api/interface/base.ts";
import {AdvancedForm, type ItemProps} from "@/components/AdvancedForm";

export const Category = () => {
  const [cateList, setCateList] = useState<Array<CategoryItem>>([]);
  const [params, setParams] = useState<ReqPage & Partial<CategoryItem>>({
    pageNo: 1,
    pageSize: 10
  });

  const columns: TableProps<CategoryItem>['columns'] = [
    {title: '名称', dataIndex: 'name', key: 'name', align: 'center'},
    {title: '创建时间', dataIndex: 'create_time', key: 'create_time', align: 'center'},
    {title: '更新时间', dataIndex: 'update_time', key: 'update_time', align: 'center'},
    {title: '描述', dataIndex: 'description', key: 'description', align: 'center'},
    {title: '是否在线', dataIndex: 'online', key: 'online', align: 'center',
      render: (text) => <span>
        {Number(text) === 1 ? <Tag color={'blue'}>在线</Tag> : <Tag color={'red'}>下线</Tag>}
      </span>,
    },
    {title: '图片', dataIndex: 'img', key: 'img', align: 'center'},
    {title: '排序', dataIndex: 'index', key: 'index', align: 'center'},
    {title: '操作', key: 'action', align: 'center',
      render: (_, record) => (
        <Space>
          <Button type={'primary'} size={'small'}>编辑</Button>
          <DeleteButton okAction={() => deleteAction(record)}/>
        </Space>
      )
    }
  ]
  const items: Array<ItemProps> = [
    {label: '分类名', name: 'name', type: 'INPUT', allowClear: true},
    {label: '是否在线', name: 'online', type: 'SELECT', allowClear: true, options: [
        {label: '在线', value: '1'},
        {label: '下线', value: '2'},
      ]
    }
  ]
  const deleteAction = (record: CategoryItem) => {
    deleteCategory(record.id).then(async res => {
      if (res.code === 200) {
        await message.success('删除成功', 0.5)
        fetchCategoryList()
      }
    })
  }
  const onFinish = (record: Partial<CategoryItem>) => {
    const p = {...params, ...record}
    setParams(p)
    fetchCategoryList(p)
  }

  const fetchCategoryList = (p = params) => {
    getPageCategory(p).then(res => {
      const {data} = res
      const {items} = data
      setCateList(items);
    })
  }

  useEffect(() => {
    fetchCategoryList()
  }, []);
  return <div className={'w-full h-full box-border flex flex-col'}>
    <AdvancedForm<Partial<CategoryItem>> onFinish={onFinish} items={items}/>
    <Table className={'h-full'} size={'middle'} columns={columns} dataSource={cateList} bordered/>
  </div>
}