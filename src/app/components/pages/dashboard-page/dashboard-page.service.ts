import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardPageService {

  constructor() { }


  getClientNodes(): any[] {
    return [
      {
        "label":"Orlen",
        "data":"Orlen",
        "expandedIcon":"pi pi-folder-open",
        "collapsedIcon":"pi pi-folder",
        "children":[
          {
            "label":"PTA Włocławek",
            "data": "1",
            "collapsedIcon":"pi pi-file",
            "key":"1"
          },
          {
            "label":"CCGT Płock",
            "data": "2",
            "collapsedIcon":"pi pi-file",
            "key":"2"
          },
          {
            "label":"CCGT Włocławek",
            "data": "3",
            "collapsedIcon":"pi pi-file",
            "key":"3"
          },
          {
            "label":"EC PŁOCK",
            "data": "4",
            "collapsedIcon":"pi pi-file",
            "key":"4"
          }
        ]
      },
      {
        "label":"NGK",
        "data":"NGK",
        "expandedIcon":"pi pi-folder-open",
        "collapsedIcon":"pi pi-folder",
        "children":[
          {
            "label":"NGK Gliwice",
            "data": "5",
            "collapsedIcon":"pi pi-file",
            "key":"3"
          },
          {
            "label":"NGK Dąbrowa Górnicza",
            "data": "6",
            "collapsedIcon":"pi pi-file",
            "key":"6"
          }
        ]
      }
    ]

  }
}
