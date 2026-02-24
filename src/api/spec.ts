import {POST} from "@/utils/http.ts";
import type {PageResultData} from "@/api/interface/base.ts";
import type {SpecKeyItem} from "@/api/interface/spec.ts";

export const getPageSpecKey = () => {
  return POST<PageResultData<SpecKeyItem>>('')
}