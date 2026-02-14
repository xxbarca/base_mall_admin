export interface Result {
  code: number;
  message: string | string[];
}

export interface PageMetaData {
  pageNo: number;
  pageSize: number;
  totalPages: number;
  itemCount: number;
  total: number;
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