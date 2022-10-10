import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PathService {
  prefix="/api/";

  constructor() {

   }

  delete(model:string, id:number):string {
    return this.prefix+model+"s/"+id;
  }

  post(model:string):string {
    return this.prefix+model+"s/Manage";
  }

  put(model:string):string {
    return this.prefix+model+"s/Manage";
  }

  getList(model:string):string {
    return this.prefix+model+"s";
  }

  get(model:string, id:number):string {
    return this.prefix+model+"s?id="+id;
  }

  columnList(id:number):string {
    return this.prefix+"GridData?gridsDict="+id;
  }

  // dictionary

  dictionary(model:string):string {
    return this.prefix+model+"s/Get"+model+"s/Get";
  }

  dictionaryColumnList(model:string):string {
    return this.prefix+model+"s/Get"+model+"GridData/Get";
  }
}
