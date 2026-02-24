import {Table, type TableProps} from "antd";
import type {SizeType} from "antd/es/config-provider/SizeContext";
import {type PageMetaData} from "@/api/interface/base.ts";
import {useEffect, useState} from "react";

interface Props<T> {
  bordered?: boolean
  columns: TableProps<T>['columns']
  cateList: Array<T>
  size?: SizeType
  meta: PageMetaData
  onChange?: (pageNumber: number, pageSize: number) => void;
  onShowSizeChange?: (pageSize: number) => void;
}

export function AdvancedTable<T>(props: Props<T>) {
  const {
    bordered = true,
    columns,
    cateList,
    size = 'middle',
    meta,
    onChange,
    onShowSizeChange
  } = props;

  const [pageParam, setPageParam] = useState<{ pageNum: number; pageSize: number }>({
    pageNum: 1,
    pageSize: 10
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageParam({
      pageNum: meta.pageNo,
      pageSize: meta.pageSize
    });
  }, [meta]);

  const handleOnChange = (n: number, s: number) => {
    setPageParam({
      pageNum: n,
      pageSize: s
    });
    if (onChange) {
      onChange(n, s);
    }
  };

  const handleOnShowSizeChange = (s: number) => {
    if (onShowSizeChange) {
      onShowSizeChange(s);
    }
  };

  return <Table
    className={'h-full advanced-table'}
    size={size}
    columns={columns}
    dataSource={cateList}
    bordered={bordered}
    pagination={{
      size: 'medium',
      placement: ["bottomEnd"],
      showQuickJumper: true,
      pageSizeOptions: [10, 20, 30],
      hideOnSinglePage: true,
      current: pageParam.pageNum,
      pageSize: pageParam.pageSize,
      total: meta.total,
      onChange: handleOnChange,
      onShowSizeChange: handleOnShowSizeChange
    }}
  />
}