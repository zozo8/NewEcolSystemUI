import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Event } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { TreeNode } from "primeng/api";
import { Tab } from "src/app/models/tab.model";
import { UsersComponent } from "src/app/modules/admin/pages/users/users.component";
import { MainpageComponent } from "../../dashboard/mainpage/mainpage.component";

@Component({
  selector: "app-left-menu",
  templateUrl: "./left-menu.component.html",
  styleUrls: ["./left-menu.component.css"]
})
export class LeftMenuComponent implements OnInit {

  menu:TreeNode[];
  selectedMenu:TreeNode;

  @Input()
  display:boolean;

  @Output()
  refreshTabs = new EventEmitter<Tab>();

  @Output()
  changeDisplay = new EventEmitter();

  constructor(
    private translateService:TranslateService
  ) { }

  ngOnInit(): void {
    this.menu = this.getMenu();
  }


  getMenu():TreeNode[] {

    return [
      {
      label: "app_menu.mainpage",
      icon:"pi pi-home",
      component:MainpageComponent,
      data:"Zakładka wyświetla wykresy, podsumowania i komunikaty systemowe"
      },
      {
        label: "app_menu.equipment_tree",
        icon:"pi pi-align-left"
      },
      {
        label:"app_menu.orders_header",
        icon:"pi pi-clone",
        children:[
              {
                label:"app_menu.orders.orders",
                icon:"pi pi-file"
              },
              {
                label:"app_menu.orders.order_cards",
                icon:"pi pi-copy"
              }
        ]
      },
      {
          label: "app_menu.browsers_header",
          icon:"pi pi-align-justify",
          children: [
            {
                  label: "app_menu.browsers.tree_elements_header",
                  children: [
                      {
                        label: "app_menu.browsers.tree_elements.objects",
                      },
                      {
                        label: "app_menu.browsers.tree_elements.nodes",
                      },
                      {
                        label: "app_menu.browsers.tree_elements.equipments",
                      },
                      {
                        label: "app_menu.browsers.tree_elements.lubricant_points",
                      }
                  ]
              }
          ]
        },
        {
          label: "app_menu.dictionaries_header",
          icon: "pi-align-justify",
          children: [
                {
                  label: "app_menu.dictionaries.task_types"
                },
                {
                  label: "app_menu.dictionaries.task_groups"
                }
          ]
        },
        {
              label:"app_menu.admin_header",
              icon:"pi-lock",
              children:[
                {
                  label:"app_menu.admin.users",
                  icon:"pi pi-user",
                  component:UsersComponent,
                  data:"Zakładka wyświetla listę użytkowników. Umożliwa ich edycję oraz przypisywanie im grup, parametrów i zakładów"
                }
              ]
        }
  ];
  }

  onHide(ev:Event):void {
    this.changeDisplay.emit();
  }

  selectMenu(item:any):void {
    var tab:Tab = {
      header:this.translateService.instant(item.node.label??""),
      component:item.node.component,
      selected:true,
      tooltip:item.node.data
    };

    this.refreshTabs.emit(tab);
  }

}
