import { Injectable } from "@angular/core";
import { MenuItem } from "primeng/api";

@Injectable({
  providedIn: "root"
})
export class MainpageService {


  constructor(

  ) { }


  getTemplateList(): MenuItem[] {
    var res:MenuItem[];
    res = [
      {
        label:"Struktura modułów",
        icon:"pi pi-microsoft",
        id:"modules"
      },
      {
        label:"Wykresy i podsumowania",
        icon:"pi pi-chart-line",
        id:"charts"
      },
      {
        label:"Komunikaty",
        icon:"pi pi-exclamation-triangle",
        id:"warnings"
      }
    ];
    return res;
  }

}
