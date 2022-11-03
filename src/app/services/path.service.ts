import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PathService {
  prefix = '/api/';

  delete(model: string, id: number): string {
    return this.prefix + model + 's?id=' + id;
  }

  deleteParams(model: string, params: string): string {
    return this.prefix + model + 's?' + params;
  }

  post(model: string): string {
    return this.prefix + model + 's/Manage';
  }

  getList(model: string): string {
    return this.prefix + model + 's';
  }

  get(model: string, id: number): string {
    return this.prefix + model + 's?id=' + id;
  }

  columnList(id: number): string {
    return this.prefix + 'GridData?gridsDict=' + id;
  }
}
