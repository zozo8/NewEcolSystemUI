import { TranslateService } from "@ngx-translate/core";
import { LazyLoadEvent, MenuItem } from "primeng/api";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";
import { TableMenuService } from "src/app/universalComponents/table-menu/table-menu.service";

export abstract class TableButtonsComponent<T> {

  constructor(
    private translateService:TranslateService,
    private tableMenuService:TableMenuService
    ) {
  }

  buttons:MenuItem[];
  obj:TableMenuStructure;
  lazyLoadObj:LazyLoadEvent;
  deletePath:string;
  postPath:string;
  putPath:string;

   getButtons():MenuItem[] {
    return [];
    // return [
    //   {
    //     label:this.translateService.instant("btn.add"),
    //     icon:"pi pi-fw pi-plus",
    //     disabled:false,
    //     command:()=>this.post()
    //   },
    //   {
    //     label:this.translateService.instant("btn.remove"),
    //     icon:"pi pi-fw pi-minus",
    //     disabled:false,
    //     command:()=>this.delete()
    //   },
    //   {
    //     label:this.translateService.instant("btn.edit"),
    //     icon:"pi pi-fw pi-pencil",
    //     disabled:false,
    //     command:()=>this.put()
    //   },
    //   {
    //     label:this.translateService.instant("btn.refresh"),
    //     icon:"pi pi-fw pi-refresh",
    //     disabled:false,
    //     command:()=>this.prepareRequest(this.lazyLoadObj)
    //   }
    // ];
  }

  abstract post(): void {
    this.tableMenuService.post(this.obj).subscribe({
      next:(res:TableMenuStructure)=>this.obj = res
    });
  }

  delete(): void {
      this.tableMenuService.delete(this.deletePath, this.obj.objectDto.id).subscribe({
        next:(res:boolean)=> {
          console.log("Usunięto");
          //if(res) { this.refreshTable(); }
        }
      });
    }

  put(): void {
      this.tableMenuService.put(this.obj).subscribe({
        next:(res:TableMenuStructure)=>this.obj = res
      });
  }
}
