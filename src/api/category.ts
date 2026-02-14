import {POST} from "@/utils/http.ts";
import type {PageResultData} from "@/api/interface/base.ts";
import type {CategoryItem} from "@/api/interface/category.ts";

export const getPageCategory = () => {
  return POST<PageResultData<CategoryItem>>('/category/paginate', {
    pageNo: 1,
    pageSize: 10,
  })
}