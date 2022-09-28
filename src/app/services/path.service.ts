import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PathService {
  prefix="/api/";

  constructor() {

   }

  delete(model:string):string {
    return this.prefix+model+"s/Delete"+model+"/Delete";
  }

  post(model:string):string {
    return this.prefix+model+"s/Manage"+model+"/Post";
  }

  put(model:string):string {
    return this.prefix+model+"s/Manage"+model+"/Put";
  }

  getList(model:string):string {
    return this.prefix+model+"s/Get"+model+"s/Get";
  }

  columnList(model:string):string {
    return this.prefix+model+"s/Get"+model+"GridData/Get";
  }

  dictionary(model:string):string {
    return this.prefix+model+"s/Get"+model+"s/Get";
  }

  dictionaryColumnList(model:string):string {
    return this.prefix+model+"s/Get"+model+"GridData/Get";
  }
}