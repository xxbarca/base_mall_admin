import {DELETE, GET, PATCH, POST} from "@/utils/http.ts";
import type {PageResultData, Result} from "@/api/interface/base.ts";
import type {CategoryItem} from "@/api/interface/category.ts";

export const getPageCategory = (p: object) => {
  return POST<PageResultData<CategoryItem>>('/category/paginate', p)
}

export const deleteCategory = (id: string) => {
  return DELETE<Result>(`/category/${id}`)
}

export const createCategory = (data: CategoryItem) => {
  return POST<Result>(`/category`, data)
}

export const updateCategory = (data: Partial<CategoryItem>) => {
  return PATCH<Result>(`/category`, data)
}

export const getCategory = (id: string) => {
  return GET<Result>(`/category/${id}`)
}