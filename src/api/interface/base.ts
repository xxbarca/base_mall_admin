export interface Result {
  code: number;
  message: string | string[];
}

// * 分页请求参数
export interface ReqPage {
  pageNo: number;
  pageSize: number;
}

export interface PageMetaData {
  pageNo: number;
  pageSize: number;
  totalPages: number;
  itemCount: number;
  total: number;
}

export const defaultPageMetaData: PageMetaData = {
  pageNo: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
  itemCount: 0,
}

export interface PageResultData<T> extends Result {
  data: {
    items: Array<T>;
    meta: PageMetaData;
  };
}

export interface ResultData<T> extends Result {
  data: T;
}