import { FilterRequest } from "./filterRequest.model";
import { Order } from "./order.model";

export interface RequestBodyGetList {
  pageNumber?:number;
  pageSize?:number;
  order?:Order;
  filter?:FilterRequest;
}
