import { ResponseColumnSettingValueData } from './responseColumnSettingValueData';

export class ResponseColumnSettingValue {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: [number];
  data: [ResponseColumnSettingValueData];
}
