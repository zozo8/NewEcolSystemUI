import { FilterRequest } from './filterRequest.model';
import { Order } from './order.model';

export class RequestBodyGetList {
  pageNumber?: number;
  pageSize?: number;
  order?: Order;
  filter?: FilterRequest;
}
