import {useEffect, useState} from "react";
import {getPageCategory} from "@/api/category.ts";
import type {CategoryItem} from "@/api/interface/category.ts";
import {Table, type TableProps, Tag} from "antd";

export const Category = () => {
  const [cateList, setCateList] = useState<Array<CategoryItem>>([]);
  const columns: TableProps<CategoryItem>['columns'] = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  }, {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
    align: 'center',
  }, {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
    align: 'center',
  }, {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    align: 'center',
  }, {
    title: '是否在线',
    dataIndex: 'online',
    key: 'online',
    align: 'center',
    render: (text) => <span>
      {Number(text) === 1 ? <Tag color={'blue'}>在线</Tag> : <Tag color={'red'}>下线</Tag>}
    </span>,
  }, {
    title: '图片',
    dataIndex: 'img',
    key: 'img',
    align: 'center',
  }, {
    title: '排序',
    dataIndex: 'index',
    key: 'index',
    align: 'center',
  }]
  useEffect(() => {
    getPageCategory().then(res => {
      const {data} = res
      const {items} = data
      setCateList(items);
    })
  }, []);
  return <div className={'w-full h-full flex flex-col'}>
    <Table size={'middle'} columns={columns} dataSource={cateList} bordered/>
  </div>
}