import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AuthService } from "src/app/services/auth.service";
import { isContext } from "vm";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"]
})
export class DashboardPageComponent implements OnInit {
  items: MenuItem[];
  userItems: MenuItem[];

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {

    this.userItems = [
      {
        label:"Ustawienia",
        icon:"pi pi-fw pi-sliders-h",
      },
      {
        label:"Profil użytkownika",
        icon:"pi pi-fw pi-user",
      },
      {
        separator:true
      },
      {
        label:"Wyloguj",
        icon:"pi pi-fw pi-power-off",
        command:()=> {
          this.logout();
        }
      }

    ];

    this.items = [
      {
        label: "Drzewo urządzeń",
        icon:"pi pi-align-left",
        routerLink:""
      },
      {
        label:"Zlecenia",
        icon:"pi pi-align-justify",
        items:[
          {
            label:"Zlecenia",
            routerLink:"/dashboard/orders"
          },
          {
            label:"Karty zleceń",
            routerLink:"/dashboard/order-cards"
          }
        ]
      },
      {
          label: "Przeglądarki",
          icon:"pi pi-align-justify",
          items: [{
                  label: "Elementy drzewa",
                  items: [
                      {
                        label: "Obiekty",
                        routerLink: "/dashboard/objects",
                      },
                      {
                        label: "Węzły",
                        routerLink: "/dashboard/departments",
                      },
                      {
                        label: "Zespoły",
                        routerLink: "/dashboard/nodes",
                      },
                      {
                        label: "Urządzenia",
                        routerLink: "/dashboard/equipments",
                      },
                      {
                        label: "Punkty serwisowe",
                        routerLink: "/dashboard/lubricant-points",
                      }
                  ]
              }
          ]
      },
      {
          label: "Słowniki",
          icon: "pi pi-fw pi-align-justify",
          items: [
              {
                label: "Typy zadań"
              },
              {
                label: "Grupy zadań"
              }
          ]
      },
      {
        label:"Administracja",
        icon:"pi pi-fw pi-lock",
        items:[
          {
            label:"Użytkownicy",
            icon:"pi pi-user",
            items:[
              {
                label:"Lista użytkowników",
                routerLink:"/dashboard/admin/users"
              },
              {
                label:"Historia logowań",
                routerLink:"/dashboard/login-history"
              }
            ]
          }
        ]

      }
  ];
  }

  logout():void {
    this.authService.logout();
  }

}
