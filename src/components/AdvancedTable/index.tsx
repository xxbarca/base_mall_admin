import {Table, type TableProps} from "antd";
import type {SizeType} from "antd/es/config-provider/SizeContext";

interface Props<T> {
  bordered?: boolean
  columns: TableProps<T>['columns']
  cateList: Array<T>
  size?: SizeType
}

export function AdvancedTable<T>(props: Props<T>) {
  const {
    bordered,
    columns,
    cateList,
    size = 'middle',
  } = props;
  return <Table
    className={'h-full advanced-table'}
    size={size}
    columns={columns}
    dataSource={cateList}
    bordered={bordered}
  />
}