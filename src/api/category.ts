import {POST} from "@/utils/http.ts";
import type {PageResultData} from "@/api/interface/base.ts";
import type {CategoryItem} from "@/api/interface/category.ts";

export const getPageCategory = (p: object) => {
  return POST<PageResultData<CategoryItem>>('/category/paginate', p)
}